# Migration REST → gRPC + Authentification inter-services

Guide détaillé pour faire évoluer la communication entre **Admission-service**
(client) et **Patient-Identity-Service** (serveur), de REST/axios vers **gRPC**,
puis pour **authentifier** ces échanges de service à service.

---

## 1. État actuel (point de départ)

**Client — `Admission-service`**
`src/modules/integrations/patient.client.ts` fait un appel HTTP avec `axios` :

```ts
const url = `${origin}/api/internal/patient/verify`;
const response = await axios.post(url, data); // data = { patientId, numeroPatient }
```

**Serveur — `Patient-Identity-Service`**
`src/modules/patient/controllers/patient-internal.controller.ts` expose une route HTTP :

```ts
@Controller('internal/patient')
export class PatientInternalController {
  @Post("verify")
  async verifyPatient(@Body() data: GetPatientInput, @Res() res: Response) { ... }
}
```

**Contrat partagé — `@org/contracts`**
`libs/contracts/src/lib/patient/patient-contract.schema.ts` :

```ts
export const GetPatientContractSchema = z.object({
  patientId: z.uuid(),
  numeroPatient: z.string(),
});
export const PatientSharedResponseSchema = z.object({
  id: z.uuid(),
  numeroPatient: z.string(),
  nom: z.string(),
  prenom: z.string(),
  statusDossier: z.enum(["DEFINITIF", "PROVISOIRE"]),
});
```

**Points faibles du REST actuel** : pas de contrat fort au niveau transport
(le JSON est libre), sérialisation verbeuse, pas d'authentification, latence
HTTP/1.1, gestion d'erreur par codes HTTP « devinés ».

**Ce que gRPC apporte ici** : contrat **`.proto`** typé et versionné, HTTP/2
(multiplexage, keepalive), sérialisation binaire (protobuf) compacte, codes
d'erreur normalisés (`status.code`), et surtout un socle propre pour le
**mTLS** et les **métadonnées d'authentification**.

> On **garde `zod`** : le `.proto` valide la structure au transport, `zod`
> reste utile pour valider/raffiner côté application (règles métier, enums).

---

## 2. Architecture cible

```
┌────────────────────────┐        gRPC (HTTP/2 + protobuf)        ┌──────────────────────────────┐
│  Admission-service     │  ───────────────────────────────────▶ │  Patient-Identity-Service    │
│  (client gRPC)         │   VerifyPatient(VerifyPatientRequest)  │  (serveur gRPC + REST public)│
│  patient.client.ts     │ ◀───────────────────────────────────  │  @GrpcMethod VerifyPatient   │
└────────────────────────┘        VerifyPatientResponse           └──────────────────────────────┘
        │  injecte métadonnées: authorization = Bearer <jwt service>
        │  canal chiffré: mTLS (certs client + serveur)
```

Le **Patient-Identity-Service** devient une **application hybride** : il garde
son serveur HTTP (routes publiques `/api/...`) **et** ajoute un microservice
gRPC (transport interne). Cela évite de tout casser d'un coup.

---

## 3. Étape 0 — Dépendances

