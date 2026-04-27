# Design Brief

## Direction
Minimalist luxury portfolio — refined, professional, intentional. Dark-first with precision cyan accents. Zero visual clutter.

## Tone
Confident, curated, senior-level. Every pixel serves a purpose.

## Differentiation
Geometric display font (Space Grotesk) paired with neutral body font (Inter). Selective accent highlights. Smooth entrance animations choreographed per section.

## Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|-------------|-----------|-------|
| Background | 0.98 0 0 | 0.08 0 0 | Page base |
| Foreground | 0.15 0 0 | 0.96 0 0 | Primary text |
| Card | 0.96 0 0 | 0.12 0 0 | Elevated surfaces |
| Primary/Accent | 0.62 0.208 262.8 | 0.72 0.208 262.8 | Cyan highlights, CTAs |
| Muted | 0.88 0 0 | 0.22 0 0 | Secondary text, disabled |
| Border | 0.92 0 0 | 0.2 0 0 | Dividers, subtle lines |
| Destructive | 0.58 0.22 22 | 0.64 0.19 22 | Error, warnings |

## Typography
- **Display**: Space Grotesk (geometric, technical confidence) — H1, H2, navigation
- **Body**: DM Sans (clean, neutral, legible) — paragraphs, metadata
- **Mono**: Geist Mono (code, metadata) — timestamps, inline code

## Elevation & Depth
- **Flat**: text, icons (no shadow)
- **Card**: `shadow-card` (1px/2px subtle depth) — project cards, form inputs
- **Elevated**: `shadow-elevated` (8px/24px ambient) — modals, popovers, sticky header

## Structural Zones

| Zone | Background | Border | Shadow | Intent |
|------|------------|--------|--------|--------|
| Header/Nav | card | border-b | card | Elevated nav plane |
| Hero | background | none | none | Breathing space, accent callout |
| Projects Grid | background | none | card per item | Visual weight through cards |
| About | background | none | none | Text-focused |
| Contact | background | border-t | none | Low-key, form-centric |
| Footer | muted/30 | border-t | none | Muted closure |

## Spacing & Rhythm
- Section padding: 4rem vertical (64px), 2rem horizontal
- Card padding: 1.5rem (24px)
- Gap between items: 1rem (16px)
- Responsive: reduce by 50% on mobile

## Component Patterns
- **Buttons**: Accent background, white text, `transition-smooth` on hover (scale 1.05)
- **Links**: Inherit color, underline accent on hover
- **Inputs**: card background, border, focus ring primary color
- **Project Cards**: card surface, border, hover lift via `shadow-elevated`

## Motion
- **Entrance**: `fade-in` + `slide-up` staggered per section (0.5s each)
- **Interaction**: `transition-smooth` on all interactive elements (0.3s)
- **Hover**: button scale 1.05, card shadow lift

## Constraints
- No rainbow palettes — 3 core colors (white, cyan, charcoal)
- Minimal radius (0.5rem/8px) — geometric not soft
- Dark mode only — no light mode
- Animation only on entrance/interaction, not constant

## Signature Detail
Cyan accent as structural line under section headings — subtle, repeated, reinforces professional confidence without clutter.
