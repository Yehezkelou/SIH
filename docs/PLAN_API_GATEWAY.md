# Plan d'implémentation — **API Gateway** (SIH)

> Point d'entrée HTTP unique pour le frontend (`accueil-admin`, `emergency`) devant les microservices
> `Auth`, `Patient-Identity`, `Admission`, `Urgency`.
> Date : 2026-08-25 · Basé sur l'état réel du monorepo Nx (`apps/backend/*`, `libs/*`).

---

## 1. Contexte & objectif

### Existant
| Service | HTTP REST | gRPC (mTLS) | Rôle |
|---|---|---|---|
| **Auth-Service** | `:3003` | `:50052` (`AuthInternal.ValidateToken` / `GetUser`) | JWT utilisateur, RBAC, MFA |
| **Patient-Identity** | `:3001` | `:50051` (`PatientInternal.VerifyPatient`) | Dossier patient |
| **Admission** | `:3002` | client gRPC only | Admissions, mouvements, docs |
| **Urgency** | `:300x` | — | Urgences |

- Auth inter-service : JWT signé avec `SERVICE_JWT_SECRET` transmis en métadonnée gRPC (`service-auth.guard.ts`).
- Auth utilisateur : chaque service a **son propre** `UserAuthGuard` qui appelle `AuthInternal.ValidateToken` en gRPC (`Patient-Identity-Service/.../auth.client.ts`).
- Contrats partagés dans `libs/contracts` (proto + schémas Zod + types gRPC).
- Stack commune : NestJS 11, Nx 22, webpack build, pino logger (`libs/logger`), filtres/pipes globaux.

### Problème (cf. `docs/RESTE_A_FAIRE_PATIENT_ADMISSION.md` §5)
Le frontend devrait taper **plusieurs hôtes/ports** (Patient, Admission, Urgency, Auth) → CORS multiple, auth dupliquée, pas de rate-limit, pas de doc unifiée.

### Objectif
Un service **`api-gateway`** (NestJS) qui :
1. expose **une seule origine** au frontend (`:8080`) ;
2. **route/proxy** les requêtes REST vers le bon service en interne ;
3. centralise **CORS, rate-limiting, correlation-id, logging** ;
4. **valide le JWT utilisateur une seule fois** (gRPC → Auth) et propage l'identité en aval ;
5. agrège **Swagger** et **`/health`**.

---

## 2. Décision d'architecture

### 2.1 Pattern de gateway : **Reverse-proxy léger** (recommandé)
NestJS + `http-proxy-middleware` monté par préfixe de route. On **ne recode pas** les controllers des services ; on transfère la requête telle quelle.

> Alternative écartée pour le MVP : **BFF** (controllers dédiés + `@nestjs/axios`) → plus de code à maintenir, duplication des DTO. À envisager plus tard si on a besoin d'agréger/reshaper des réponses multi-services.

### 2.2 Stratégie d'authentification : **validation centralisée au gateway** (recommandé)
Le gateway valide le token **une fois** via `AuthInternal.ValidateToken` (gRPC/mTLS, réutilise le pattern `auth.client.ts` existant), puis :
- injecte l'identité résolue dans des en-têtes de confiance : `x-user-id`, `x-user-matricule`, `x-user-roles`, `x-user-permissions` ;
- **retransmet aussi le `Authorization` original** en aval (compat pendant la transition).

**Impact aval (2 phases) :**
- **Phase A (MVP, non invasif)** : les services gardent leur `UserAuthGuard` gRPC actuel. Le gateway ajoute juste la couche périmètre. Double validation tolérée en dev.
- **Phase B (optimisation)** : les services remplacent le `UserAuthGuard` par un `GatewayTrustGuard` léger qui lit `x-user-*` (les ports REST des services ne sont **plus exposés** hors réseau interne). Supprime l'appel gRPC par requête → latence réduite.

> ⚠️ La Phase B n'est sûre que si les ports REST des services **ne sont pas** accessibles depuis l'extérieur (réseau Docker interne / firewall). À acter dans le déploiement.

### 2.3 Routage
| Préfixe public (gateway) | Cible interne | Auth requise |
|---|---|---|
| `/api/auth/login`, `/api/auth/refresh`, `/api/auth/mfa/*`, `/api/auth/password/*` | `Auth-Service :3003` | ❌ public |
| `/api/auth/**` (reste) | `Auth-Service :3003` | ✅ |
| `/api/patients/**` | `Patient-Identity :3001` | ✅ |
| `/api/admissions/**` | `Admission :3002` | ✅ |
| `/api/urgency/**` | `Urgency :300x` | ✅ |
| `/health` | agrégé (gateway) | ❌ |
| `/docs` | Swagger agrégé | ❌ (dev) |

Routes publiques déclarées via un **décorateur `@Public()`** (déjà présent dans Auth : `helpers/decorator/public.decorator.ts` — à répliquer côté gateway) + liste blanche de chemins.

---

## 3. Arborescence cible

