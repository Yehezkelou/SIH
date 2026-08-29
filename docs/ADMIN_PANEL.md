# Panel Admin — Spécification UI/UX & Design System

> Interface d'administration du **SIH** (Système d'Information Hospitalier).
> Point de départ de l'interface complète. Stack : **Next.js 16 (App Router) · React 19 · Tailwind CSS**.
> Structure par *features* (comme `auth-service`), client HTTP `axios` centralisé, data-fetching `@tanstack/react-query`.

---

## 1. Vision & périmètre

Le panel admin est la **console de pilotage** du SIH. C'est l'endroit d'où un administrateur (ou un profil habilité) gère :

- **Personnel / Comptes** — création, désactivation, réinitialisation MFA, affectation de rôles.
- **Rôles & Permissions (RBAC)** — matrice `permission ↔ rôle` (ex. `patient:create`, `admission:update`).
- **Patients** — recherche, consultation de la fiche, documents.
- **Admissions** — suivi des admissions/hospitalisations, services ciblés.
- **Urgences** — file et statut des prises en charge urgentes.
- **Statistiques** — indicateurs d'activité (admissions/jour, taux d'occupation…).
- **Paramètres** — services/unités, référentiels, configuration système.

> ⚠️ Chaque module est **gardé par permission** côté UI ET côté gateway. L'UI ne fait que *masquer* ; la vraie sécurité reste au niveau `api-gateway` + services.

---

## 2. Stack & conventions

| Domaine | Choix |
|--------|-------|
| Framework | Next.js 16 (App Router, Server + Client Components) |
| UI | Tailwind CSS + tokens design (cf. §7) |
| Data | `@tanstack/react-query` (cache, invalidation, statuts `isPending`) |
| HTTP | `axios` via `lib/api-client.ts` (baseURL = gateway `:8080`, `withCredentials`) |
| Formulaires | `react-hook-form` + `zod` (schémas colocalisés dans la feature) |
| Icônes | `lucide-react` (jeu cohérent, léger) |
| État session | cookie/token géré par le middleware Next + intercepteur axios (refresh sur 401) |
| Accessibilité | contrastes AA, focus visibles, navigation clavier, `aria-*` sur composants interactifs |

**Règle d'or** : *une fonctionnalité = un dossier* (`features/<nom>/` avec `components/`, `hooks/`, `api/`, `schema.ts`). On ne mélange pas UI générique et logique métier.

---

## 3. Arborescence (App Router)

```
apps/frontend/admin-panel/
└── src/
    ├── app/
    │   ├── (auth)/                 # login déjà couvert par auth-service front
    │   └── (dashboard)/            # groupe protégé, layout commun (sidebar + topbar)
    │       ├── layout.tsx          # AdminShell (sidebar + topbar + <main>)
    │       ├── page.tsx            # "/"  → Vue d'ensemble (dashboard)
    │       ├── personnel/
    │       │   ├── page.tsx        # liste du personnel
    │       │   └── [id]/page.tsx   # fiche agent
    │       ├── roles/page.tsx      # matrice rôles & permissions
    │       ├── patients/
    │       │   ├── page.tsx        # liste + recherche
    │       │   └── [id]/page.tsx   # PROFIL PATIENT (cf. maquette de référence)
    │       ├── admissions/page.tsx
    │       ├── urgences/page.tsx
    │       ├── statistiques/page.tsx
    │       └── parametres/page.tsx
    ├── features/                   # personnel/, roles/, patients/, admissions/…
    ├── components/                 # UI générique (Button, Card, Badge, Table, Tabs…)
    ├── lib/                        # api-client, session, utils
    ├── config/                     # env, routes, nav (menu sidebar)
    └── styles/globals.css          # tokens de thème (variables CSS)
```

> `admin-panel` est une **nouvelle app Nx** (`apps/frontend/admin-panel`). L'ancienne `accueil-admin` a été supprimée — on repart propre.

---

## 4. Layout global (repris de la maquette)

La maquette de référence donne la structure cible. On la transpose au SIH :

