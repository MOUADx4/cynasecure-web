<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\Payment;
use App\Entity\Subscription;
use App\Repository\ServiceRepository;
use App\Repository\SubscriptionRepository;
use App\Service\PayPalService;
use DateInterval;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Stripe\Webhook;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Checkout')]
class WebhookController extends AbstractController
{
    #[OA\Response(response: 200, description: 'Webhook PayPal traité')]
    #[Route('/api/webhooks/paypal', name: 'webhook_paypal', methods: ['POST'])]
    public function paypal(
        Request $request,
        PayPalService $paypal,
        EntityManagerInterface $em
    ): Response {
        $rawBody = $request->getContent();

        $headers = [
            'paypal-auth-algo'         => $request->headers->get('paypal-auth-algo', ''),
            'paypal-cert-url'          => $request->headers->get('paypal-cert-url', ''),
            'paypal-transmission-id'   => $request->headers->get('paypal-transmission-id', ''),
            'paypal-transmission-sig'  => $request->headers->get('paypal-transmission-sig', ''),
            'paypal-transmission-time' => $request->headers->get('paypal-transmission-time', ''),
        ];

        if (!$paypal->verifyWebhookSignature($headers, $rawBody)) {
            return new Response('Invalid signature', 400);
        }

        $event = json_decode($rawBody, true);
        $type  = $event['event_type'] ?? '';

        match ($type) {
            'PAYMENT.CAPTURE.COMPLETED' => $this->handleCaptureCompleted($event, $em),
            'PAYMENT.CAPTURE.DENIED'    => $this->handleCaptureDenied($event, $em),
            'PAYMENT.CAPTURE.REFUNDED'  => $this->handleCaptureRefunded($event, $em),
            default                     => null,
        };

        return new Response('OK', 200);
    }

    #[OA\Response(response: 200, description: 'Webhook Stripe traité')]
    #[Route('/api/stripe/webhook', name: 'stripe_webhook', methods: ['POST'])]
    public function stripe(
        Request $request,
        EntityManagerInterface $em,
        SubscriptionRepository $subscriptionRepo,
        ServiceRepository $serviceRepo
    ): Response {
        $payload   = $request->getContent();
        $sigHeader = $request->headers->get('stripe-signature');
        $secret    = $_ENV['STRIPE_WEBHOOK_SECRET'] ?? null;

        if (!$secret) {
            return new Response('Webhook secret not configured', 500);
        }

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $secret);
        } catch (\Exception $e) {
            return new Response('Invalid signature', 400);
        }

        switch ($event->type) {

            case 'checkout.session.completed':
                $session   = $event->data->object;
                $serviceId = $session->metadata->serviceId ?? null;
                $cycle     = $session->metadata->cycle ?? null;

                if (!$serviceId || !$cycle) break;

                $service = $serviceRepo->find($serviceId);
                if (!$service) break;

                $subscription = new Subscription();
                $subscription->setUserEmail($session->customer_email ?? null);
                $subscription->setService($service);
                $subscription->setCycle($cycle);
                $subscription->setStatus('ACTIVE');
                $subscription->setStripeSubscriptionId($session->subscription ?? null);
                $subscription->setStartDate(new \DateTimeImmutable());

                if ($cycle === 'monthly') {
                    $subscription->setPrice($service->getPriceMonthly());
                    $subscription->setNextBillingAt((new DateTime())->add(new DateInterval('P1M')));
                } else {
                    $subscription->setPrice($service->getPriceYearly());
                    $subscription->setNextBillingAt((new DateTime())->add(new DateInterval('P1Y')));
                }

                $em->persist($subscription);
                $em->flush();
                break;

            case 'invoice.paid':
                $invoice              = $event->data->object;
                $stripeSubscriptionId = $invoice->subscription ?? null;

                if (!$stripeSubscriptionId) break;

                $subscription = $subscriptionRepo->findOneBy(['stripeSubscriptionId' => $stripeSubscriptionId]);
                if (!$subscription) break;

                if ($subscription->getCycle() === 'monthly') {
                    $subscription->setNextBillingAt((new DateTime())->add(new DateInterval('P1M')));
                } else {
                    $subscription->setNextBillingAt((new DateTime())->add(new DateInterval('P1Y')));
                }

                $payment = new Payment();
                $payment->setSubscription($subscription);
                $payment->setAmount($subscription->getPrice());
                $payment->setCycle($subscription->getCycle());
                $payment->setStatus('paid');
                $payment->setStripePaymentIntentId($invoice->payment_intent ?? null);
                $payment->setPaidAt(new \DateTimeImmutable());

                $em->persist($payment);
                $em->flush();
                break;

            case 'invoice.payment_failed':
                $invoice              = $event->data->object;
                $stripeSubscriptionId = $invoice->subscription ?? null;

                if (!$stripeSubscriptionId) break;

                $subscription = $subscriptionRepo->findOneBy(['stripeSubscriptionId' => $stripeSubscriptionId]);
                if (!$subscription) break;

                $subscription->setStatus('PAST_DUE');
                $em->flush();
                break;
        }

        return new Response('OK', 200);
    }

    private function handleCaptureCompleted(array $event, EntityManagerInterface $em): void
    {
        $paypalOrderId = $event['resource']['supplementary_data']['related_ids']['order_id'] ?? null;
        if (!$paypalOrderId) return;

        $order = $em->getRepository(Order::class)->findOneBy(['paypalOrderId' => $paypalOrderId]);
        if (!$order) return;

        $order->setStatus('PAID');
        $em->flush();
    }

    private function handleCaptureDenied(array $event, EntityManagerInterface $em): void
    {
        $paypalOrderId = $event['resource']['supplementary_data']['related_ids']['order_id'] ?? null;
        if (!$paypalOrderId) return;

        $order = $em->getRepository(Order::class)->findOneBy(['paypalOrderId' => $paypalOrderId]);
        if (!$order) return;

        $order->setStatus('FAILED');
        $em->flush();
    }

    private function handleCaptureRefunded(array $event, EntityManagerInterface $em): void
    {
        $paypalOrderId = $event['resource']['supplementary_data']['related_ids']['order_id'] ?? null;
        if (!$paypalOrderId) return;

        $order = $em->getRepository(Order::class)->findOneBy(['paypalOrderId' => $paypalOrderId]);
        if (!$order) return;

        $order->setStatus('REFUNDED');
        $em->flush();
    }
}
