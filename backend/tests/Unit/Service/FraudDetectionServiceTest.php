<?php

namespace App\Tests\Unit\Service;

use App\Entity\Order;
use App\Entity\User;
use App\Repository\FraudCheckRepository;
use App\Repository\OrderRepository;
use App\Service\FraudDetectionService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;

class FraudDetectionServiceTest extends TestCase
{
    private function buildQueryMock(int|float|null $returnValue): Query
    {
        $query = $this->getMockBuilder(Query::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getSingleScalarResult', 'setParameter'])
            ->getMock();
        $query->method('setParameter')->willReturnSelf();
        $query->method('getSingleScalarResult')->willReturn($returnValue);
        return $query;
    }

    private function buildService(
        int   $ipCount = 0,
        int   $emailCount = 0,
        float $avgAmount = 0.0
    ): array {
        $fcRepo = $this->createMock(FraudCheckRepository::class);
        $fcRepo->method('countRecentByIp')->willReturn($ipCount);

        $emailQuery = $this->buildQueryMock($emailCount);
        $avgQuery   = $this->buildQueryMock($avgAmount ?: null);

        $em = $this->createMock(EntityManagerInterface::class);
        $em->method('createQuery')->willReturnCallback(
            fn(string $dql) => str_contains($dql, 'AVG') ? $avgQuery : $emailQuery
        );
        $em->method('persist');

        $logger = $this->createMock(LoggerInterface::class);

        $service = new FraudDetectionService(
            $em,
            $fcRepo,
            $this->createMock(OrderRepository::class),
            $logger
        );

        return [$service, $logger];
    }

    private function guestOrder(string $email, float $total): Order
    {
        $order = $this->createMock(Order::class);
        $order->method('getUser')->willReturn(null);
        $order->method('getGuestEmail')->willReturn($email);
        $order->method('getTotal')->willReturn($total);
        $order->method('getId')->willReturn(1);
        return $order;
    }

    private function makeRequest(string $ip = '1.2.3.4'): Request
    {
        return Request::create('/', 'GET', [], [], [], ['REMOTE_ADDR' => $ip]);
    }

    public function test_commande_normale_retourne_ok(): void
    {
        [$service] = $this->buildService();
        $result    = $service->assess($this->guestOrder('client@gmail.com', 100.0), $this->makeRequest());

        $this->assertSame('ok', $result['level']);
        $this->assertSame(0, $result['score']);
        $this->assertEmpty($result['rules']);
    }

    public function test_email_jetable_ajoute_regle_disposable_email(): void
    {
        [$service] = $this->buildService();
        $result    = $service->assess($this->guestOrder('attacker@mailinator.com', 50.0), $this->makeRequest());

        $this->assertContains('disposable_email', $result['rules']);
        $this->assertSame(20, $result['score']);
    }

    public function test_ip_velocity_ajoute_regle_et_30_points(): void
    {
        [$service] = $this->buildService(ipCount: 3);
        $result    = $service->assess($this->guestOrder('normal@gmail.com', 50.0), $this->makeRequest());

        $this->assertContains('ip_velocity', $result['rules']);
        $this->assertSame(30, $result['score']);
    }

    public function test_email_velocity_ajoute_regle_et_25_points(): void
    {
        [$service] = $this->buildService(emailCount: 2);
        $result    = $service->assess($this->guestOrder('repeat@gmail.com', 50.0), $this->makeRequest());

        $this->assertContains('email_velocity', $result['rules']);
        $this->assertSame(25, $result['score']);
    }

    public function test_montant_superieur_25x_moyenne_ajoute_high_amount(): void
    {
        [$service] = $this->buildService(avgAmount: 100.0);
        $result    = $service->assess($this->guestOrder('buyer@gmail.com', 300.0), $this->makeRequest());

        $this->assertContains('high_amount', $result['rules']);
        $this->assertSame(15, $result['score']);
    }

    public function test_nouveau_compte_ajoute_regle_new_account(): void
    {
        [$service] = $this->buildService();

        $user = $this->createMock(User::class);
        $user->method('getCreatedAt')->willReturn(new \DateTimeImmutable('-1 hour'));
        $user->method('getEmail')->willReturn('new@example.com');

        $order = $this->createMock(Order::class);
        $order->method('getUser')->willReturn($user);
        $order->method('getGuestEmail')->willReturn(null);
        $order->method('getTotal')->willReturn(50.0);
        $order->method('getId')->willReturn(2);

        $result = $service->assess($order, $this->makeRequest());

        $this->assertContains('new_account', $result['rules']);
        $this->assertSame(10, $result['score']);
    }

    public function test_score_superieur_60_retourne_blocked(): void
    {
        [$service, $logger] = $this->buildService(ipCount: 3, emailCount: 2);
        $logger->expects($this->once())->method('error');

        $result = $service->assess($this->guestOrder('attacker@mailinator.com', 50.0), $this->makeRequest());

        $this->assertSame('blocked', $result['level']);
        $this->assertGreaterThanOrEqual(61, $result['score']);
    }

    public function test_score_entre_31_et_60_retourne_review(): void
    {
        [$service, $logger] = $this->buildService(ipCount: 3, emailCount: 2);
        $logger->expects($this->once())->method('warning');

        $result = $service->assess($this->guestOrder('normal@gmail.com', 50.0), $this->makeRequest());

        $this->assertSame('review', $result['level']);
    }

    public function test_x_forwarded_for_est_utilise_comme_ip(): void
    {
        $fcRepo = $this->createMock(FraudCheckRepository::class);
        $fcRepo->expects($this->once())
            ->method('countRecentByIp')
            ->with('10.0.0.1', $this->anything())
            ->willReturn(0);

        $query = $this->buildQueryMock(0);
        $em    = $this->createMock(EntityManagerInterface::class);
        $em->method('createQuery')->willReturn($query);
        $em->method('persist');

        $service = new FraudDetectionService(
            $em,
            $fcRepo,
            $this->createMock(OrderRepository::class),
            $this->createMock(LoggerInterface::class)
        );

        $request = $this->makeRequest();
        $request->headers->set('X-Forwarded-For', '10.0.0.1, 192.168.1.1');

        $service->assess($this->guestOrder('x@gmail.com', 10.0), $request);
    }
}