```
┌───────────────┬────────────────────────────────────────────────────────┐
│               │  ☰  Titre de page          [Établissement ▾] [FR ▾] 🔔 👤 │  ← Topbar
│   SIDEBAR     ├────────────────────────────────────────────────────────┤
│               │                                        [ IMPRIMER ][ ÉDITER ]│ ← Barre d'actions
│  Logo SIH     │  ┌──────────────┐ ┌───────────────┐ ┌──────────────────┐ │
│               │  │ Carte identité│ │ Infos générales│ │ Anamnèse / Méta  │ │
│  ▸ Vue d'ens. │  └──────────────┘ └───────────────┘ └──────────────────┘ │
│  ▸ Personnel  │  ┌───────────────────────────────┐ ┌──────────────────┐ │
│  ▸ Patients   │  │ Onglets (À venir/Passées/…)   │ │ Fichiers         │ │
│  ▸ Admissions │  │  ligne visite  ligne visite   │ ├──────────────────┤ │
│  ▸ Urgences   │  └───────────────────────────────┘ │ Notes            │ │
│  ▸ Stats      │                                    └──────────────────┘ │
│  ▸ Paramètres │                                                          │
│  ⚙ Réglages   │                                                          │
│  [Carte promo]│                                                          │
└───────────────┴────────────────────────────────────────────────────────┘
```

### Sidebar (`Sidebar.tsx`)
- Largeur `256px` (repliable en `72px` icônes seules via le bouton ☰).
- **Fond en dégradé** (bleu → cyan, cf. tokens `--sidebar-from/--sidebar-to`).
- Logo en haut, items de navigation avec icône + label.
- **Item actif** : pastille blanche translucide + texte blanc plein (comme « Patients » dans la maquette).
- Bas de sidebar : lien Réglages + éventuelle carte d'info (ex. version/environnement) reprenant le style de la carte « Upgrade to PRO » (dégradé plus clair).
- Chaque item est **filtré par permission** (un agent sans `personnel:read` ne voit pas « Personnel »).

### Topbar (`Topbar.tsx`)
- Bouton ☰ (collapse sidebar) + **titre de la page courante**.
- À droite : sélecteur d'établissement/service, sélecteur de langue (FR/EN), cloche **notifications** (badge compteur), **avatar** utilisateur (menu : profil, déconnexion).
- Fond légèrement contrasté du contenu, ombre douce en bas.

### Zone de contenu
- Fond `--bg` (gris très clair), cartes blanches `--surface` avec `radius-lg` et `shadow-card`.
- Grille responsive (3 colonnes desktop → 1 colonne mobile).

---

## 5. Écrans clés

### 5.1 Vue d'ensemble (Dashboard) — `/`
- Rangée de **KPI tiles** : Admissions du jour, Patients actifs, Urgences en attente, Personnel en service.
- Graphe d'activité (admissions sur 30 jours) + répartition par service.
- Raccourcis (créer une admission, ajouter un agent) — visibles selon permissions.

### 5.2 Profil patient — `/patients/[id]` (écran de référence)
Transposition directe de la maquette :
- **Carte identité** : photo, nom, téléphone, email (liens colorés `--link`).
- **Informations générales** (éditable ✏️) : date de naissance, adresse, date d'enregistrement.
- **Anamnèse** (éditable ✏️) : allergies, maladies chroniques, groupe sanguin, antécédents.
- **Onglets** : `Visites à venir (n)` · `Visites passées (n)` · `Traitements planifiés`.
  - Chaque ligne de visite : date (gros), service, médecin (lien), **badge de statut**.
  - Bordure gauche colorée par type/statut (violet, vert…).
