# Revue de `createNewAdmission` — bugs trouvés et corrections

Revue de la fonction `createNewAdmission` (`repository/admission.repository.ts`)
telle qu'écrite avant cette passe. Plusieurs bugs auraient empêché le
fonctionnement correct dès le premier appel réel, et il n'y avait aucune
gestion d'erreur exploitable par un futur controller. Détail ci-dessous,
avec la correction apportée pour chacun.

## Bugs bloquants

### 1. `manager.save(companions/documents/payers)` plantait sur le cas le plus courant

```ts
const companions = data.companions?.map(...)   // undefined si data.companions absent
...
await Promise.all([
    manager.save(companions),   // manager.save(undefined) !
    manager.save(documents),
    manager.save(payers)
])
```

`companions`, `documents` et `payers` sont **optionnels** dans le schéma
Zod (`CreateAdmissionSchema`). Dès qu'une admission est créée sans
accompagnant — le cas le plus fréquent, ex. une consultation externe seule
— `data.companions` est `undefined`, donc `data.companions?.map(...)` vaut
aussi `undefined`, et `manager.save(undefined)` est appelé. TypeORM ne gère
pas cet appel proprement : la transaction échoue avec une erreur brute non
gérée, remontée en 500 générique au client (aucun filtre du repo ne
traduit ce cas). **Toute admission sans accompagnant, document ou payeur
échouait.**

**Correction :** `(data.companions ?? []).map(...)` (idem documents/payers)
— `manager.save([])` est un no-op valide.

### 2. La vérification "patient déjà admis" bloquait le retour d'un patient déjà sorti

```ts
admissionStatus : In([
    AdmissionStatus.PENDING, AdmissionStatus.ADMITTED, AdmissionStatus.CANCELLED,
    AdmissionStatus.DISCHARGED, AdmissionStatus.PRE_ADMITTED, AdmissionStatus.REGISTERED,
    AdmissionStatus.TRANSFERED, AdmissionStatus.DISCHARGED_PENDING,
])
```

Cette liste couvrait quasiment tous les statuts existants, y compris
`CANCELLED` et `DISCHARGED` — des statuts **terminaux**. Résultat : un
patient qui a déjà été hospitalisé une fois (et donc sorti,
`DISCHARGED`) ne pouvait plus jamais être ré-admis, puisque
`createNewAdmission` trouvait toujours son ancienne admission "terminée"
et la traitait comme un conflit actif. Un hôpital où les patients ne
peuvent revenir qu'une seule fois dans leur vie n'est pas un système
fonctionnel.

**Correction :** liste réduite aux statuts réellement "actifs"
(`PENDING`, `PRE_ADMITTED`, `REGISTERED`, `ADMITTED`, `TRANSFERED`,
`DISCHARGED_PENDING`), extraite en constante `ACTIVE_ADMISSION_STATUSES`
pour éviter qu'elle diverge silencieusement d'une future méthode qui en
aurait besoin.

### 3. `admissionType` obligatoire en base, optionnel côté validation

L'entité `Admission.admissionType` est `nullable: false`, mais
`CreateAdmissionSchema` le déclarait `.optional()`. Une requête sans
`admissionType` passait la validation Zod (donc le pipe global la laissait
passer), puis échouait à l'insertion SQL avec une violation `NOT NULL` —
une erreur Postgres brute renvoyée au client plutôt qu'un message de
validation clair à 400.

**Correction :** `admissionType` rendu obligatoire dans
`CreateAdmissionSchema`, avec message d'erreur dédié
(`"Le type d'admission est requis"`), pour que l'erreur soit détectée
*avant* la base de données, avec un message exploitable.

### 4. `payers` incohérent par rapport à `companions`/`documents`

```ts
payers : z.array(z.object({...}).optional()),
```

Ici c'est l'**élément** du tableau qui était optionnel (un payeur peut être
`undefined` au milieu du tableau — non-sens), et le tableau lui-même **ne
l'était pas** : omettre complètement `payers` dans la requête faisait
échouer la validation ("expected array, received undefined"), alors que
`companions`/`documents` pouvaient être omis sans problème.

**Correction :** `.optional()` déplacé sur le tableau entier, retiré de
l'élément — cohérent avec `companions`/`documents`.

## Bugs silencieux (pas de crash, mais mauvais comportement)

### 5. `reason` (motif d'admission) jamais enregistré

`data.admission.reason` était validé par Zod mais jamais passé à
`manager.create(Admission, {...})` — l'information saisie par le personnel
était silencieusement perdue. Ajouté à l'insertion.

### 6. `admissionDate` pouvait rester `null` sans raison