`@grpc/grpc-js` et `@grpc/proto-loader` sont **déjà** dans le `package.json`
racine. Il manque le pont NestJS et (pour l'auth JWT) la stack `jwt` :

```bash
# depuis la racine du monorepo
pnpm add -w @nestjs/microservices
# pour l'authentification par JWT de service (section 8, option B)
pnpm add -w @nestjs/jwt
```

> `-w` = installer au niveau workspace (les apps backend partagent les deps ici).

---

## 4. Étape 1 — Définir le contrat `.proto`

Créer le contrat canonique dans la lib partagée, à côté des schémas zod.

**`libs/contracts/proto/patient.proto`**

```proto
syntax = "proto3";

package patient;

// Service interne d'identité patient (MPI)
service PatientInternal {
  // Vérifie l'existence d'un patient et renvoie ses données partagées
  rpc VerifyPatient (VerifyPatientRequest) returns (VerifyPatientResponse);
}

message VerifyPatientRequest {
  string patientId = 1;       // UUID
  string numeroPatient = 2;
}

message VerifyPatientResponse {
  bool found = 1;             // remplace le 404 REST : contrôle de flux explicite
  Patient patient = 2;        // absent si found = false
}

message Patient {
  string id = 1;              // UUID
  string numeroPatient = 2;
  string nom = 3;
  string prenom = 4;
  string statusDossier = 5;   // "DEFINITIF" | "PROVISOIRE"
}
```

**Décision de conception importante** : au lieu de lever une erreur `NOT_FOUND`
(comme le `res.status(404)` actuel), on renvoie `found: bool`. On **n'utilise
pas les exceptions pour du contrôle de flux** — le client teste `found`, ce qui
reproduit proprement le `return null` actuel de `verifyPatient`.

**Typage TypeScript du service** (proto-loader est dynamique, on décrit
l'interface à la main) — dans `libs/contracts` :

**`libs/contracts/src/lib/patient/patient.grpc.ts`**

```ts
import { Observable } from "rxjs";

export const PATIENT_PACKAGE = "patient";
export const PATIENT_SERVICE = "PatientInternal";

export interface VerifyPatientRequest {
  patientId: string;
  numeroPatient: string;
}

export interface GrpcPatient {
  id: string;
  numeroPatient: string;
  nom: string;
  prenom: string;
  statusDossier: "DEFINITIF" | "PROVISOIRE";
}

export interface VerifyPatientResponse {
  found: boolean;
  patient?: GrpcPatient;
}

// Interface consommée côté client (méthodes renvoient des Observables)
export interface PatientInternalGrpc {
  VerifyPatient(data: VerifyPatientRequest): Observable<VerifyPatientResponse>;
}
```

Puis exporter depuis `libs/contracts/src/index.ts` :

```ts
export * from './lib/patient/patient.grpc.js';
```

> **Nx / build** : le `.proto` est un fichier runtime, il doit se retrouver dans
> le `dist`. Voir la section 9 (assets) — sinon `protoPath` échoue en production.

---

## 5. Étape 2 — Côté serveur (Patient-Identity-Service)

### 5.1 Transformer en application hybride (HTTP + gRPC)

**`apps/backend/Patient-Identity-Service/src/main.ts`**

```ts
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PatientModule } from './modules/patient/patient.module';

async function bootstrap() {
  const app = await NestFactory.create(PatientModule);
  app.setGlobalPrefix('api');

  // Attache un microservice gRPC à la même application
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'patient',
      protoPath: join(__dirname, 'assets/proto/patient.proto'),
      url: process.env.PATIENT_GRPC_URL ?? '0.0.0.0:50051',
      // (mTLS ajouté en section 8 via `credentials`)
    },
  });

  await app.startAllMicroservices(); // démarre le serveur gRPC
  const port = process.env.PORT || 3000;
  await app.listen(port);            // garde le serveur HTTP public

  Logger.log(`🚀 HTTP: http://localhost:${port}/api`);
  Logger.log(`🔌 gRPC: ${process.env.PATIENT_GRPC_URL ?? '0.0.0.0:50051'}`);
}
bootstrap();
```

### 5.2 Ajouter le handler gRPC

Tu peux ajouter le handler dans le contrôleur interne existant (il devient
hybride : HTTP + gRPC), ou créer un contrôleur gRPC dédié. Version dédiée,
plus propre :

**`.../controllers/patient-grpc.controller.ts`**

```ts
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { PinoLogger } from "nestjs-pino";
import type { VerifyPatientRequest, VerifyPatientResponse } from "@org/contracts";
import { PatientInternalService } from "../services/patient-internal.service";

@Controller()
export class PatientGrpcController {
  constructor(
    private readonly service: PatientInternalService,
    private readonly logger: PinoLogger,
  ) {}

  // "PatientInternal" = service, "VerifyPatient" = rpc (doivent matcher le .proto)
  @GrpcMethod("PatientInternal", "VerifyPatient")
  async verifyPatient(data: VerifyPatientRequest): Promise<VerifyPatientResponse> {
    const patient = await this.service.VerifyPatient(data);

    if (!patient.exist) {
      this.logger.warn({
        message: "Patient introuvable (gRPC VerifyPatient)",
        context: "PatientGrpcController.verifyPatient",
      });
      return { found: false };          // ← équivalent gRPC du 404
    }

    return { found: true, patient: patient.response };
  }
}
```

Déclarer le contrôleur dans le module (`patient.module.ts`, tableau
`controllers`). **La logique métier (`PatientInternalService`) ne change pas** —
on ne fait que remplacer la couche de transport.

> Le contrôleur HTTP `@Post("verify")` peut rester en place pendant la
> migration (double exposition), puis être supprimé une fois le client basculé.

---

## 6. Étape 3 — Côté client (Admission-service)

### 6.1 Enregistrer le client gRPC

**`.../integrations/integration.module.ts`**

```ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { PatientClientService } from "./patient.client";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    ClientsModule.registerAsync([
      {
        name: "PATIENT_PACKAGE",           // token d'injection
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: "patient",
            protoPath: join(__dirname, "assets/proto/patient.proto"),
            url: config.get<string>("PATIENT_GRPC_URL", "localhost:50051"),
            // (mTLS + keepalive ajoutés en section 8/10)
          },
        }),
      },
    ]),
  ],
  providers: [PatientClientService],
  exports: [PatientClientService],
})
export class IntegrationModule {}
```

### 6.2 Réécrire `patient.client.ts` (axios → gRPC)

```ts
import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {
  GetPatientInput,
  PatientSharedResponseInput,
  PatientSharedResponseSchema,
  PatientInternalGrpc,
} from "@org/contracts";
import { MESSAGE_ERROR_INTEGRATION } from "../../helpers/messageError";

