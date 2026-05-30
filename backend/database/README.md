# Base de données — CynaSecure

Ce dossier contient le dump SQL de démonstration permettant d'initialiser la base
MySQL avec un jeu de données minimal et anonymisé (catégories, services, contenu
de la page d'accueil, un code promo, deux comptes de test).

## Contenu

- `cynasecure_demo.sql` — structure complète des 17 tables, migrations Doctrine
  enregistrées, et données de démo. Toutes les informations personnelles
  (utilisateurs, adresses, commandes, paiements, abonnements, messages contact
  et chatbot, contrôles de fraude) ont été retirées.

## Comptes de démonstration

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Administrateur | `admin@demo.local` | `Admin1234!` |
| Client | `user@demo.local` | `Demo1234!` |

Les mots de passe sont stockés en `argon2id` (paramètres Symfony par défaut).

## Import

### Via la ligne de commande

```bash
mysql -u root -p -e "CREATE DATABASE cynasecure CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p cynasecure < backend/database/cynasecure_demo.sql
```

### Via phpMyAdmin

1. Créer une base nommée `cynasecure` (interclassement `utf8mb4_unicode_ci`).
2. Onglet **Importer** → sélectionner `cynasecure_demo.sql` → **Exécuter**.

### Configuration Symfony

Adapter la variable `DATABASE_URL` dans `backend/.env.local` :

```
DATABASE_URL="mysql://root:@127.0.0.1:3306/cynasecure?serverVersion=8.0&charset=utf8mb4"
```

## Notes

- Le dump cible MySQL 8 (utf8mb4). Compatible MariaDB 10.6+.
- Les `AUTO_INCREMENT` sont réinitialisés à 1 sur les tables vides ; l'admin
  démo a l'id 1, le client démo l'id 2 (`AUTO_INCREMENT=3`).
- Pour repartir d'une base totalement vide après import, supprimer simplement
  les deux lignes de la table `user`.
