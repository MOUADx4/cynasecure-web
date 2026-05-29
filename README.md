# Cynasecure

> Plateforme e-commerce SaaS pour la commercialisation de solutions de cybersécurité d'entreprise (SOC, EDR, XDR, CSPM, Zero Trust, NDR).

Projet fil rouge B3 · H3 HITEMA · Promotion 2025-2026.

![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php&logoColor=white&style=flat-square)
![Symfony](https://img.shields.io/badge/Symfony-7.4-000000?logo=symfony&logoColor=white&style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white&style=flat-square)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/license-propriétaire-lightgrey?style=flat-square)

---

## Sommaire

1. [Aperçu](#aperçu)
2. [Architecture du dépôt](#architecture-du-dépôt)
3. [Fonctionnalités](#fonctionnalités)
4. [Stack technique](#stack-technique)
5. [Prérequis](#prérequis)
6. [Installation](#installation)
7. [Configuration](#configuration)
8. [Lancement](#lancement)
9. [Tests](#tests)
10. [Captures d'écran](#captures-décran)
11. [Sécurité](#sécurité)
12. [Internationalisation](#internationalisation)
13. [Accessibilité](#accessibilité)
14. [Application mobile](#application-mobile)
15. [Dépannage](#dépannage)
16. [Licence](#licence)

---

## Aperçu

Cynasecure est une plateforme web permettant à une entreprise de cybersécurité de vendre ses services SaaS en ligne. Elle couvre l'intégralité du parcours client : navigation du catalogue, recherche avancée, souscription d'abonnement, paiement sécurisé, gestion du compte et du cycle de vie des abonnements.

Le projet comprend trois composants :

- un **site web** (frontend React + back-office administrateur) ;
- une **API REST** (backend Symfony + base MySQL) ;
- une **application mobile** React Native, miroir du site (voir [`mobile/`](mobile/README.md)).

![Page d'accueil](Captures/home.png)

---

## Architecture du dépôt

```
cynasecure/
├── backend/            API REST Symfony 7.4 + Doctrine
├── frontend/           Site web et back-office (React + Vite)
├── mobile/             Application mobile React Native (Expo)
├── Captures/           Captures d'écran du site web
├── Captures_mobile/    Captures d'écran de l'application mobile
└── README.md
```

Le frontend et le backend forment le livrable web. L'application mobile dispose de son propre README ([`mobile/README.md`](mobile/README.md)).

---

## Fonctionnalités

### Espace client

- **Catalogue** : recherche avancée à 5 facettes (texte, prix, catégorie multi-sélection, disponibilité, type), tri par pertinence / prix / nouveauté, pagination.
- **Fiche service** : carrousel d'illustrations, caractéristiques techniques, CTA dynamique selon disponibilité, services similaires.
- **Panier** : ajout/retrait, durée d'abonnement (mensuel/annuel), application de codes promotionnels, persistance de session.
- **Tunnel de commande** : 4 étapes (authentification ou mode invité → adresse → paiement → confirmation), Stripe Elements et PayPal.
- **Compte** : profil, carnet d'adresses, méthodes de paiement enregistrées, gestion des abonnements (renouveler, changer de cycle, résilier), historique de commandes regroupé par année, téléchargement des factures PDF.
- **Sécurité** : inscription avec confirmation par e-mail, double authentification (TOTP), changement d'e-mail validé par lien, politique de mot de passe forte, « Se souvenir de moi ».
- **Contact** : formulaire avec persistance back-office et chatbot avec FAQ et escalade vers le support.

### Back-office administrateur

- **Tableau de bord** : KPI (services, utilisateurs, abonnements actifs, MRR) et trois graphiques (ventes par jour/semaine, paniers moyens par catégorie, répartition des ventes par catégorie).
- **Gestion** : services, catégories, utilisateurs, abonnements, paiements, codes promotionnels, contenu de la page d'accueil (carrousel, top produits, grille de catégories).
- **Modération** : messages de contact et conversations chatbot.
- **Sécurité** : double authentification obligatoire pour les comptes administrateurs.

### Transversal

- Site multilingue (français, anglais, espagnol).
- Détection des transactions à risque (Stripe Radar + scoring interne).
- Renouvellement automatique des abonnements (commande Symfony planifiable en cron).
- Webhooks Stripe et PayPal pour la synchronisation asynchrone des paiements.
- Conformité accessibilité WCAG 2.1 niveau AA.

---

## Stack technique

### Frontend

| Technologie | Version | Rôle |
|---|---|---|
| ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square) | 18.3 | Bibliothèque UI |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square) | 5.8 | Typage statique |
| ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square) | 5.4 | Bundler / serveur de dev |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square) | 3.4 | Framework CSS |
| ![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white&style=flat-square) | 6.30 | Routage |
| ![i18next](https://img.shields.io/badge/i18next-26-26A69A?logo=i18next&logoColor=white&style=flat-square) | 26 | Internationalisation |
| ![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white&style=flat-square) | 9.6 | Stripe Elements |
| ![PayPal](https://img.shields.io/badge/PayPal-00457C?logo=paypal&logoColor=white&style=flat-square) | 9.2 | Boutons PayPal |
| ![Recharts](https://img.shields.io/badge/Recharts-2-22B5BF?style=flat-square) | 2.15 | Graphiques admin |
| ![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white&style=flat-square) | 3.2 | Tests unitaires |

### Backend

| Technologie | Version | Rôle |
|---|---|---|
| ![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php&logoColor=white&style=flat-square) | 8.2+ | Langage |
| ![Symfony](https://img.shields.io/badge/Symfony-7.4-000000?logo=symfony&logoColor=white&style=flat-square) | 7.4 | Framework |
| ![Doctrine](https://img.shields.io/badge/Doctrine-ORM_3-FC6A31?logo=doctrine&logoColor=white&style=flat-square) | 3.6 | ORM et migrations |
| ![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white&style=flat-square) | 8.0+ | Base de données |
| ![Stripe](https://img.shields.io/badge/Stripe_PHP-635BFF?logo=stripe&logoColor=white&style=flat-square) | 20.1 | SDK Stripe serveur |
| ![Dompdf](https://img.shields.io/badge/Dompdf-3-E10056?style=flat-square) | 3.1 | Génération des factures PDF |
| Scheb 2FA Bundle | 7.13 | Double authentification TOTP |
| Nelmio CORS Bundle | 2.6 | Politique CORS |

### Outillage

- Composer 2, npm 10
- Symfony CLI
- Stripe CLI (webhooks en développement)
- Git

---

## Prérequis

| Logiciel | Version minimale |
|---|---|
| PHP | 8.2 |
| Composer | 2.5 |
| Node.js | 20 LTS |
| npm | 10 |
| MySQL / MariaDB | 8.0 / 10.6 |
| Symfony CLI | dernière |
| Stripe CLI | dernière (optionnel, recommandé) |

Extensions PHP requises : `ctype`, `iconv`, `pdo_mysql`, `mbstring`, `intl`, `openssl`, `xml`, `curl`.

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/<votre-organisation>/cynasecure.git
cd cynasecure
```

### 2. Backend

```bash
cd backend
composer install
```

### 3. Frontend

```bash
cd ../frontend
npm install
```

### 4. Base de données

```bash
cd ../backend
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate --no-interaction
```

Pour charger des données de démonstration (si des fixtures sont présentes) :

```bash
php bin/console doctrine:fixtures:load --no-interaction
```

---

## Configuration

### Backend — `backend/.env.local`

À créer à partir du fichier `.env` fourni :

```dotenv
APP_ENV=dev
APP_SECRET=<chaîne_aléatoire_32_caractères>

DATABASE_URL="mysql://utilisateur:motdepasse@127.0.0.1:3306/cynasecure?serverVersion=8.0&charset=utf8mb4"

MAILER_DSN=null://null

# Stripe (mode test)
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_CURRENCY=eur

# PayPal (mode sandbox)
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=xxxxx
PAYPAL_SECRET=xxxxx
PAYPAL_WEBHOOK_ID=
PAYPAL_CURRENCY=EUR

# URL du frontend (liens des e-mails)
FRONTEND_URL=http://localhost:5173
```

Clés Stripe : [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys).
Identifiants PayPal sandbox : [developer.paypal.com](https://developer.paypal.com).

### Frontend — `frontend/.env.local`

```dotenv
VITE_API_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
VITE_PAYPAL_CLIENT_ID=xxxxx
```

Les fichiers `.env.local` sont ignorés par Git.

---

## Lancement

Le développement nécessite trois terminaux.

### Terminal 1 — Backend

```bash
cd backend
symfony serve
```

API disponible sur `http://localhost:8000`.

### Terminal 2 — Webhooks Stripe (optionnel)

```bash
stripe listen --forward-to http://localhost:8000/api/webhooks/stripe
```

Reporter le secret `whsec_...` affiché dans `STRIPE_WEBHOOK_SECRET`.

### Terminal 3 — Frontend

```bash
cd frontend
npm run dev
```

Site disponible sur `http://localhost:5173`.

### Renouvellement automatique des abonnements (production)

```bash
php bin/console app:subscriptions:renew
```

Exemple de tâche cron quotidienne :

```cron
0 3 * * * cd /chemin/vers/cynasecure/backend && php bin/console app:subscriptions:renew
```

---

## Tests

### Frontend

```bash
cd frontend
npm run test
```

### Backend

```bash
cd backend
php bin/phpunit
```

### Accessibilité (manuel)

Ouvrir Chrome DevTools → onglet **Lighthouse** → cocher **Accessibility** → mode **Mobile** → lancer l'audit sur les pages clés (`/`, `/catalogue`, `/services/1`, `/checkout`, `/contact`).

---

## Captures d'écran

### Page d'accueil
![Accueil](Captures/home.png)

### Catalogue
![Catalogue](Captures/catalogue.png)

### Fiche service
![Fiche service](Captures/service_details.png)

### Panier
![Panier](Captures/cart.png)

### Tunnel de paiement
![Checkout](Captures/checkout.png)

### Tableau de bord utilisateur
![Dashboard utilisateur](Captures/dash_user.png)

### Profil
![Profil](Captures/profil.png)

### Contact
![Contact](Captures/contact.png)

### Tableau de bord administrateur
![Dashboard admin](Captures/dash_admin.png)

---

## Sécurité

| Mesure | Implémentation |
|---|---|
| Authentification | Sessions Symfony (cookie HttpOnly, SameSite=Lax) |
| Double authentification | TOTP via `scheb/2fa-bundle`, obligatoire pour les administrateurs |
| Mot de passe | Argon2id, politique forte (8+ caractères, majuscule, minuscule, chiffre, spécial) |
| Confirmation e-mail | Token aléatoire (32 octets) hashé SHA-256, validité 24 h |
| Paiement | Stripe Elements + 3D Secure / SCA automatique |
| Données bancaires | Aucune donnée carte stockée, seul l'identifiant Stripe est conservé |
| Webhooks | Vérification de signature côté serveur (Stripe et PayPal) |
| Détection de fraude | Stripe Radar + scoring interne (IP, fréquence, e-mails jetables) |
| Protections | CSRF (formulaires), échappement XSS (React/Twig), requêtes Doctrine paramétrées |
| Rate limiting | Endpoints sensibles (`/api/auth/*`, `/api/cart/promo`, webhooks) |

---

## Internationalisation

Trois langues : **français** (défaut), **anglais**, **espagnol**. Le sélecteur de langue est accessible depuis le menu de navigation, le choix est persisté localement. Le back-office reste en français.

Fichiers de traduction : `frontend/src/i18n/locales/{fr,en,es}.json`.

---

## Accessibilité

Conforme **WCAG 2.1 niveau AA** : score Lighthouse Accessibility de 100/100 sur la page d'accueil, navigation clavier complète avec skip-link, focus visible, `aria-label` traduits, contrastes ≥ 4.5:1, zones tactiles ≥ 44×44 px, annonces dynamiques via `aria-live`.

---

## Application mobile

L'application mobile React Native se trouve dans [`mobile/`](mobile/README.md). Elle consomme la même API Symfony et la même base de données que le site web. Voir son README dédié pour l'installation et le lancement.

---

## Dépannage

### La migration Doctrine échoue
Vérifier `DATABASE_URL`. Pour repartir d'une base propre :

```bash
php bin/console doctrine:database:drop --force
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate --no-interaction
```

### Stripe : « No signature provided »
Le secret `STRIPE_WEBHOOK_SECRET` est manquant. Relancer `stripe listen` et copier le `whsec_...` dans `backend/.env.local`.

### Le frontend ne contacte pas le backend
Vérifier la configuration CORS dans `backend/config/packages/nelmio_cors.yaml` et la variable `VITE_API_URL` côté frontend.

### Les e-mails ne partent pas en développement
`MAILER_DSN=null://null` désactive l'envoi réel. Les e-mails sont visibles dans le profiler Symfony, ou utiliser `smtp://localhost:1025` avec Mailpit.

---

## Licence

Projet académique réalisé dans le cadre du titre **Coordinateur de Projets Informatiques** (H3 HITEMA). Code propriétaire — usage pédagogique exclusivement.
