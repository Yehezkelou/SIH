# 🗺️ Plan de codage du frontend `auth-service` — par où commencer, jusqu'à finir

Ce document dit **dans quel ordre coder les pages** pour terminer **tout** le microservice `auth-service`, sans se perdre. On avance par **étapes** : chaque étape donne quelque chose qui **marche vraiment** avant de passer à la suivante.

> 🎯 Principe : **on ne code pas les jolies pages d'abord**. On code d'abord les fondations invisibles (client HTTP, session), puis le flux principal (login), puis on ajoute les fonctionnalités une par une.

---

## 📚 Ce que le backend expose déjà (la réalité)

Le frontend doit brancher **exactement** ces routes (trouvées dans le code du backend Auth) :

| Domaine | Routes backend |
|---------|----------------|
| **Connexion** | `POST /auth/login`, `POST /auth/login-pin`, `POST /auth/refresh`, `POST /auth/logout`, `POST /auth/logout-all`, `GET /auth/me` |
| **Mot de passe** | `POST /auth/change-password`, `POST /auth/forgot-password`, `POST /auth/reset-password` |
| **MFA** | `POST /auth/mfa/setup`, `POST /auth/mfa/enable`, `POST /auth/mfa/verify`, `POST /auth/mfa/disable` |
| **Utilisateurs (admin/RBAC)** | `POST /users`, `GET /users`, `GET /users/:id`, `PUT /users/:id`, `PATCH /users/:id/status`, `POST /users/:id/roles`, `DELETE /users/:id/roles/:roleId`, `DELETE /users/:id` |
| **Documents** | `POST /users/:id/documents`, `GET /users/:id/documents`, `DELETE /users/:id/documents/:documentId` |

👉 **Conclusion importante :** il n'y a **PAS** de route `register` publique. La création de compte se fait via `POST /users` — c'est donc un **écran d'administration**, pas une inscription publique. On adapte le plan à ça.

---

## 🧱 ÉTAPE 0 — Les fondations (à faire AVANT toute page)

**Pourquoi en premier :** sans ça, chaque page réinventerait la roue (appels réseau, gestion du token). On pose le socle une fois.