- **Fichiers** : liste `nom.pdf · taille` + action **Télécharger**, état *en cours* (spinner + croix d'annulation).
- **Notes** : même patron que Fichiers.
- Barre d'actions : **Imprimer** (outline) · **Éditer** (plein).

### 5.3 Personnel — `/personnel`
- Table : Matricule · Nom · Rôle(s) · Service · Statut (Actif/Désactivé) · MFA · Actions.
- Actions : créer un compte, désactiver, réinitialiser MFA, réassigner rôle.
- Recherche + filtres (rôle, service, statut).

### 5.4 Rôles & Permissions — `/roles`
- **Matrice** : lignes = permissions (`patient:create`, `admission:update`, `*`…), colonnes = rôles, cases = cases à cocher.
- Sauvegarde optimiste + confirmation. Journalise qui modifie quoi.

### 5.5 Admissions / Urgences — `/admissions`, `/urgences`
- Tables filtrables (par service, date, statut). Badges de statut cohérents (cf. §7).
- Ligne → détail admission (fiche signalétique, service ciblé, personnel).

### 5.6 Statistiques — `/statistiques`
- Filtres période/service. Graphes (barres/lignes). Export CSV.

### 5.7 Paramètres — `/parametres`
- Référentiels : services/unités, motifs, types de documents. Config générale.

---

## 6. Composants réutilisables (`components/`)

| Composant | Rôle | Variantes / props clés |
|-----------|------|------------------------|
| `Button` | Actions | `primary` (plein), `outline`, `ghost`, `danger` · `size` · `loading` |
| `Card` | Conteneur blanc | `title`, `action` (ex. bouton ✏️ ou Télécharger) |
| `Badge` | Statuts | `success/teal`, `warning`, `danger`, `info`, `neutral` |
| `Tabs` | Onglets | soulignement animé sur l'onglet actif |
| `DataTable` | Listes | tri, pagination, recherche, colonnes définies par feature |
| `FileRow` | Ligne fichier/note | `name`, `size`, `state` (idle/loading), actions |
| `KpiTile` | Indicateur | `label`, `value`, `trend`, `icon` |
| `Avatar` | Photo/initiales | tailles, fallback initiales |
| `FieldRow` | Ligne label/valeur | mode lecture ↔ édition inline |
| `PermissionGate` | Masque selon droits | `require="personnel:read"` → rend `children` si autorisé |

---

## 7. Thème & Design Tokens 🎨

Palette dérivée de la maquette : **bleu → cyan** en dégradé (sidebar), **bleu** primaire (actions), **teal** pour les statuts positifs, **ambre** en accent, neutres froids. Support **clair + sombre**.

### 7.1 Variables CSS — `styles/globals.css`

```css
:root {
  /* Marque / dégradé sidebar */
  --brand-600: #2F6BFF;   /* primaire (boutons pleins) */
  --brand-500: #4A90E2;   /* hover/actif clair */
  --brand-400: #6C8CF5;
  --sidebar-from: #5A78F0; /* haut du dégradé */
  --sidebar-to:   #38C6E8; /* bas du dégradé */

  /* Accents & sémantique */
  --accent-teal:   #22C9C3; /* badges "planifié/validé" */
  --accent-amber:  #F5A623; /* highlight, avatar */
  --link:          #3BA9E0; /* liens (tel, médecin) */
  --success:       #22C55E;
  --warning:       #F59E0B;
  --danger:        #EF4444;
  --info:          #3B82F6;

  /* Surfaces & texte (thème clair) */
  --bg:            #EEF1F7; /* fond appli */
  --surface:       #FFFFFF; /* cartes */
  --surface-2:     #F6F8FC; /* zones secondaires */
  --border:        #E4E9F2;
  --text:          #1F2433; /* titres */
  --text-muted:    #8A94A6; /* labels/secondaire */

  /* Rayons, ombres, espacements */
  --radius-sm: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --shadow-card: 0 8px 24px rgba(31, 36, 51, 0.06);
  --shadow-pop:  0 12px 32px rgba(31, 36, 51, 0.12);
}

/* Thème sombre : activé via [data-theme="dark"] (ou prefers-color-scheme) */
:root[data-theme="dark"] {
  --brand-600: #4C7DFF;
  --brand-500: #5B8CFF;
  --sidebar-from: #2B3B7A;
  --sidebar-to:   #1D6E8C;

  --accent-teal:  #2DD4CE;
  --link:         #5CC0F0;

  --bg:           #0F1420;
  --surface:      #171E2E;
  --surface-2:    #1F2838;
  --border:       #2A3346;
  --text:         #E7ECF5;
  --text-muted:   #9AA6BC;

  --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.35);
  --shadow-pop:  0 12px 32px rgba(0, 0, 0, 0.5);
}
```

### 7.2 Échelle de gris (neutres froids)

| Token | Clair | Usage |
|-------|-------|-------|
| `neutral-50`  | `#F6F8FC` | fonds de champ |
| `neutral-100` | `#EEF1F7` | fond appli |
| `neutral-200` | `#E4E9F2` | bordures |
| `neutral-400` | `#B4BECE` | icônes discrètes |
| `neutral-500` | `#8A94A6` | texte secondaire |
| `neutral-700` | `#4A5468` | texte corps |
| `neutral-900` | `#1F2433` | titres |

### 7.3 Mapping Tailwind — `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      brand: {
        400: 'var(--brand-400)',
        500: 'var(--brand-500)',
        600: 'var(--brand-600)',
      },
      teal:   { DEFAULT: 'var(--accent-teal)' },
      amber:  { DEFAULT: 'var(--accent-amber)' },
      link:   'var(--link)',
      bg:      'var(--bg)',
      surface: 'var(--surface)',
      'surface-2': 'var(--surface-2)',
      border:  'var(--border)',
      text:    'var(--text)',
      muted:   'var(--text-muted)',
      success: 'var(--success)',
      warning: 'var(--warning)',
      danger:  'var(--danger)',
      info:    'var(--info)',
    },
    borderRadius: {
      sm: 'var(--radius-sm)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
    },
    boxShadow: {
      card: 'var(--shadow-card)',
      pop:  'var(--shadow-pop)',
    },
    backgroundImage: {
      sidebar: 'linear-gradient(180deg, var(--sidebar-from) 0%, var(--sidebar-to) 100%)',
      'promo':  'linear-gradient(135deg, var(--brand-400) 0%, var(--accent-teal) 100%)',
    },
  },
}
```

### 7.4 Recettes d'usage

| Élément | Classe(s) |
|---------|-----------|
| Sidebar | `bg-sidebar text-white` |
| Item actif | `bg-white/15 text-white rounded-lg` |
| Item inactif | `text-white/70 hover:text-white hover:bg-white/10` |
| Carte | `bg-surface rounded-lg shadow-card border border-border` |
| Bouton primaire | `bg-brand-600 text-white rounded-full px-5 py-2 hover:brightness-110` |
| Bouton outline | `border border-brand-600 text-brand-600 rounded-full px-5 py-2` |
| Badge « Planifié » | `bg-teal/15 text-teal rounded-full px-3 py-1 text-xs` |
| Lien | `text-link hover:underline` |
| Fond appli | `bg-bg text-text` |

### 7.5 Statuts → couleurs (référence unique)

| Statut | Couleur | Badge |
|--------|---------|-------|
| Planifié / Programmé | `teal` | `bg-teal/15 text-teal` |
| Validé / Terminé | `success` | `bg-success/15 text-success` |
| En attente | `warning` | `bg-warning/15 text-warning` |
| Urgent / Annulé | `danger` | `bg-danger/15 text-danger` |
| Info / Neutre | `info` / `muted` | `bg-info/15 text-info` |

### 7.6 Typographie & espacement
- Police : `Inter` (ou system-ui) — titres semibold, corps regular.
- Échelle : `text-xs 12` · `sm 14` · `base 16` · `lg 18` · `xl 24` · `2xl 30`.
- Grille : gap `24px` entre cartes, padding carte `24px`.
- Rayons : champs/badges `sm`, cartes `lg`, modales/carte promo `xl`.

### 7.7 Bascule de thème
- Attribut `data-theme="light|dark"` sur `<html>`, persisté (localStorage) + fallback `prefers-color-scheme`.
- Toggle dans le menu avatar (Topbar). Toutes les couleurs passant par les variables CSS, aucun composant à modifier.

---

## 8. États, accessibilité, responsive
- **États** systématiques : `loading` (skeletons sur cartes/tables), `empty` (illustration + CTA), `error` (message + retry).
- **A11y** : contraste AA, focus ring visible (`ring-2 ring-brand-500`), `aria-label` sur icônes seules, navigation clavier des onglets/menus.
- **Responsive** : sidebar en drawer sous `md`, grille 3→1 colonne, tables scrollables horizontalement (`overflow-x-auto`).

---

## 9. Sécurité UI (RBAC)
- `PermissionGate` masque les entrées de menu et actions selon les permissions du token (résolues via `/api/auth` au login).
- Les pages restent protégées côté serveur (middleware Next → redirection `/login` si pas de session) **et** au niveau `api-gateway`.
- Ne jamais se fier au masquage UI : toute action passe par la gateway qui revalide token + permission.

---

## 10. Roadmap de codage (par étapes)

1. **Fondations** — créer l'app Nx `admin-panel`, `globals.css` (tokens §7), config Tailwind, `api-client`, session/middleware, `AdminShell` (Sidebar + Topbar).
2. **Navigation & thème** — menu piloté par permissions, bascule clair/sombre, page « Vue d'ensemble » avec KPI mock.
3. **Patients** — liste + **profil patient** (écran de référence, §5.2) branché sur `/api/patient`.
4. **Personnel & Rôles** — CRUD comptes + matrice permissions sur `/api/auth`.
5. **Admissions & Urgences** — tables + détails sur `/api/admission`.
6. **Statistiques & Paramètres** — graphes, référentiels, exports.
7. **Finitions** — états loading/empty/error, a11y, responsive, tests des parcours critiques.

> **Principe** (repris du `PLAN_DE_CODAGE` auth) : chaque étape doit être **testable et fonctionnelle** avant la suivante. On sécurise les fondations (shell + thème + auth) avant de multiplier les écrans.