Champ `.optional()` côté validation, et rien ne le complétait côté
serveur si absent — une admission pouvait n'avoir aucune date de début,
ce qui casse tout tri/filtrage ultérieur par date. Corrigé :
`admissionDate: data.admission.admissionDate ?? new Date()`.

### 7. `admissionNumber` fourni par le client, jamais vérifié

Le schéma exigeait `admissionNumber` du client, sans aucune vérification
d'unicité avant insertion (la seule protection étant la contrainte
`unique` en base, qui aurait renvoyé une erreur Postgres brute en cas de
collision). C'est aussi incohérent avec le seul autre identifiant métier
du système : `Patient.uniquePatientId`, que le client ne fournit jamais —
il est **généré côté serveur** par `patient.repository.ts` (boucle de
génération + vérification d'unicité, jusqu'à 5 tentatives).

**Correction :** `admissionNumber` retiré du payload client. Génération
serveur via un nouveau `GeneratedAdmissionNumber()`
(`helpers/UniqueNumero.ts`, renommé de l'ancien `GeneratedEncouterId` —
son nom ne correspondait pas à ce qu'il produisait), avec la même boucle
de vérification d'unicité que côté patient (5 tentatives). Même
traitement pour `Encounter.encounterNumber`, qui était accepté du client
sans jamais être vérifié : maintenant généré côté serveur via
`GeneratedEncounterNumber()` (pas de boucle d'unicité ici, la collision
n'aurait pas de conséquence bloquante identifiée pour un simple numéro de
séjour — à réévaluer si un jour ce numéro sert de clé d'accès externe).

### 8. Forme de retour incohérente entre le cas "conflit" et le cas "succès"

Avant : `{ exist: true, admission }` (conflit) vs.
`{ id, patientId, admission: { admission, companions, documents, payers } }`
(succès) — la clé `admission` désignait tantôt l'entité, tantôt un objet 
englobant tout. Un futur controller n'aurait pas pu discriminer proprement
les deux cas sans connaître ce détail par cœur.

**Correction :** retour aplati et discriminé par `exist` :
`{ exist: true, admission }` vs.
`{ exist: false, admission, companions, documents, payers, encounter }`
— même convention que `patient.repository.ts` (`"exist" in patientCreated`).

## Absence totale de gestion d'erreur HTTP

Le repository ne levait plus aucune `HttpException` (une version
antérieure le faisait directement dans le repository ; cette logique avait
disparu sans être déplacée ailleurs). Un futur appelant recevait un objet
`{ exist: true, ... }` en cas de conflit — à charge pour lui de deviner
qu'il fallait le transformer en réponse d'erreur.

**Correction, alignée sur la convention `Patient-Identity-Service`**
(repository = données + retours discriminés, service = traduction en
`HttpException`) :

- `helpers/messageError.ts` (nouveau) : messages centralisés
  `ADMISSION_PATIENT_ALREADY_ACTIVE` (409) et
  `ADMISSION_NUMBER_GENERATION_FAILED` (409, cas extrême où 5 tentatives de
  génération collisionnent toutes).
- `services/admission.service.ts` (nouveau) : `AdmissionService.createNewAdmission`
  appelle le repository et lève l'`HttpException` correspondante selon le
  discriminant du retour, sinon renvoie le résultat.
- `repository/admission.repository.ts` : la classe s'appelait `AdmissionService`
  alors que le fichier est `admission.repository.ts` et qu'elle hérite de
  `Repository<Admission>` — collision de nom directe avec le vrai service
  business qu'il fallait créer. **Renommée `AdmissionRepository`.**
- Les deux sont enregistrés comme `providers` dans `app.module.ts` (ils ne
  l'étaient pas du tout auparavant — aucune injection de dépendance
  n'aurait fonctionné).

## Non modifié, à trancher plus tard

- Toujours pas de vérification que `patientId` existe réellement côté
  `Patient-Identity-Service` (appel inter-service ou confiance au
  payload) — déjà noté dans `PLAN_FONCTIONNALITES_ADMISSION.md` §1.3,
  toujours vrai.
- La condition "encounter créé seulement si `ADMITTED`/`REGISTERED`" a été
  conservée telle quelle : elle a du sens métier (pas de séjour actif à
  positionner tant que le patient n'est pas physiquement pris en charge),
  mais implique qu'il faudra une méthode dédiée plus tard pour créer
  l'`Encounter` a posteriori quand une admission `PENDING`/`PRE_ADMITTED`
  passe à `ADMITTED`/`REGISTERED` — cette méthode n'existe pas encore
  (`findAdmission` est toujours un stub vide).
