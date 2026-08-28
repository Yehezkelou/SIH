# 📁 Arborescence du frontend `auth-service` (Next.js)

Ce document explique **comment ranger les fichiers** du frontend `auth-service`, et **pourquoi** chaque dossier existe. Le but : que n'importe qui dans l'équipe sache où mettre un nouveau fichier sans réfléchir 10 minutes.

> Contexte : on est sur **Next.js 16 (App Router)**, **React 19**, **Tailwind**, dans un **monorepo Nx**. `auth-service` est le **premier** frontend, mais il y en aura d'autres (patient, admission, urgences…). On range donc les choses en pensant « et si demain il y a 5 apps ? ».

> ⚠️ **Important (vérifié dans le backend) :** il n'y a **pas d'inscription publique**. La création de compte passe par `POST /users`, réservé aux admins. Il n'y a donc **pas** de page `/register` dans le groupe `(auth)` — la création d'utilisateur vit dans la zone `admin/` protégée par le rôle RBAC. Voir `PLAN_DE_CODAGE.md`.

---

## 🌳 L'arborescence complète

```
apps/frontend/auth-service/
├── public/                      # Fichiers servis tels quels (favicon, images statiques)
│
├── src/
│   ├── app/                     # 🧭 LE ROUTAGE (App Router Next.js)
│   │   ├── layout.tsx           #    Enveloppe commune à toutes les pages (html, body, providers)
│   │   ├── global.css           #    Styles globaux + directives Tailwind
│   │   ├── page.tsx             #    Page d'accueil "/"
│   │   │
│   │   ├── (auth)/              #    Groupe de routes publiques d'auth (écran centré)
│   │   │   ├── layout.tsx       #    Layout partagé des pages d'auth (ex: écran centré)
│   │   │   ├── login/
│   │   │   │   └── page.tsx     #    "/login"
│   │   │   ├── mfa/
│   │   │   │   └── page.tsx     #    "/mfa" (saisie du code à 6 chiffres)
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx     #    "/forgot-password"
│   │   │   └── reset-password/
│   │   │       └── page.tsx     #    "/reset-password"
│   │   │
│   │   ├── admin/               #    Zone ADMIN (protégée par rôle RBAC dans le middleware)
│   │   │   └── users/
│   │   │       ├── page.tsx     #    "/admin/users" — liste (GET /users)
│   │   │       ├── new/
│   │   │       │   └── page.tsx #    "/admin/users/new" — créer un compte (POST /users) = le vrai "register"
│   │   │       └── [id]/
│   │   │           └── page.tsx #    "/admin/users/:id" — détail, rôles, statut, documents
│   │   │
│   │   └── api/                 #    Routes API internes au front (BFF, proxy, callbacks)
│   │       └── auth/
│   │           └── [...]/route.ts
│   │
│   ├── features/                # 🧩 LA LOGIQUE MÉTIER par fonctionnalité
│   │   ├── login/
│   │   │   ├── components/      #    Composants propres au login (LoginForm…)
│   │   │   ├── hooks/           #    useLogin()…
│   │   │   ├── api/             #    Appels réseau du login
│   │   │   └── schema.ts        #    Validation du formulaire (zod)
│   │   ├── mfa/
│   │   ├── password-reset/
│   │   └── users/               #    Admin RBAC : liste, création, rôles, statut (POST/GET/PUT/DELETE /users)
│   │
│   ├── components/              # 🎨 Composants d'UI RÉUTILISABLES dans CETTE app
│   │   ├── ui/                  #    Boutons, inputs, modales… (briques de base)
│   │   └── layout/             #    Header, Footer, Sidebar…
│   │
│   ├── lib/                     # 🔧 Code utilitaire technique
│   │   ├── api-client.ts        #    Client HTTP configuré (baseURL, intercepteurs)
│   │   ├── auth.ts             #    Gestion token / session côté client
│   │   └── utils.ts            #    Petites fonctions génériques (cn, formatDate…)
│   │
│   ├── hooks/                   # 🪝 Hooks React partagés dans l'app (useUser, useToast…)
│   │
│   ├── stores/                  # 🗃️ État global (Zustand/Context) — ex: session utilisateur
│   │
│   ├── config/                  # ⚙️ Constantes & config (routes, rôles RBAC, env)
│   │   ├── routes.ts
│   │   └── env.ts
│   │
│   ├── types/                   # 📐 Types TypeScript partagés dans l'app
│   │
│   └── middleware.ts            # 🚦 Middleware Next : protège les routes, gère les redirections
│
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 📖 Pourquoi chaque dossier ? (en une phrase simple)

### `public/`
Tout ce qui est servi **sans transformation** : favicon, logo, images. Si tu mets `logo.png` ici, il est accessible à `/logo.png`.

### `src/app/` — le cœur du routage
Avec l'App Router, **chaque dossier = une URL**. Un fichier `page.tsx` dans `login/` crée automatiquement la page `/login`. C'est la règle numéro 1 de Next.js 16.

- **`layout.tsx`** : le « cadre » réutilisé autour des pages. Le layout racine contient le `<html>`. On évite ainsi de répéter le header/footer sur chaque page.
- **`(auth)/`** : les parenthèses créent un **groupe de routes**. Ça permet de partager un layout (ex : écran centré fond dégradé) **sans** ajouter `/auth` dans l'URL. `/login` reste `/login`.
- **`admin/`** : la zone d'administration (liste des comptes, création d'utilisateur, gestion des rôles). Contrairement à `(auth)/`, ces pages sont **réservées** : le `middleware.ts` doit vérifier le **rôle RBAC**, pas seulement « connecté ». C'est ici que se fait la création de compte (`POST /users`) — il n'y a pas d'inscription publique.
- **`api/`** : des petites routes serveur **dans le front**. Utile comme *proxy* vers le backend Auth (on cache l'URL interne, on ajoute le token httpOnly côté serveur). C'est le pattern « BFF » (Backend For Frontend).

> 👉 Règle : dans `app/`, on met **le moins de logique possible**. Une `page.tsx` doit surtout appeler un composant de `features/`. `app/` = « quelle URL », `features/` = « ce que ça fait ».

### `src/features/` — rangé par fonctionnalité, pas par type
C'est le dossier le plus important. Au lieu de tout mélanger, on regroupe **tout ce qui concerne une fonctionnalité** au même endroit : le login a ses composants, ses hooks, ses appels réseau et sa validation dans `features/login/`.

**Pourquoi ?** Quand tu travailles sur le MFA, tout est dans `features/mfa/`. Tu n'ouvres pas 6 dossiers différents. Et si on supprime une fonctionnalité, on supprime **un seul dossier**.

### `src/components/` — l'UI réutilisable de l'app
Les briques visuelles **génériques** utilisées à plusieurs endroits : `Button`, `Input`, `Modal`, `Header`.

- **`ui/`** : les plus petites briques, sans logique métier (un bouton ne sait pas ce qu'est un « login »).
- **`layout/`** : les gros morceaux de mise en page.

> Différence avec `features/*/components/` : ici c'est **générique et réutilisable partout** ; là-bas c'est **spécifique à une fonctionnalité**.

### `src/lib/` — la « boîte à outils » technique
Le code qui n'est **pas de l'UI** et **pas une fonctionnalité** : le client HTTP, la gestion du token, des utilitaires. Si tu te demandes « où mettre la config axios ? », c'est ici.

### `src/hooks/` — les hooks partagés
Les hooks React utilisés dans **plusieurs** fonctionnalités (ex : `useToast`, `useUser`). Un hook utilisé par **une seule** feature reste dans `features/xxx/hooks/`.

### `src/stores/` — l'état global
L'état partagé dans toute l'app (ex : l'utilisateur connecté, son rôle RBAC). Séparé pour qu'on sache **où vit la vérité** sur la session.

### `src/config/` — les constantes
Les valeurs fixes : la liste des routes, les rôles (RBAC), les variables d'environnement validées. On les centralise pour ne **pas** écrire `"/login"` en dur dans 20 fichiers.

### `src/types/` — les types TypeScript
Les types partagés dans l'app. ⚠️ **Attention** (voir plus bas) : les types qui viennent du **backend** (User, Role, réponses API) devraient plutôt venir de `libs/contracts`, pas être recopiés ici.

### `src/middleware.ts` — le videur à l'entrée
S'exécute **avant** d'afficher une page. C'est lui qui dit « pas connecté → redirige vers `/login` » ou « rôle insuffisant → interdit ». Essentiel pour un service d'authentification.

---

## 🤔 Faire une doc des composants partagés, séparée de la doc du microservice frontend : bonne idée ?

**Oui, très bonne idée — à condition de bien distinguer les deux niveaux.** Voici pourquoi.

### Le raisonnement

Tu as **plusieurs frontends** (auth, patient, admission, urgences). Certaines choses sont **communes à tous** : le bouton, l'input, la charte graphique, le client HTTP, les types venant du backend. Si chaque app redéfinit son propre bouton, tu auras **4 boutons différents** et une UI incohérente. La solution monorepo Nx, c'est une **librairie partagée** :

```
libs/
├── ui/          # Design system partagé : Button, Input, Card… (importé par TOUTES les apps front)
└── contracts/   # (déjà existant) Types & contrats venant du backend
```

À partir de là, **deux docs pour deux publics différents** :

| Doc | Où | Pour qui | Contenu |
|-----|-----|----------|---------|
| **Doc du design system partagé** | `libs/ui/README.md` | Toutes les équipes front | « Voici le `Button`, ses variantes, comment l'importer » |
| **Doc du microservice `auth-service`** | ce fichier + `auth-service/README.md` | L'équipe auth | « Voici les pages, les features, comment lancer le login/MFA » |

### Pourquoi les séparer plutôt que tout mettre ensemble ?

1. **Publics différents.** La doc partagée s'adresse à *tout le monde* ; la doc auth s'adresse à *l'équipe auth*. Mélanger les deux noie l'info.
2. **Rythmes de changement différents.** Le design system change rarement et impacte tout le monde. La doc auth change souvent. On ne veut pas que chaque petit changement du login pollue la doc que lisent les 4 équipes.
3. **Une seule source de vérité.** Si on documentait le `Button` dans chaque app, on aurait 4 versions divergentes. Une doc unique dans `libs/ui/` = zéro duplication.
4. **Ça reflète le code.** Le code partagé est dans `libs/`, le code spécifique est dans `apps/frontend/auth-service/`. **La doc doit être au même endroit que le code qu'elle décrit** — sinon on oublie de la mettre à jour.

### ⚠️ Le seul vrai risque

Une doc partagée **n'a de sens que s'il existe vraiment du code partagé** (`libs/ui`). Documenter des composants « partagés » qui vivent en réalité dans une seule app, c'est un mensonge : les autres ne peuvent pas les importer. Donc l'ordre est : **1)** créer `libs/ui`, **2)** y déplacer les composants réutilisés, **3)** le documenter là.

### ✅ Recommandation concrète

- **Maintenant** (une seule app auth) : garde tout dans `auth-service/`, documente ici. Pas besoin de sur-organiser.
- **Dès la 2ᵉ app front** : extrais `Button`, `Input`, `api-client`, le thème Tailwind vers **`libs/ui`**, et donne-lui **sa propre doc** (`libs/ui/README.md`).
- Garde `libs/contracts` (déjà là) comme **source unique des types backend** — ne recopie pas ces types dans `src/types/`.

> **En une phrase :** oui, sépare la doc des composants partagés de la doc du microservice, parce que ce sont deux publics, deux rythmes et deux emplacements de code différents — mais fais-le seulement quand le code partagé existe réellement dans `libs/`.
