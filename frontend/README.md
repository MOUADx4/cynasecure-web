# Cynasecure — Frontend

Site web et back-office du projet Cynasecure, développés avec React, TypeScript, Vite et Tailwind CSS. L'application consomme l'API Symfony située dans `backend/`.

## Démarrage rapide

```bash
npm install
npm run dev
```

Le site tourne sur `http://localhost:5173`. Le backend doit être lancé en parallèle (voir `backend/`).

## Configuration

Créer un fichier `.env.local` :

```dotenv
VITE_API_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
VITE_PAYPAL_CLIENT_ID=xxxxx
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run test` | Tests unitaires (Vitest) |

## Documentation complète

La présentation du projet, l'installation complète, la sécurité et les captures d'écran sont dans le README à la racine du dépôt.

→ [../README.md](../README.md)
