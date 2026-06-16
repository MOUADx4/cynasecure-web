<?php

namespace App\Controller\Admin;

use App\Entity\Payment;
use App\Repository\FraudCheckRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use OpenApi\Attributes as OA;

#[Route('/api/admin/payments')]
#[IsGranted('ROLE_ADMIN')]
#[OA\Tag(name: 'Admin')]
#[OA\SecurityRequirement(['cookieAuth' => []])]
class AdminPaymentController extends AbstractController
{
    private const SORT_FIELDS = ['paidAt', 'amount', 'status', 'id'];

    #[OA\Response(response: 200, description: 'Liste paginée des paiements avec détails fraude')]
    #[Route('', name: 'admin_payments_list', methods: ['GET'])]
    public function list(Request $request, EntityManagerInterface $em, FraudCheckRepository $fcRepo): JsonResponse
    {
        $page    = max(1, (int) $request->query->get('page', 1));
        $perPage = min(100, max(1, (int) $request->query->get('perPage', 20)));
        $sort    = in_array($request->query->get('sort'), self::SORT_FIELDS, true) ? $request->query->get('sort') : 'paidAt';
        $order   = strtoupper($request->query->get('order', 'desc')) === 'ASC' ? 'ASC' : 'DESC';

        $repo = $em->getRepository(Payment::class);

        $total = (int) $repo->createQueryBuilder('p')
            ->select('COUNT(p.id)')
            ->getQuery()
            ->getSingleScalarResult();

        $payments = $repo->createQueryBuilder('p')
            ->leftJoin('p.subscription', 'sub')->addSelect('sub')
            ->leftJoin('p.orderRef', 'ord')->addSelect('ord')
            ->orderBy("p.{$sort}", $order)
            ->setFirstResult(($page - 1) * $perPage)
            ->setMaxResults($perPage)
            ->getQuery()
            ->getResult();

        $items = array_map(function (Payment $p) use ($fcRepo) {
            $sub   = $p->getSubscription();
            $order = $p->getOrderRef();
            $fc    = $order ? $fcRepo->findByOrder($order) : null;

            // User
            if ($sub?->getUser()) {
                $u    = $sub->getUser();
                $user = [
                    'id'          => $u->getId(),
                    'email'       => $u->getEmail(),
                    'displayName' => $u->getDisplayName(),
                ];
            } elseif ($order?->getUser()) {
                $u    = $order->getUser();
                $user = [
                    'id'          => $u->getId(),
                    'email'       => $u->getEmail(),
                    'displayName' => $u->getDisplayName(),
                ];
            } elseif ($order?->getGuestEmail()) {
                $user = [
                    'id'          => null,
                    'email'       => $order->getGuestEmail(),
                    'displayName' => $order->getGuestEmail(),
                ];
            } else {
                $user = null;
            }

            // Service
            if ($sub?->getService()) {
                $svc     = $sub->getService();
                $service = ['id' => $svc->getId(), 'name' => $svc->getName()];
            } elseif ($order && !$order->getOrderItems()->isEmpty()) {
                $firstItem = $order->getOrderItems()->first();
                $svc       = $firstItem?->getService();
                $service   = $svc ? ['id' => $svc->getId(), 'name' => $svc->getName()] : null;
            } else {
                $service = null;
            }

            // Cycle - "checkout" est la valeur stockée pour les one-shots ;
            // on lit le billing réel depuis le premier OrderItem.
            $cycle = $p->getCycle();
            if (($cycle === 'checkout' || !$cycle) && $order && !$order->getOrderItems()->isEmpty()) {
                $cycle = $order->getOrderItems()->first()?->getBilling() ?? 'monthly';
            }

            return [
                'id'             => $p->getId(),
                'amount'         => $p->getAmount(),
                'cycle'          => $cycle,
                'status'         => strtoupper($p->getStatus()),
                'paidAt'         => $p->getPaidAt()?->format('Y-m-d H:i:s'),
                'invoiceNumber'  => $p->getInvoiceNumber(),
                'subscriptionId' => $sub?->getId(),
                'user'           => $user,
                'service'        => $service,
                'fraud'          => $fc ? [
                    'score' => $fc->getScore(),
                    'level' => $fc->getLevel(),
                ] : null,
            ];
        }, $payments);

        return $this->json([
            'items'      => $items,
            'total'      => $total,
            'page'       => $page,
            'perPage'    => $perPage,
            'totalPages' => (int) ceil($total / $perPage),
        ]);
    }
}
