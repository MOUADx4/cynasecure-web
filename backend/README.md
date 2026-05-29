# Cynasecure — Backend

API REST du projet Cynasecure, développée avec Symfony 7.4 et Doctrine ORM. Elle expose les endpoints consommés par le site web (`frontend/`) et l'application mobile (`mobile/`).

## Démarrage rapide

```bash
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate --no-interaction
symfony serve
```

L'API tourne sur `http://localhost:8000`.

## Configuration

Créer un fichier `.env.local` (clés Stripe, identifiants PayPal, URL de la base de données, secret applicatif). Le détail des variables figure dans le README principal.

## Documentation complète

L'installation pas à pas, la configuration, la sécurité et l'architecture sont décrites dans le README à la racine du dépôt.

→ [../README.md](../README.md)
