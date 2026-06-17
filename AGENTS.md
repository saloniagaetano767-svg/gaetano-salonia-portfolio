# Project Guidance

## User Preferences

[No preferences yet]

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`

**Backend** (run from `src/backend/`):

- **install**: `mops install`
- **typecheck**: `mops check --fix`
- **build**: `mops build`

**Backend and frontend integration** (run from root):

- **generate bindings**: `pnpm bindgen` This step is necessary to ensure the frontend can call the backend methods.

## Git Workflow

| Branch | Zweck |
|--------|--------|
| `develop` | Tägliche Arbeit, WIP, Preview-Deploys |
| `main` | Stabiler Produktionscode — nur via PR von `develop` |

**Arbeiten:** immer auf `develop` committen und pushen.

**Release (auf Anfrage):**

1. Auf `develop`: `pnpm typecheck` und `pnpm build` (Frontend), ggf. `mops check` (Backend)
2. PR `develop` → `main` erstellen und Vercel-Preview testen
3. PR mergen → Vercel deployt Production von `main`
4. `develop` mit `main` synchron halten: `git checkout develop && git pull origin main`

**Einmalig — Branch Protection für `main`:**

```powershell
gh auth login
.\scripts\setup-github-branch-protection.ps1
```

Alternativ in GitHub: *Settings → Branches → Add rule* für `main` — *Require a pull request before merging*, *Do not allow bypassing*.

## Vercel

Repo-Root importieren (**Root Directory** `.`). Builds und SPA-Fallback sind in [vercel.json](vercel.json) vorgegeben; Node **20** via [.nvmrc](.nvmrc).

| Einstellung | Wert |
|-------------|------|
| Production Branch | `main` |
| Preview Deployments | aktiv (für `develop` und PRs) |

Prüfen unter *Vercel → Project → Settings → Git*.

- **Production-Check nach Deploy:** Homepage und direkte URL z. B. `/projects/1` (Client-Routing) im Browser testen.
- **Preview nach Push auf `develop`:** Vercel-Kommentar/Deployment auf GitHub oder Vercel-Dashboard öffnen.

**Optional (ICP Mainnet):** Unter *Settings → Environment Variables* die für [`vite.config.js`](src/frontend/vite.config.js) nötigen `CANISTER_*` / `DFX_*` / `II_URL` / `STORAGE_GATEWAY_URL` setzen. Für `dist/env.json` bei Bedarf: `BACKEND_HOST`, `BACKEND_CANISTER_ID`, `PROJECT_ID`, `II_DERIVATION_ORIGIN` — sonst wird die lokale [`src/frontend/env.json`](src/frontend/env.json) ins Build kopiert.

## Learnings

[No learnings yet]