```
apps/backend/api-gateway/
├── .env
├── eslint.config.mjs
├── package.json                # nx targets (build/serve/prune) — calqué sur Patient-Identity
├── tsconfig.json
├── tsconfig.app.json
├── webpack.config.js
└── src/
    ├── main.ts                 # bootstrap HTTP (+ CORS, prefix, pino, swagger, helmet)
    └── modules/
        ├── gateway.module.ts   # module racine
        ├── config/
        │   └── routes.config.ts        # table de routage (préfixe → target)
        ├── proxy/
        │   ├── proxy.module.ts
        │   ├── proxy.controller.ts     # ou middleware http-proxy monté dans configure()
        │   └── proxy.service.ts        # build des options http-proxy + injection headers
        ├── auth/
        │   ├── auth.client.ts          # client gRPC AuthInternal (repris de Patient)
        │   ├── gateway-auth.guard.ts   # valide JWT user + injecte x-user-*
        │   └── integration.module.ts   # ClientsModule.register AUTH_PACKAGE (mTLS)
        ├── health/
        │   ├── health.controller.ts    # /health agrégé (@nestjs/terminus)
        │   └── health.module.ts
        └── shared/
            ├── decorators/public.decorator.ts
            ├── middleware/correlation-id.middleware.ts
            └── filters/                # réutiliser libs/Filter
```

---

## 4. Étapes d'implémentation

### Étape 0 — Prérequis (déjà listés dans `RESTE_A_FAIRE`)
- [ ] Certificats mTLS présents dans `certs/` (`ca.crt`, `client.key`, `client.crt`) — nécessaires au client gRPC vers Auth.
- [ ] `PORT` distincts confirmés pour chaque service (`3001`/`3002`/`3003`/…).
- [ ] Auth-Service démarré (gRPC `:50052`).

