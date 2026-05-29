<?php

namespace App\Repository;

use App\Entity\Service;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ServiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Service::class);
    }

    /**
     * Retourne les services triés par prix mensuel croissant.
     */
    public function findAllOrderedByPrice(): array
    {
        return $this->createQueryBuilder('s')
            ->orderBy('s.priceMonthly', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Recherche un service par nom (correspondance partielle).
     */
    public function searchByName(string $term): array
    {
        return $this->createQueryBuilder('s')
            ->where('s.name LIKE :term')
            ->setParameter('term', '%' . $term . '%')
            ->orderBy('s.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Retourne les services les plus chers selon le prix mensuel.
     */
    public function findMostExpensive(int $limit = 5): array
    {
        return $this->createQueryBuilder('s')
            ->orderBy('s.priceMonthly', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    /**
     * Filtre les services par type (saas / one_shot).
     */
    public function findByType(string $type): array
    {
        return $this->createQueryBuilder('s')
            ->where('s.type = :type')
            ->setParameter('type', $type)
            ->orderBy('s.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Filtre les services par slug de catégorie.
     */
    public function findByCategorySlug(string $slug): array
    {
        return $this->createQueryBuilder('s')
            ->join('s.category', 'c')
            ->where('c.slug = :slug')
            ->setParameter('slug', $slug)
            ->orderBy('s.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Recherche avancée sur le nom et la description.
     */
    public function search(string $term): array
    {
        return $this->createQueryBuilder('s')
            ->where('s.name LIKE :term OR s.description LIKE :term')
            ->setParameter('term', '%' . $term . '%')
            ->orderBy('s.name', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
