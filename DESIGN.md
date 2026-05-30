# Design Brief

## Direction
Editorial creative-developer portfolio — Dave Holloway–inspired layout with teal/violet accents from the HTML mockup. Dark-first, bold typography, carousel work showcase.

## Tone
Confident, approachable, professional. Editorial headlines with developer credibility.

## Palette

| Token | Hex / OKLCH | Usage |
|-------|-------------|-------|
| Background | `#070b14` | Page base |
| Foreground | `#f0f4ff` | Primary text |
| Muted | `#8a9ab8` | Body secondary |
| Primary (Teal) | `#5ee7d0` | Accents, CTAs, labels |
| Accent (Violet) | `#a78bfa` | Gradient pair with teal |

## Typography
- **Display**: Syne (800) — H1, H2, logo
- **Body**: DM Sans — paragraphs, nav
- **Mono**: JetBrains Mono — section labels, codes, tags

## Layout (Home)
1. Hero — split text + avatar portrait
2. About — bio, roster, info card, journey timeline
3. Work — Embla carousel with project codes
4. Services — 2×2 grid with LNG/FWK/TOL/SFT codes
5. Contact — editorial CTA + ICP form

## Motion
- `motion` scroll reveals (`whileInView`)
- Hero role rotation (2.8s)
- Avatar mouse parallax + rim glow pulse + subtle blink
- `prefers-reduced-motion` disables animations

## i18n
EN / DE / IT via `LocaleProvider`, persisted in `localStorage`.

## Constraints
- Dark mode only
- Keep ICP backend for projects + contact
- TanStack Router for `/projects/$id`
