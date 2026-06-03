# Cursor AI Workflow

Lightweight rules, agents, and skills for daily development on this portfolio (React/Vite + Motoko IC).

## Structure

| Folder | Purpose |
|--------|---------|
| `rules/` | Always-on or file-scoped behavior (`.mdc`) |
| `agents/` | Specialized subagents — invoke by name in chat |
| `skills/` | Step-by-step workflows — mention the skill or task |

## Priority

1. Correctness → 2. Simplicity → 3. Maintainability → 4. Readability → 5. Performance → 6. DX

## Daily use

**Default work:** Chat normally; global rules apply automatically.

**Focused help:** `@senior-engineer` for implementation, `@architect` for structure, `@reviewer` after changes, `@ui-ux` for layout/a11y/i18n UX, `@performance` for bundle/3D/scroll/canister latency, `@security-reviewer` before shipping auth/contact/API changes.

**Repeatable tasks:** Say "use create-feature skill" (or similar) for feature work, refactors, reviews, debugging, or tests.

## Commands

```bash
pnpm dev          # from src/frontend
pnpm build        # root — builds workspace
pnpm typecheck    # root
pnpm fix          # Biome fix (frontend)
pnpm bindgen      # regenerate IC actor types after backend.did changes
```

## Customization

- Add rules only when a pattern repeats; keep each file under ~50 lines.
- Prefer project agents over duplicating user-level `~/.cursor/agents/`.
- Extend skills when a workflow stabilizes; avoid one giant skill file.
