<?php

namespace App\Tests\Functional;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\SchemaTool;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthTest extends WebTestCase
{
    private KernelBrowser $client;
    private EntityManagerInterface $em;

    protected function setUp(): void
    {
        parent::setUp();
        $this->client = static::createClient();
        $this->em     = static::getContainer()->get(EntityManagerInterface::class);

        $tool = new SchemaTool($this->em);
        $meta = $this->em->getMetadataFactory()->getAllMetadata();
        $tool->dropSchema($meta);
        $tool->createSchema($meta);
    }

    private function createVerifiedUser(string $email, string $plainPassword): User
    {
        $hasher = static::getContainer()->get(UserPasswordHasherInterface::class);

        $user = new User();
        $user->setEmail($email);
        $user->setDisplayName('Test User');
        $user->setRole('ROLE_USER');
        $user->setCreatedAt(new \DateTimeImmutable('-2 days'));
        $user->setUpdatedAt(new \DateTime('-2 days'));
        $user->setEmailVerifiedAt(new \DateTimeImmutable('-1 day'));
        $user->setPassword($hasher->hashPassword($user, $plainPassword));

        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }

    private function createUnverifiedUser(string $email, string $plainPassword): User
    {
        $hasher = static::getContainer()->get(UserPasswordHasherInterface::class);

        $user = new User();
        $user->setEmail($email);
        $user->setDisplayName('Unverified');
        $user->setRole('ROLE_USER');
        $user->setCreatedAt(new \DateTimeImmutable());
        $user->setUpdatedAt(new \DateTime());
        $user->setPassword($hasher->hashPassword($user, $plainPassword));

        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }

    private function jsonRequest(string $method, string $uri, array $data): void
    {
        $this->client->request(
            $method,
            $uri,
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode($data)
        );
    }

    public function test_register_avec_donnees_valides_retourne_201(): void
    {
        $email = 'new_' . uniqid() . '@example.com';

        $this->jsonRequest('POST', '/api/register', [
            'email'       => $email,
            'password'    => 'Secure1!Pass',
            'displayName' => 'Nouveau Compte',
        ]);

        $this->assertResponseStatusCodeSame(201);
        $data = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertSame($email, $data['email']);
        $this->assertSame('Nouveau Compte', $data['displayName']);
        $this->assertSame('ROLE_USER', $data['role']);
    }

    public function test_register_sans_email_retourne_400(): void
    {
        $this->jsonRequest('POST', '/api/register', ['password' => 'Secure1!Pass']);

        $this->assertResponseStatusCodeSame(400);
    }

    public function test_register_email_invalide_retourne_400(): void
    {
        $this->jsonRequest('POST', '/api/register', [
            'email'    => 'pas_un_email',
            'password' => 'Secure1!Pass',
        ]);

        $this->assertResponseStatusCodeSame(400);
    }

    public function test_register_mot_de_passe_faible_retourne_400(): void
    {
        $this->jsonRequest('POST', '/api/register', [
            'email'    => 'weak_' . uniqid() . '@example.com',
            'password' => 'court',
        ]);

        $this->assertResponseStatusCodeSame(400);
    }

    public function test_register_email_deja_utilise_retourne_400(): void
    {
        $email = 'dup_' . uniqid() . '@example.com';
        $this->createVerifiedUser($email, 'Secure1!Pass');

        $this->jsonRequest('POST', '/api/register', [
            'email'    => $email,
            'password' => 'Secure1!Pass',
        ]);

        $this->assertResponseStatusCodeSame(400);
        $body = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertStringContainsStringIgnoringCase('déjà', $body['message']);
    }

    public function test_login_mauvais_mot_de_passe_retourne_401(): void
    {
        $email = 'login_' . uniqid() . '@example.com';
        $this->createVerifiedUser($email, 'Secure1!Pass');

        $this->jsonRequest('POST', '/api/login', [
            'email'    => $email,
            'password' => 'MauvaisMotDePasse1!',
        ]);

        $this->assertResponseStatusCodeSame(401);
    }

    public function test_login_compte_non_verifie_retourne_403_avec_flag(): void
    {
        $email = 'unverified_' . uniqid() . '@example.com';
        $this->createUnverifiedUser($email, 'Secure1!Pass');

        $this->jsonRequest('POST', '/api/login', [
            'email'    => $email,
            'password' => 'Secure1!Pass',
        ]);

        $this->assertResponseStatusCodeSame(403);
        $body = $this->client->getResponse()->getContent();
        $this->assertStringContainsString('emailUnverified', $body);
    }

    public function test_me_sans_authentification_retourne_401(): void
    {
        $this->client->request('GET', '/api/me');

        $this->assertResponseStatusCodeSame(401);
    }
}