@Injectable()
export class PatientClientService implements OnModuleInit {
  private patientGrpc!: PatientInternalGrpc;

  constructor(@Inject("PATIENT_PACKAGE") private readonly client: ClientGrpc) {}

  onModuleInit() {
    // "PatientInternal" = nom du service dans le .proto
    this.patientGrpc = this.client.getService<PatientInternalGrpc>("PatientInternal");
  }

  async verifyPatient(data: GetPatientInput): Promise<PatientSharedResponseInput | null> {
    try {
      const res = await lastValueFrom(this.patientGrpc.VerifyPatient(data));

      if (!res.found || !res.patient) return null;   // ← même sémantique qu'avant

      // On garde la validation zod du contrat applicatif
      const parsed = PatientSharedResponseSchema.safeParse(res.patient);
      if (!parsed.success) {
        throw new HttpException(
          { message: "Rupture de contrat", detail: parsed.error.message },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return parsed.data;
    } catch (error: any) {
      // gRPC status 5 = NOT_FOUND (si un jour le serveur lève une RpcException)
      if (error?.code === 5) return null;

      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: MESSAGE_ERROR_INTEGRATION.INTEGRATION_PATIENT_NOT_FOUND.MESSAGE,
          code: MESSAGE_ERROR_INTEGRATION.INTEGRATION_PATIENT_NOT_FOUND.CODE,
          detail: error?.message,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
```

**Le service appelant (`admission.service.ts`) ne change pas** : il continue à
faire `await this.patientClient.verifyPatient({...})`. Toute la migration est
encapsulée dans le client — c'est l'intérêt d'avoir isolé l'intégration.

---

## 7. Étape 4 — Codes d'erreur gRPC (référence)

| gRPC `status.code` | Constante | Équivalent HTTP | Usage ici |
|---|---|---|---|
| 0 | `OK` | 200 | succès |
| 3 | `INVALID_ARGUMENT` | 400 | requête mal formée |
| 5 | `NOT_FOUND` | 404 | (on préfère `found:false`) |
| 7 | `PERMISSION_DENIED` | 403 | **auth échouée** (section 8) |
| 16 | `UNAUTHENTICATED` | 401 | **token absent/invalide** |
| 14 | `UNAVAILABLE` | 503 | service down / réseau |
| 4 | `DEADLINE_EXCEEDED` | 504 | timeout (section 10) |

Pour lever une erreur typée côté serveur :

```ts
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";
throw new RpcException({ code: status.UNAUTHENTICATED, message: "Token de service invalide" });
```

---

## 8. Authentification inter-services

Deux couches complémentaires. **Fais les deux** en cible ; commence par B si tu
veux un résultat rapide, ajoute A pour la production.

### Option A — mTLS (TLS mutuel) : chiffrement + identité machine

Le canal est chiffré **et** chaque partie prouve son identité par certificat.
C'est le standard pour gRPC en interne.

**Générer les certificats (dev, CA maison)** :

```bash
mkdir -p certs && cd certs
# 1. Autorité de certification (CA)
openssl genrsa -out ca.key 4096
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt -subj "/CN=SIH-Internal-CA"

# 2. Certificat SERVEUR (Patient-Identity)
openssl genrsa -out server.key 4096
openssl req -new -key server.key -out server.csr -subj "/CN=patient-identity-service"
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 825 -sha256

# 3. Certificat CLIENT (Admission)
openssl genrsa -out client.key 4096
openssl req -new -key client.key -out client.csr -subj "/CN=admission-service"
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 825 -sha256
```

**Serveur — `main.ts`** (dans les `options` du microservice gRPC) :

```ts
import { ServerCredentials } from "@grpc/grpc-js";
import { readFileSync } from "fs";

options: {
  package: "patient",
  protoPath: join(__dirname, "assets/proto/patient.proto"),
  url: process.env.PATIENT_GRPC_URL ?? "0.0.0.0:50051",
  credentials: ServerCredentials.createSsl(
    readFileSync("certs/ca.crt"),
    [{ private_key: readFileSync("certs/server.key"), cert_chain: readFileSync("certs/server.crt") }],
    true, // checkClientCertificate = true → impose le certif client (mutuel)
  ),
}
```

**Client — `integration.module.ts`** (dans les `options`) :

```ts
import { credentials } from "@grpc/grpc-js";
import { readFileSync } from "fs";

options: {
  package: "patient",
  protoPath: join(__dirname, "assets/proto/patient.proto"),
  url: config.get("PATIENT_GRPC_URL", "localhost:50051"),
  credentials: credentials.createSsl(
    readFileSync("certs/ca.crt"),
    readFileSync("certs/client.key"),
    readFileSync("certs/client.crt"),
  ),
}
```

> En production : ne versionne **jamais** les `.key`. Monte les certificats via
> secrets (Docker/K8s secrets, Vault) et référence-les par chemin/variable.
> Prévois la **rotation** (certs à durée courte).

### Option B — JWT de service dans les métadonnées gRPC

Autorisation applicative : le client signe un jeton court prouvant « je suis
Admission-service », le serveur le vérifie dans un **guard**. Complète le mTLS
(mTLS = identité machine ; JWT = identité de service + périmètre/scopes).

**Secret partagé** (`.env` des deux services) :

```dotenv
SERVICE_JWT_SECRET=une_valeur_longue_et_aleatoire_partagee
SERVICE_NAME=admission-service      # côté client
```

**Client — injecter le token dans les métadonnées.** Le plus simple : un petit
helper qui crée les `Metadata` à chaque appel.

```ts
import { Metadata } from "@grpc/grpc-js";
import { JwtService } from "@nestjs/jwt";

private buildAuthMetadata(): Metadata {
  const token = this.jwt.sign(
    { iss: process.env.SERVICE_NAME, aud: "patient-identity-service" },
    { secret: process.env.SERVICE_JWT_SECRET, expiresIn: "60s" },
  );
  const meta = new Metadata();
  meta.add("authorization", `Bearer ${token}`);
  return meta;
}

// appel : passer la metadata en 2e argument
const res = await lastValueFrom(this.patientGrpc.VerifyPatient(data, this.buildAuthMetadata()));
```

> Ajoute le 2e paramètre `metadata?: Metadata` à la signature `VerifyPatient`
> dans `PatientInternalGrpc` (interface `libs/contracts`).

**Serveur — guard de vérification.** Pour gRPC, le contexte expose les
métadonnées via `context.switchToRpc()`.

**`.../guards/service-auth.guard.ts`**

```ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";
import type { Metadata } from "@grpc/grpc-js";

@Injectable()
export class ServiceAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const meta = context.switchToRpc().getContext<Metadata>();
    const raw = (meta.get("authorization")[0] as string) ?? "";
    const token = raw.replace(/^Bearer\s+/i, "");

    if (!token) {
      throw new RpcException({ code: status.UNAUTHENTICATED, message: "Token de service manquant" });
    }
    try {
      const payload = this.jwt.verify(token, { secret: process.env.SERVICE_JWT_SECRET });
      // (optionnel) vérifier la liste blanche des services autorisés
      const allowed = ["admission-service"];
      if (!allowed.includes(payload.iss)) {
        throw new RpcException({ code: status.PERMISSION_DENIED, message: "Service non autorisé" });
      }
      return true;
    } catch {
      throw new RpcException({ code: status.UNAUTHENTICATED, message: "Token de service invalide" });
    }
  }
}
```

Appliquer le guard sur le handler gRPC :

```ts
@UseGuards(ServiceAuthGuard)
@GrpcMethod("PatientInternal", "VerifyPatient")
async verifyPatient(data: VerifyPatientRequest) { ... }
```

Enregistrer `JwtModule` dans les deux modules :

```ts
JwtModule.register({ secret: process.env.SERVICE_JWT_SECRET })
```

### Comparatif rapide

| Critère | mTLS (A) | JWT metadata (B) |
|---|---|---|
| Chiffre le canal | ✅ | ❌ (à combiner avec TLS) |
| Identité machine | ✅ (certificat) | ❌ |
| Identité/scope de service | ⚠️ (CN uniquement) | ✅ (claims) |
| Révocation fine | ⚠️ (rotation certs) | ✅ (expiration courte) |
| Complexité mise en place | Moyenne/élevée | Faible |
| **Recommandation** | Prod | Démarrage + complément A |

---

## 9. Nx / Webpack — livrer le `.proto` dans le `dist`

Les apps backend buildent avec webpack ; le `.proto` doit être copié dans les
assets, sinon `protoPath: join(__dirname, 'assets/proto/patient.proto')` échoue
au runtime.

1. Placer/copier le proto dans chaque app : `src/assets/proto/patient.proto`
   (source unique dans `libs/contracts/proto/patient.proto`, copiée par un
   petit script `predev`/`prebuild`, ou dupliquée temporairement).
2. Vérifier que la config de build de l'app copie bien `src/assets` → `dist`
   (comportement par défaut des générateurs `@nx/nest`/webpack ; sinon ajouter
   `assets: ["apps/backend/<app>/src/assets"]` dans la cible `build`).
3. Idem pour les certificats : monter le dossier `certs/` en volume, ne pas le
   bundler.

---

## 10. Robustesse (à configurer une fois que ça marche)

- **Deadlines/timeouts** : toujours borner un appel gRPC. Passe une deadline via
  les options d'appel ou un timeout applicatif (`rxjs` `timeout()`), pour
  éviter qu'un appel pende indéfiniment.
- **Keepalive** (options du canal) : `grpc.keepalive_time_ms`, utile pour les
  connexions longues derrière un load balancer.
- **Retries** : gRPC supporte une politique de retry (`grpc.service_config`),
  à réserver aux appels **idempotents** (`VerifyPatient` l'est).
- **Health check** : ajouter le service `grpc.health.v1.Health` pour les probes.
- **Observabilité** : intercepteur gRPC pour logguer `method`, `status`, durée
  (réutilise `nestjs-pino`).

---

## 11. Tester

**Sans le client, avec `grpcurl`** :

```bash
# lister les services (si reflection activée) ou pointer le proto
grpcurl -plaintext -proto libs/contracts/proto/patient.proto \
  -d '{"patientId":"<uuid>","numeroPatient":"DOS-000001"}' \
  localhost:50051 patient.PatientInternal/VerifyPatient

# avec mTLS
grpcurl -cacert certs/ca.crt -cert certs/client.crt -key certs/client.key \
  -d '{"patientId":"<uuid>","numeroPatient":"DOS-000001"}' \
  localhost:50051 patient.PatientInternal/VerifyPatient
```

**End-to-end** : lancer les deux services, créer une admission depuis
Admission-service et vérifier que `verifyPatient` renvoie bien le patient.

---

## 12. Plan de migration progressif (sans coupure)

1. **Ajouter** le proto + le contrat TS dans `libs/contracts`.
2. **Serveur** : ajouter le microservice gRPC + le handler `@GrpcMethod`, en
   **gardant** la route HTTP `/internal/patient/verify` existante.
3. Tester le handler gRPC avec `grpcurl`.
4. **Client** : réécrire `patient.client.ts` en gRPC (l'API publique de la
   classe ne change pas) ; garder l'ancienne version REST en commentaire/flag.
5. Basculer via variable d'env (`PATIENT_TRANSPORT=grpc|rest`) si tu veux un
   rollback instantané.
6. Ajouter **l'auth** : d'abord JWT metadata (B), puis mTLS (A).
7. Une fois stable en prod, **supprimer** la route HTTP interne et `axios`.

---

## 13. Checklist finale

- [ ] `@nestjs/microservices` (et `@nestjs/jwt`) installés.
- [ ] `libs/contracts/proto/patient.proto` + `patient.grpc.ts` + exports.
- [ ] `main.ts` (patient) : `connectMicroservice` + `startAllMicroservices`.
- [ ] `PatientGrpcController` avec `@GrpcMethod("PatientInternal","VerifyPatient")`.
- [ ] `ClientsModule.registerAsync` côté admission + `patient.client.ts` en gRPC.
- [ ] `.proto` copié dans `dist` (assets) des deux apps.
- [ ] `.env` : `PATIENT_GRPC_URL`, `SERVICE_JWT_SECRET`, `SERVICE_NAME`.
- [ ] Auth : guard `ServiceAuthGuard` + `@UseGuards`, puis mTLS (`credentials`).
- [ ] Deadlines/timeouts + logs + health check.
- [ ] Route REST interne supprimée après bascule.
```