- [ ] `src/config/env.ts` — lire et valider l'URL du backend (`API_URL`).
- [ ] `src/config/routes.ts` — la liste des URLs (`/login`, `/mfa`…) pour ne pas les écrire en dur.
- [ ] `src/lib/api-client.ts` — le client HTTP central : baseURL, envoi du token, gestion du `401` → `refresh`.
- [ ] `src/lib/auth.ts` — stocker/lire la session (token en cookie httpOnly de préférence).
- [ ] `src/components/ui/` — les 3-4 briques de base : `Button`, `Input`, `Label`, `Alert`. (Juste ce qu'il faut, on enrichira plus tard.)
- [ ] `src/app/layout.tsx` — le layout racine + les providers (état global, toasts).

> ✅ **Fin de l'étape 0 :** on peut faire un appel réseau au backend et afficher un bouton. Rien de visible pour l'utilisateur, mais tout le reste s'appuie dessus.

---

## 🔑 ÉTAPE 1 — Le flux de connexion (LE cœur du service)

**Pourquoi maintenant :** c'est **la raison d'être** du service. Tant que le login ne marche pas, rien d'autre n'a de sens. C'est aussi ce qui débloque toutes les pages protégées.

Ordre de codage :

1. [ ] **Page `/login`** → `src/app/(auth)/login/page.tsx`
   - Feature `features/login/` : `LoginForm`, `useLogin()`, `schema.ts`, appel `POST /auth/login`.
   - Cas de succès : on reçoit un token → on va sur `/me` (ou l'accueil).
   
2. [ ] **`GET /auth/me`** → récupérer l'utilisateur connecté (`useUser()` dans `hooks/` + `stores/`).

3. [ ] **`src/middleware.ts`** → protège les pages : pas de session → redirection vers `/login`.

4. [ ] **Page d'accueil protégée `/`** → un écran simple « Bonjour {nom} » + bouton **Déconnexion** (`POST /auth/logout`).
5. [ ] **Refresh automatique** → brancher `POST /auth/refresh` dans l'`api-client` (quand le token expire).

> ✅ **Fin de l'étape 1 :** je peux **me connecter, voir mon profil, être protégé, et me déconnecter**. Le squelette vivant est là.

---

## 🔐 ÉTAPE 2 — La double authentification (MFA)

**Pourquoi maintenant :** le login existe, on le **sécurise**. Le MFA se greffe naturellement juste après la saisie du mot de passe.

1. [ ] **Page `/mfa`** (saisie du code à 6 chiffres) → `POST /auth/mfa/verify`.
   - À afficher **après** le login si le compte a le MFA activé.
2. [ ] **Écran d'activation du MFA** (dans le profil) :
   - `POST /auth/mfa/setup` → affiche le **QR code** à scanner.
   - `POST /auth/mfa/enable` → confirme avec un premier code.
   - `POST /auth/mfa/disable` → désactive.
3. [ ] **`POST /auth/login-pin`** → si un mode « connexion par PIN » est prévu, brancher ici.

> ✅ **Fin de l'étape 2 :** connexion sécurisée à deux facteurs, activable/désactivable par l'utilisateur.

---

## 🔁 ÉTAPE 3 — La gestion du mot de passe

**Pourquoi maintenant :** un utilisateur va forcément oublier son mot de passe. C'est indépendant du reste, on peut le faire d'un bloc.

1. [ ] **Page `/forgot-password`** → `POST /auth/forgot-password` (envoie un mail avec un lien/token).
2. [ ] **Page `/reset-password`** → `POST /auth/reset-password` (lit le token dans l'URL, nouveau mot de passe).
3. [ ] **Écran « Changer mon mot de passe »** (dans le profil, utilisateur connecté) → `POST /auth/change-password`.

> ✅ **Fin de l'étape 3 :** cycle de vie complet du mot de passe. Un utilisateur est autonome.

---

## 👥 ÉTAPE 4 — L'administration des utilisateurs (RBAC)

**Pourquoi maintenant :** c'est ici qu'on **crée les comptes** (rappel : pas d'inscription publique). Ça demande d'abord que login + protection + rôles marchent — donc après les étapes 1 à 3.

⚠️ **Toutes ces pages sont réservées aux admins** → le `middleware` doit vérifier le **rôle RBAC**, pas seulement « connecté ».

1. [ ] **Page `/admin/users`** — liste → `GET /users`.
2. [ ] **Page `/admin/users/new`** — créer un compte → `POST /users`. *(C'est le vrai « register ».)*
3. [ ] **Page `/admin/users/:id`** — détail + édition → `GET /users/:id`, `PUT /users/:id`.
4. [ ] **Activer / désactiver un compte** → `PATCH /users/:id/status`.
5. [ ] **Gérer les rôles** → `POST /users/:id/roles`, `DELETE /users/:id/roles/:roleId`.
6. [ ] **Supprimer un compte** → `DELETE /users/:id`.

> ✅ **Fin de l'étape 4 :** un admin gère entièrement les comptes et les droits.

---

## 📎 ÉTAPE 5 — Les documents utilisateur

**Pourquoi en dernier des fonctionnalités :** c'est une brique **secondaire** qui dépend d'un utilisateur déjà existant (étape 4). On la garde pour la fin.

1. [ ] **Onglet « Documents » sur la fiche utilisateur** → `GET /users/:id/documents`.
2. [ ] **Téléverser un document** → `POST /users/:id/documents` (gestion de fichier / upload).
3. [ ] **Supprimer un document** → `DELETE /users/:id/documents/:documentId`.

> ✅ **Fin de l'étape 5 :** toutes les routes backend sont branchées.

---

## ✨ ÉTAPE 6 — Finitions (rendre ça pro)

**Pourquoi à la fin :** on soigne seulement ce qui **marche déjà**. Inutile de peaufiner une page qui pourrait changer.

- [ ] **États de chargement / erreurs** partout (spinners, messages, toasts).
- [ ] **Validation des formulaires** cohérente (messages clairs).
- [ ] **Responsive** (mobile / desktop).
- [ ] **Accessibilité** (labels, focus, navigation clavier).
- [ ] **Page `not-found.tsx`** et **`error.tsx`** globales.
- [ ] **`logout-all`** → un bouton « Déconnecter tous mes appareils » (`POST /auth/logout-all`).
- [ ] **Tests** des parcours critiques (login, MFA).

---

## 🧭 Résumé : l'ordre en une image

```
0. Fondations (client HTTP, session, UI de base)   ← invisible mais obligatoire
        │
1. LOGIN  →  /me  →  middleware  →  logout          ← le cœur, ça doit marcher
        │
2. MFA (verify, setup, enable, disable)             ← on sécurise
        │
3. Mot de passe (forgot, reset, change)             ← autonomie utilisateur
        │
4. Admin utilisateurs + RBAC (création de compte)   ← gestion des comptes
        │
5. Documents                                        ← brique secondaire
        │
6. Finitions (erreurs, responsive, tests)           ← on polit ce qui marche
```

### La règle d'or
> **Chaque étape doit être testable et fonctionnelle avant de passer à la suivante.** On ne commence pas les documents (étape 5) si le login (étape 1) n'est pas solide. Un flux qui marche à moitié partout est pire qu'un flux complet sur une seule fonctionnalité.

### Le tout premier fichier à ouvrir demain matin
👉 `src/lib/api-client.ts` (étape 0), puis `src/app/(auth)/login/page.tsx` (étape 1). Le reste découle de là.
