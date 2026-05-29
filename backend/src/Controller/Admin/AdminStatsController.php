<?php

namespace App\Controller\Admin;

use App\Repository\ServiceRepository;
use App\Repository\SubscriptionRepository;
use App\Repository\UserRepository;
use App\Repository\PaymentRepository;
use App\Service\AdminStatsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use OpenApi\Attributes as OA;

#[Route('/api/admin/stats')]
#[IsGranted('ROLE_ADMIN')]
#[OA\Tag(name: 'Admin')]
#[OA\SecurityRequirement(['cookieAuth' => []])]
class AdminStatsController extends AbstractController
{
    #[OA\Response(response: 200, description: 'Statistiques globales du tableau de bord')]
    #[Route('', name: 'admin_stats', methods: ['GET'])]
    public function stats(
        UserRepository $users,
        ServiceRepository $services,
        SubscriptionRepository $subs
    ): JsonResponse {
        return $this->json([
            'services' => $services->count([]),
            'users' => $users->count([]),
            'subscriptions' => $subs->countActive(),
            'mrr' => $subs->calculateMRR(),
        ]);
    }

    #[OA\Response(response: 200, description: 'Données des graphiques selon la période choisie')]
    #[Route('/charts', name: 'admin_stats_charts', methods: ['GET'])]
    public function charts(Request $request, AdminStatsService $statsService): JsonResponse
    {
        $period = $request->query->getString('period', 'days');
        if (!in_array($period, ['days', 'weeks'], true)) {
            return $this->json(['message' => 'Le paramètre period doit être "days" ou "weeks".'], 400);
        }
        return $this->json($statsService->getChartData($period));
    }

    #[OA\Response(response: 200, description: 'Activité récente : derniers paiements et abonnements')]
    #[Route('/recent', name: 'admin_recent_activity', methods: ['GET'])]
    public function recent(PaymentRepository $payments, SubscriptionRepository $subs): JsonResponse
    {
        $lastPayments = $payments->findBy([], ['paidAt' => 'DESC'], 5);
        $lastSubs = $subs->findBy([], ['startDate' => 'DESC'], 5);

        $data = [
            'payments' => array_map(fn($p) => [
                'id' => $p->getId(),
                'amount' => $p->getAmount(),
                'paidAt' => $p->getPaidAt()?->format('Y-m-d H:i:s'),
                'userEmail' => $p->getSubscription()?->getUser()?->getEmail(),
            ], $lastPayments),

            'subscriptions' => array_map(fn($s) => [
                'id' => $s->getId(),
                'status' => $s->getStatus(),
                'startDate' => $s->getStartDate()?->format('Y-m-d'),
                'userEmail' => $s->getUser()->getEmail(),
                'serviceName' => $s->getService()->getName(),
            ], $lastSubs),
        ];

        return $this->json($data);
    }
}
