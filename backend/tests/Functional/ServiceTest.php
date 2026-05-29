<?php

namespace App\Tests\Functional;

use App\Entity\Category;
use App\Entity\Service;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\SchemaTool;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ServiceTest extends WebTestCase
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

    private function createCategory(string $name = 'Cybersécurité'): Category
    {
        $cat = new Category();
        $cat->setName($name);
        $cat->setSlug(strtolower(str_replace(' ', '-', $name)));
        $this->em->persist($cat);
        $this->em->flush();
        return $cat;
    }

    private function createService(Category $cat, string $name = 'XDR Pro'): Service
    {
        $svc = new Service();
        $svc->setName($name);
        $svc->setDescription('Description test');
        $svc->setPriceMonthly(99.0);
        $svc->setType('saas');
        $svc->setCategory($cat);
        $svc->setFeatures([]);
        $this->em->persist($svc);
        $this->em->flush();
        return $svc;
    }

    public function test_liste_services_retourne_200_et_tableau(): void
    {
        $cat = $this->createCategory();
        $this->createService($cat);

        $this->client->request('GET', '/api/services');

        $this->assertResponseIsSuccessful();
        $data = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertIsArray($data);
        $this->assertNotEmpty($data);
    }

    public function test_service_inexistant_retourne_404(): void
    {
        $this->client->request('GET', '/api/services/99999');

        $this->assertResponseStatusCodeSame(404);
    }

    public function test_recherche_retourne_structure_correcte(): void
    {
        $cat = $this->createCategory('Réseau');
        $this->createService($cat, 'Firewall NG');

        $this->client->request('GET', '/api/services/search?q=Firewall');

        $this->assertResponseIsSuccessful();
        $data = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('total', $data);
        $this->assertArrayHasKey('items', $data);
        $this->assertIsArray($data['items']);
    }

    public function test_recherche_sans_resultat_retourne_total_zero(): void
    {
        $this->client->request('GET', '/api/services/search?q=rien_xyz_inexistant');

        $this->assertResponseIsSuccessful();
        $data = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertSame(0, $data['total']);
    }

    public function test_filtre_par_type_ne_retourne_que_ce_type(): void
    {
        $cat = $this->createCategory('Audit');
        $this->createService($cat, 'Service SaaS');

        $this->client->request('GET', '/api/services?type=saas');

        $this->assertResponseIsSuccessful();
        $data = json_decode($this->client->getResponse()->getContent(), true);
        foreach ($data as $item) {
            $this->assertSame('saas', $item['type']);
        }
    }
}
