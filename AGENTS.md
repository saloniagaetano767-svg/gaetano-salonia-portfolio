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

## Vercel

Repo-Root importieren (**Root Directory** `.`). Builds und SPA-Fallback sind in [vercel.json](vercel.json) vorgegeben; Node **20** via [.nvmrc](.nvmrc).

- **Production-Check nach Deploy:** Homepage und direkte URL z. B. `/projects/1` (Client-Routing) im Browser testen.

**Optional (ICP Mainnet):** Unter *Settings → Environment Variables* die für [`vite.config.js`](src/frontend/vite.config.js) nötigen `CANISTER_*` / `DFX_*` / `II_URL` / `STORAGE_GATEWAY_URL` setzen. Für `dist/env.json` bei Bedarf: `BACKEND_HOST`, `BACKEND_CANISTER_ID`, `PROJECT_ID`, `II_DERIVATION_ORIGIN` — sonst wird die lokale [`src/frontend/env.json`](src/frontend/env.json) ins Build kopiert.

## Learnings

[No learnings yet]
