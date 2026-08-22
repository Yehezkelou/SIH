# Reste à faire — microservices **Patient** & **Admission**

> Checklist avant de connecter le frontend aux deux microservices.
> Date : 2026-08-21 · Basé sur l'état réel du code (`apps/backend/Patient-Identity-Service` & `apps/backend/Admission-service`).

## Ce qui est déjà en place ✅

- **Patient-Identity-Service** : CRUD patient, provisoire/régularisation, recherche, fusion, archivage dossier, subscribers/historisation, serveur **gRPC + mTLS** (`PatientInternal.VerifyPatient`), guard d'auth inter-service (JWT `service-auth.guard.ts`).
- **Admission-service** : CRUD admission, recherche, admission active, discharge/cancel/status, mouvements (`encounterMovement`), documents, payeurs, accompagnants, subscriber/historisation, **client gRPC** vers Patient (`patient.client.ts`) avec validation Zod du contrat.
- **Contrats partagés** : `libs/contracts` (proto `patient.proto` + schémas Zod).
- Filtres d'exception + pipes de validation globaux sur les deux services.

---

## 🔴 Bloquants (à faire AVANT le frontend)

Ces points empêchent soit le démarrage, soit toute connexion depuis un navigateur.

### 1. Certificats mTLS absents
Les deux services lisent `certs/ca.crt`, `certs/server.*`, `certs/client.*` (voir `main.ts` du Patient et `integration.module.ts` de l'Admission), **mais le dossier `certs/` n'existe pas**. → Le Patient-Service **crashe au boot** et l'Admission ne peut pas ouvrir le canal gRPC.
- [ ] Générer les certs (CA + server + client) — voir `docs/GUIDE_GRPC_ET_AUTH_INTER_SERVICE.md`.
- [ ] Décider : commit d'un script de génération (`certs/generate.sh`) + ajout de `certs/` au `.gitignore` (actuellement **non ignoré**).

### 2. CORS non activé
Aucun `app.enableCors()` dans les `main.ts`. → Le navigateur **bloquera toutes les requêtes** du frontend.
- [ ] Activer CORS sur les deux services (origines du frontend en `.env`).

### 3. Collision de port HTTP
Les deux `main.ts` font `process.env.PORT || 3000` et **aucun `PORT` n'est défini dans les `.env`**. → Les deux services écoutent sur `3000` → impossible de les lancer ensemble.
- [ ] Ajouter `PORT` distinct dans chaque `.env` (ex. Patient `3001`, Admission `3002`).

### 4. Pas d'authentification / autorisation utilisateur
Seule l'auth **inter-service** (gRPC) existe. Aucun guard JWT pour les **utilisateurs finaux**, aucun rôle/RBAC (agent d'admission, etc.). → Les endpoints REST sont ouverts.
- [ ] Décider de la stratégie : API Gateway central vs guard JWT par service.
- [ ] Implémenter le guard d'auth utilisateur + rôles sur les endpoints sensibles.

---

## 🟠 Fortement recommandé avant intégration frontend

### 5. Point d'entrée unique (API Gateway) — décision d'architecture
Aujourd'hui le frontend devrait taper **deux hôtes/ports** différents (Patient et Admission). Aucune gateway n'existe.
- [ ] Trancher : gateway (BFF) unique **ou** appels directs multi-origines depuis le front.

### 6. Documentation d'API (Swagger/OpenAPI)
Aucun `@nestjs/swagger` installé. → Le front n'a pas de contrat REST documenté.
- [ ] Ajouter Swagger sur les deux services (schémas d'entrée/sortie, codes d'erreur).

### 7. Endpoint de santé (`/health`)
Aucun healthcheck. Utile pour le front (état des services) et Docker.
- [ ] Ajouter `/health` (`@nestjs/terminus`) sur les deux services.

### 8. Admission — exposition gRPC serveur ?
L'Admission n'est que **client** gRPC + serveur REST. Vérifier si le frontend (ou un autre service) doit l'appeler en gRPC — sinon rien à faire.
- [ ] Confirmer que REST suffit pour le front côté Admission.

---

## 🧹 Nettoyage / dette technique

### 9. Fichiers services vides (dupliqués)
Fichiers à **0 ligne**, non référencés, à supprimer :
- [ ] `Admission-service/src/modules/services/companions.service.ts`
- [ ] `Admission-service/src/modules/services/documents.service.ts`
- [ ] `Admission-service/src/modules/services/payers.service.ts`

### 10. Boilerplate à retirer
- [ ] `Admission-service/src/main.ts` : commentaire `« This is not a production server yet! »`.

---

## 🧪 Tests

### 11. Aucun test réel
Les dossiers `*-e2e` ne contiennent que les **stubs Nx par défaut** (~10 lignes). Aucun test unitaire des services.
- [ ] Tests e2e des endpoints REST clés (création patient → admission via gRPC).
- [ ] Test du flux inter-service (mTLS + JWT + `VerifyPatient`).

---

## Ordre de traitement suggéré

1. **Certs mTLS** (#1) → les services démarrent.
2. **PORT distincts** (#3) → les deux tournent ensemble.
3. **CORS** (#2) → le navigateur peut appeler.
4. **Auth utilisateur / gateway** (#4, #5) → décision d'archi puis implémentation.
5. **Swagger + /health** (#6, #7) → confort d'intégration front.
6. **Nettoyage** (#9, #10) + **tests** (#11).

> Minimum vital pour brancher le front en dev : **#1 + #2 + #3**. Le reste peut suivre en parallèle de l'intégration.