### Étape 1 — Générer le projet Nx
```bash
npx nx g @nx/nest:application api-gateway --directory=apps/backend/api-gateway --no-interactive
```
- [ ] Aligner `package.json` (nx targets `build`/`serve`/`prune`/`copy-workspace-modules`) sur `apps/backend/Patient-Identity-Service/package.json`.
- [ ] Ajouter `webpack.config.js` (copie de celui d'Auth/Patient).
- [ ] `tsconfig.json` : `paths` vers `@org/contracts`, `@org/database` (si besoin), `@org/logger`, `@org/Filter`.
- [ ] Ajouter le nom `@org/api-gateway`.

### Étape 2 — Dépendances
Vérifier/ajouter à la racine (`package.json`) :
```bash
pnpm add http-proxy-middleware helmet @nestjs/throttler
pnpm add @nestjs/swagger        # (aussi utile pour les services, cf. §6 RESTE_A_FAIRE)
pnpm add @nestjs/terminus       # /health
```
Déjà présents et réutilisés : `@grpc/grpc-js`, `@grpc/proto-loader`, `@nestjs/microservices`, `@nestjs/jwt`, `nestjs-pino`, `zod`.

### Étape 3 — `main.ts` (bootstrap)
- [ ] `NestFactory.create(GatewayModule)` + `app.setGlobalPrefix('api')` **sauf** `/health` et `/docs`.
- [ ] `app.enableCors({ origin: CORS_ORIGIN.split(','), credentials: true, methods: [...] })` (calqué sur les services).
- [ ] `app.use(helmet())`.
- [ ] Logger pino (`libs/logger`) + `correlation-id` middleware.
- [ ] Swagger sur `/docs` (dev).
- [ ] `app.listen(process.env.PORT ?? 8080)`.

> ⚠️ Le proxy transfère des **flux bruts** (upload multipart pour les documents). Ne PAS activer `bodyParser` global qui consommerait le stream — utiliser `http-proxy-middleware` **avant** tout body-parser, ou désactiver le body-parser Nest sur les routes proxy (`rawBody`/`bodyParser: false`).

### Étape 4 — Client gRPC Auth (réutilisation)
- [ ] Copier `Patient-Identity-Service/src/modules/patient/services/auth.client.ts` → `auth/auth.client.ts`.
- [ ] `integration.module.ts` : `ClientsModule.register([{ name: 'AUTH_PACKAGE', transport: GRPC, options: { package: 'auth', protoPath: 'libs/contracts/proto/auth.proto', url: AUTH_GRPC_URL, credentials: createSsl(ca, client.key, client.crt) } }])` (mTLS côté client).
- [ ] `SERVICE_NAME=api-gateway` → **l'ajouter à la liste blanche** `allowedService` dans `Auth-Service/src/shared/guards/service-auth.guard.ts` (sinon les appels gRPC du gateway seront refusés `PERMISSION_DENIED`).

### Étape 5 — `GatewayAuthGuard` (global)
- [ ] Guard global qui :
  - laisse passer les routes `@Public()` / liste blanche ;
  - extrait `Authorization: Bearer <token>`, appelle `authClient.validateUserToken(token)` ;
  - si invalide → `401` ;
  - sinon stocke l'identité sur `req.user` et prépare les en-têtes `x-user-*`.
- [ ] (RBAC optionnel au gateway) `@Roles()` / `@RequirePermission()` : réutiliser `libs/contracts` `rbac.constants.ts` pour bloquer tôt les accès. 

### Étape 6 — Proxy
- [ ] `routes.config.ts` : table `[{ prefix: '/api/patients', target: PATIENT_HTTP_URL, stripPrefix?: false }]`.
- [ ] Pour chaque route, monter `createProxyMiddleware({ target, changeOrigin: true, on: { proxyReq } })`.
- [ ] Dans `proxyReq` : injecter `x-user-id`, `x-user-matricule`, `x-user-roles` (CSV), `x-user-permissions` (CSV), `x-correlation-id`, et **conserver** `Authorization`.
- [ ] Timeouts + gestion d'erreur (`proxyError` → `502 Bad Gateway` propre via `libs/Filter`).

### Étape 7 — `/health` agrégé
- [ ] `@nestjs/terminus` : ping HTTP de chaque service (`/health` en aval) + statut du canal gRPC Auth.
- [ ] Ajouter `/health` (terminus) **sur chaque microservice** aussi (cf. `RESTE_A_FAIRE` §7).

### Étape 8 — Swagger agrégé (dev)
- [ ] Option simple : lien vers chaque `/docs` de service. Option avancée : `swagger-combine` / merge des specs JSON.
- [ ] Prérequis : installer `@nestjs/swagger` sur les services (§6 `RESTE_A_FAIRE`).

### Étape 9 — Sécurité périmètre
- [ ] `@nestjs/throttler` : rate-limit global (ex. 100 req/min/IP) + limite stricte sur `/api/auth/login`.
- [ ] `helmet`, taille max de payload, whitelist des méthodes.
- [ ] (Phase B) fermer les ports REST des services au monde extérieur.

---

## 5. Configuration `.env` (`apps/backend/api-gateway/.env`)

```dotenv
# Port HTTP public du gateway
PORT=8080

# Origines frontend autorisées (CORS)
CORS_ORIGIN=http://localhost:3000,http://localhost:3100

# Cibles internes des microservices (HTTP REST)
AUTH_HTTP_URL=http://localhost:3003
PATIENT_HTTP_URL=http://localhost:3001
ADMISSION_HTTP_URL=http://localhost:3002
URGENCY_HTTP_URL=http://localhost:3004

# Auth inter-service (gRPC vers Auth-Service)
SERVICE_NAME=api-gateway
SERVICE_JWT_SECRET=super_secret_key_inter_service_sih_2026
AUTH_GRPC_URL=localhost:50052

# Rate limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```
> Chemins certs mTLS : `certs/ca.crt`, `certs/client.key`, `certs/client.crt` (résolus via `process.cwd()`, comme les autres services).

---

## 6. Modifications hors-gateway (dépendances)

| Fichier | Changement |
|---|---|
| `Auth-Service/src/shared/guards/service-auth.guard.ts` | Ajouter `"api-gateway"` à `allowedService` |
| `package.json` (racine) | Ajouter deps §2 |
| `docker-compose.yml` | Ajouter service `api-gateway` (port `8080`) + réseau interne |
| Frontend (`accueil-admin`, `emergency`) | Pointer `API_BASE_URL` → `http://localhost:8080/api` (au lieu des ports directs) |
| Chaque service (`main.ts`) | (§7 RESTE_A_FAIRE) ajouter `/health` |

---

## 7. Vérification / tests

- [ ] `nx serve @org/api-gateway` démarre sans erreur (canal gRPC Auth OK).
- [ ] `GET /health` → statut agrégé des 4 services.
- [ ] `POST /api/auth/login` (public) traverse le gateway sans token.
- [ ] `GET /api/patients/...` **sans** token → `401` au gateway (pas d'appel aval).
- [ ] `GET /api/patients/...` **avec** token valide → réponse du Patient-Service, `x-user-id` bien injecté (vérifier logs aval).
- [ ] Upload multipart (document admission) via gateway → stream non corrompu.
- [ ] Rate-limit : dépassement `429`.
- [ ] CORS : requête préflight `OPTIONS` OK depuis l'origine frontend.
- [ ] Correlation-id propagé de bout en bout (logs pino corrélés).

---

## 8. Ordre d'exécution suggéré

1. **Étape 0** (prérequis certs/ports) — sinon rien ne boot.
2. **Étapes 1–3** : projet Nx + bootstrap HTTP nu (CORS/prefix) → proxy pass-through **sans auth** pour valider le routage.
3. **Étapes 4–5** : client gRPC Auth + guard global (+ whitelist gateway côté Auth).
4. **Étape 6** : injection headers `x-user-*`.
5. **Étapes 7–9** : health, swagger, rate-limit/helmet.
6. **Bascule frontend** vers `:8080`.
7. *(plus tard)* **Phase B** : `GatewayTrustGuard` en aval + fermeture des ports REST internes.

> **Minimum vital dev** : Étapes 1–3 (routage) + Étape 5 (auth centralisée). Le reste peut suivre en parallèle de l'intégration front.
