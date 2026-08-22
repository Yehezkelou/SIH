# Auth-Service — Microservice d'authentification du personnel

> Authentification et autorisation des **agents** du SIH : médecins, infirmiers, agents d'admission, secrétaires médicales, pharmaciens, administrateurs…
> Ce document liste **toutes les fonctionnalités à créer**. L'arborescence et **toutes les entités** sont déjà générées dans `apps/backend/Auth-Service/`.

---

## 1. Rôle du service

- Gérer l'**identité employé** (à ne pas confondre avec l'identité patient du `Patient-Identity-Service`).
- Authentifier les agents (login / logout / refresh).
- Autoriser les accès via **RBAC** (rôles + permissions).
- Fournir aux autres microservices un moyen de **valider un jeton** et de récupérer l'identité + les droits d'un agent (via gRPC, comme `PatientInternal.VerifyPatient`).
- Tracer les connexions et les modifications de comptes (audit / conformité).

Ports attribués (cohérence avec l'existant) : **HTTP `3003`**, **gRPC `50052`**, **PostgreSQL `5435`** (`auth-db`). Voir `.env`.

---

## 2. Entités (déjà créées ✅)

| Entité | Table | Rôle |
|--------|-------|------|
| `User` | `users` | Compte du personnel (identité, statut, sécurité, MFA) |
| `Role` | `roles` | Rôle RBAC (ex: `ROLE_MEDECIN`) |
| `Permission` | `permissions` | Permission atomique (`patient:READ`, `admission:CREATE`…) |
| `UserRole` | `user_roles` | Liaison User ↔ Role (avec `assignedBy`, `expiresAt`) |
| `RolePermission` | `role_permissions` | Liaison Role ↔ Permission |
| `RefreshToken` | `refresh_tokens` | Sessions / rotation des JWT (hash uniquement) |
| `PasswordReset` | `password_resets` | Jetons de réinitialisation de mot de passe (usage unique) |
| `LoginAttempt` | `login_attempts` | Journal d'audit des connexions (ex-`logconnexion`) |
| `UserHistory` | `user_history` | Historisation CREATE/UPDATE/DELETE des comptes |
| `UserSubscriber` | — | Remplit `user_history` automatiquement |

Enums (`auth.enum.ts`) : `PersonnelType`, `UserStatus`, `Genre`, `MfaMethod`, `PermissionAction`, `HistoryAction`, `LoginAttemptStatus`.

> ⚠️ Sécurité déjà intégrée dans les entités : `passwordHash` / `mfaSecret` / `tokenHash` sont en `select: false` et **exclus des snapshots d'historique** (`helpers/entitySnapshot.ts`).

---

## 3. Fonctionnalités à créer

### 3.1 Authentification (`AuthController` / `AuthService`)
- [ ] **POST `/auth/login`** — vérifie email/matricule + mot de passe (bcrypt/argon2), gère le verrouillage après `MAX_LOGIN_ATTEMPTS` échecs, émet access token (court) + refresh token (long), journalise dans `login_attempts`, met à jour `lastLoginAt/Ip`.
- [ ] **POST `/auth/refresh`** — rotation du refresh token (révoque l'ancien, détecte le rejeu via `replacedByTokenId`).
- [ ] **POST `/auth/logout`** — révoque le refresh token courant (`revokedAt`).
- [ ] **POST `/auth/logout-all`** — révoque toutes les sessions de l'utilisateur.
- [ ] **GET `/auth/me`** — profil + rôles + permissions de l'agent connecté.
- [ ] Verrouillage/déverrouillage automatique du compte (`lockedUntil`, `failedLoginAttempts`).

### 3.2 Mot de passe
- [ ] **POST `/auth/forgot-password`** — crée un `PasswordReset` (hash + TTL `PASSWORD_RESET_TTL_MINUTES`).
- [ ] **POST `/auth/reset-password`** — consomme le jeton (`usedAt`), applique la politique de robustesse, révoque toutes les sessions.
- [ ] **POST `/auth/change-password`** — changement par l'utilisateur connecté (vérifie l'ancien mot de passe, gère `mustChangePassword`).
- [ ] Politique : robustesse minimale, `passwordChangedAt`, expiration optionnelle.

### 3.3 MFA (double authentification) — optionnel mais prévu
- [ ] **POST `/auth/mfa/setup`** — génère le secret TOTP.
- [ ] **POST `/auth/mfa/verify`** / **`/auth/mfa/disable`**.
- [ ] Étape MFA intégrée au flux de login (`mfaEnabled`, `mfaMethod`).

### 3.4 Gestion des comptes personnel (`UserController` / `UserService`) — réservé admin
- [ ] **POST `/users`** — créer un agent (statut initial `EN_ATTENTE_ACTIVATION` + invitation/mdp temporaire).
- [ ] **GET `/users`** — liste paginée + filtres (`personnelType`, `status`, `serviceAffectation`, recherche nom/matricule).
- [ ] **GET `/users/:id`**, **PUT `/users/:id`** — consulter / modifier.
- [ ] **PATCH `/users/:id/status`** — activer / suspendre / désactiver.
- [ ] **DELETE `/users/:id`** — suppression douce (soft delete, historisée).
- [ ] Attribution / révocation de rôles : **POST/DELETE `/users/:id/roles`**.

### 3.5 Rôles & permissions (`RoleController`, `PermissionController`)
- [ ] CRUD **rôles** (protéger `isSystem`).
- [ ] CRUD **permissions**.
- [ ] Rattacher / détacher des permissions à un rôle (`role_permissions`).
- [ ] **Seed initial** : rôles système (`SUPER_ADMIN`, `ADMIN`, `ROLE_MEDECIN`, `ROLE_AGENT_ADMISSION`…) + permissions de base (`patient:*`, `admission:*`, `user:*`).

### 3.6 Autorisation (guards) — `src/shared/guards`
- [ ] **`JwtAuthGuard`** — valide l'access token des requêtes HTTP entrantes.
- [ ] **`PermissionsGuard`** + décorateur `@RequirePermissions('patient:READ')` — vérifie les permissions du rôle.
- [ ] **`RolesGuard`** + décorateur `@Roles(...)` (optionnel, plus grossier).
- [ ] `@CurrentUser()` — décorateur d'injection de l'agent courant.

### 3.7 Exposition inter-service (gRPC) — `src/modules/auth/controllers`
- [ ] Ajouter un **serveur gRPC** dans `main.ts` (mTLS, comme le Patient-Service).
- [ ] Contrat `auth.proto` dans `libs/contracts/proto/` + schémas Zod dans `libs/contracts`.
- [ ] Méthode **`ValidateToken`** : les services Patient/Admission valident un access token et récupèrent `{ userId, matricule, roles, permissions }`.
- [ ] Méthode **`GetUser`** : résoudre un `personnel_id` en identité affichable (nom du médecin sur un compte-rendu, etc.).
- [ ] Réutiliser le **`ServiceAuthGuard`** (JWT inter-service) déjà présent côté Patient et l'ajouter à la liste blanche.

### 3.8 Audit & journalisation
- [ ] Écrire chaque tentative dans `login_attempts` (succès, échec, logout).
- [ ] Endpoint admin **GET `/audit/login-attempts`** (filtrable).
- [ ] Historisation des comptes déjà automatique via `UserSubscriber`.

### 3.9 Tâches planifiées (`@nestjs/schedule`, déjà importé)
- [ ] Purge périodique des `refresh_tokens` et `password_resets` expirés.
- [ ] Déverrouillage des comptes dont `lockedUntil` est dépassé.

---

## 4. Infrastructure transverse à implémenter (comme les autres services)

- [ ] `src/shared/filters` — filtre d'exception global (`APP_FILTER`), sur le modèle de `patient.filter.ts`.
- [ ] `src/shared/pipes` — pipe de validation Zod global (`APP_PIPE`), sur le modèle de `patient.pipe.ts`.
- [ ] `src/modules/auth/validator` — schémas Zod (login, création user, reset…).
- [ ] `src/modules/auth/repositories` — repositories TypeORM par entité.
- [ ] `src/helpers/messageError.ts` — catalogue des messages/codes d'erreur.
- [ ] **CORS** dans `main.ts` avant branchement du frontend.
- [ ] Certificats **mTLS** partagés (`certs/`) — cf. `docs/GUIDE_GRPC_ET_AUTH_INTER_SERVICE.md`.
- [ ] Enregistrer le projet dans l'espace de travail Nx (`pnpm-workspace.yaml` / `nx.json` si nécessaire) et générer le stub e2e.

---

## 5. Arborescence générée

```
apps/backend/Auth-Service/
├── .env                      # ports 3003 / 50052 / db 5435 + secrets JWT
├── package.json              # cible Nx build/serve (@org/Auth-Service)
├── tsconfig.json / tsconfig.app.json
├── webpack.config.js
├── eslint.config.mjs
└── src/
    ├── main.ts               # bootstrap HTTP (TODO: gRPC + CORS)
    ├── assets/
    ├── helpers/
    │   ├── entitySnapshot.ts # snapshot d'historique (secrets exclus)
    │   ├── config/  decorator/  func/
    ├── modules/auth/
    │   ├── auth.module.ts     # enregistre entités + subscriber
    │   ├── entities/          # ✅ TOUTES les entités (voir §2)
    │   ├── controllers/       # (à créer)
    │   ├── services/          # (à créer)
    │   ├── repositories/      # (à créer)
    │   └── validator/         # (à créer)
    └── shared/
        ├── filters/  guards/  pipes/   # (à créer)
```

---

## 6. Ordre de développement suggéré

1. **Infra transverse** : filtre + pipe + messageError + repositories.
2. **Seed** rôles/permissions système.
3. **Login / refresh / logout** + `login_attempts` + verrouillage.
4. **JwtAuthGuard + PermissionsGuard** (sécurise le reste des routes).
5. **CRUD users** + attribution de rôles.
6. **CRUD rôles / permissions**.
7. **Mot de passe** (forgot/reset/change) + **tâches planifiées** de purge.
8. **gRPC `ValidateToken` / `GetUser`** + `auth.proto` → intégration Patient/Admission.
9. **MFA** (optionnel) + endpoints d'audit.

> Chantier minimal pour brancher le frontend : **§3.1 login/refresh/logout + §3.6 guards + §3.4 CRUD users + seed rôles**.
