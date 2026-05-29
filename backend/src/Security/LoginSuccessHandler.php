<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\HttpFoundation\Request;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    public function __construct(private EntityManagerInterface $em) {}

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
    {
        /** @var User $user */
        $user = $this->em->getRepository(User::class)->findOneBy([
            'email' => $token->getUser()->getUserIdentifier(),
        ]);

        $displayName = $user?->getDisplayName() ?? '';
        $parts = explode(' ', $displayName, 2);

        $requires2fa = $user?->isTotpAuthenticationEnabled() ?? false;

        return new JsonResponse([
            'id'              => $user?->getId(),
            'email'           => $user?->getEmail(),
            'displayName'     => $displayName,
            'firstName'       => $parts[0] ?? $displayName,
            'lastName'        => $parts[1] ?? '',
            'roles'           => $user?->getRoles() ?? [],
            'role'            => $user?->getRole(),
            'phone'           => $user?->getPhone(),
            'company'         => $user?->getCompany(),
            'totpEnabled'     => $user?->isTotpEnabled() ?? false,
            'emailVerifiedAt' => $user?->getEmailVerifiedAt()?->format('c'),
            'createdAt'       => $user?->getCreatedAt()?->format('c'),
            'updatedAt'       => $user?->getUpdatedAt()?->format('c'),
            'requires2fa'     => $requires2fa,
        ]);
    }
}
