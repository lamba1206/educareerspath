# Design Brief

## Direction
EduCareersPath — integrated Career, Education & Future Skills Ecosystem; deep-blue trust + bright-orange energy, glassmorphism, choreographed motion. Enhancement of existing system; all prior tokens preserved.

## Tone
Premium EdTech (Apple/Stripe/Linear polish) — confident, trustworthy, calm whitespace, life-decision gravitas for 16–22-year-olds. Never coaching-institute.

## Differentiation
One-scroll ecosystem story: animated hero mesh + 9-stat band + 24+ glass ecosystem cards + Passport-vs-Pro comparison + dual curriculum ladders + country grid + accordion FAQ — all on the deep-blue/orange system.

## Color Palette
| Token | OKLCH (light / dark) | Role |
| --- | --- | --- |
| background | 0.99 0.004 250 / 0.15 0.015 250 | page surface |
| foreground | 0.18 0.012 250 / 0.94 0.008 250 | primary text |
| card | 1.0 0 0 / 0.19 0.018 250 | elevated surfaces |
| primary | 0.45 0.16 250 / 0.6 0.17 250 | deep blue — CTAs, active, links |
| secondary | 0.95 0.04 55 / 0.24 0.04 55 | orange-tinted surfaces |
| accent | 0.73 0.18 55 / 0.73 0.18 55 | bright orange — highlights, badges |
| muted | 0.96 0.006 250 / 0.23 0.02 250 | section alt, secondary text |
| destructive | 0.55 0.22 25 / 0.6 0.2 25 | errors |
| success | 0.6 0.16 150 / 0.65 0.16 150 | positive signals |
| mesh-blue/orange/cyan | additive orbs | hero ambient background |

## Typography
- Display: Space Grotesk — hero, headings, labels (tight tracking)
- Body: Inter — paragraphs, UI, buttons (Google Fonts)
- Mono: Geist Mono — counters, stat values, ladder nodes
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base text-lg`

## Elevation & Depth
Three shadow tiers (`shadow-subtle`, `shadow-card`, `shadow-elevated`) + glassmorphism (`glass`, `glass-strong`, `glass-tinted`, `glass-card`) + new gradient surfaces (`bg-gradient-hero`, `bg-gradient-band`, `bg-gradient-highlight`, `bg-gradient-ladder`).

## Structural Zones
| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header | `bg-card` | `border-b` | sticky, logo left, mega-menu + CTA, mobile drawer |
| Hero | `bg-background` + `.hero-mesh` orbs + grid | — | ambient mesh, floating particles, illustration right |
| Stats band | `.glass-tinted` over `bg-gradient-band` | — | 9 counters, `animate-counter-pulse` |
| Ecosystem grid | `bg-background` alt `bg-muted/40` | — | 24+ `.ecosystem-card` on `.glass-card`, 6-col @2xl |
| Comparison | `bg-muted/30` | — | `.compare-grid`, recommended column `bg-gradient-highlight` |
| Ladders | `bg-background` | — | dual `.ladder` with gradient connector + numbered nodes |
| Country grid | `bg-muted/40` | — | `.country-card` with orange stripe, mono stats |
| FAQ | `bg-background` | — | `.faq-item` accordion, chevron rotate |
| Dashboard | `bg-muted/20` | — | `.dash-shell` sidebar + tiles, glass surfaces |
| Footer | `bg-muted/40` | `border-t` | brand, link columns, copyright |

## Spacing & Rhythm
Section gaps `py-16 md:py-24`; ecosystem grid `gap-1.5rem` scaling; stat band `gap-2rem`; ladder rungs `gap-1.5rem`; country grid `gap-1.5rem`; dashboard `gap-2rem`.

## Component Patterns
- Buttons: deep-blue `bg-primary` primary, outline ghost secondary, orange `bg-accent` tertiary; `hover-lift` + `shadow-elevated`
- Glass cards: `.glass-card` translucent backdrop-blur; `.ecosystem-card` extends with icon tile + featured dot
- Hero mesh: `.hero-mesh-orb-blue/orange/cyan` blurred drifting orbs + `.hero-mesh-grid` masked grid
- Stats: `.stat-value` Geist Mono + `.stat-plus` orange; `animate-counter-pulse`
- Comparison: `.compare-grid` 3-col, `.compare-cell-recommended` orange-bordered highlight, check/cross icons
- Ladder: `.ladder` gradient connector + `.ladder-node` numbered, `.ladder-rung-advanced` orange cap, skill pills
- Country: `.country-card` + `.country-stripe` orange, mono stat pairs
- FAQ: `.faq-trigger` + `.faq-chevron` rotate on `[data-state=open]`
- Dashboard: `.dash-sidebar` nav + `.dash-tile-grid` 4-col stat tiles, glass surfaces

## Motion
- Entrance: `fade-in-up` staggered on hero/cards; `ladder-reveal` on rungs; `count-up` on stats; `scale-in` on modals
- Hover: `hover-lift` (−4px), `hover-lift-sm`, `hover-scale`, `hover-glow` orange ring; `transition-smooth`
- Decorative: `animate-float-particle` particles + `animate-mesh-drift` hero orbs; `animate-counter-pulse` stats
- Accordion: chevron rotate 0.25s; content height via Radix
- Loading: `.loader-screen` ring spin + orange dots
- Reduced-motion: all ambient + entrance animations disabled

## Constraints
- Light primary; dark fully tuned (not inverted) — both AA+
- Deep blue dominant, bright orange sparingly (highlights, active, recommended)
- Mobile-first; mobile nav drawer required
- Lucide icons throughout; no emoji/raster icons
- Semantic OKLCH tokens only; no raw hex/rgb in components
- All new utilities ADDITIVE — existing tokens, fonts, glass, gallery, lightbox preserved
- `--primary` 0.45 0.16 250 and `--accent` 0.73 0.18 55 UNCHANGED

## Signature Detail
A hero with a living ambient mesh (drifting blue/orange/cyan orbs over a masked grid) behind a glassmorphic AI-education illustration, flowing into a 9-counter statistics band — the integrated ecosystem story visible in the first scroll.

## Proof Photo Gallery (preserved)
| Element | Treatment |
| --- | --- |
| Grid | `.gallery-grid` 1→2→3→4 col responsive |
| Card | `.gallery-card` on `.glass-card`, 4:3 image + caption |
| Hover | image `scale(1.06)` + blue scrim; `hover-lift` |
| Lazy | `.gallery-thumb` → `.gallery-thumb-loaded` `gallery-fade-in` |
| Lightbox | `.lightbox-overlay` dark + blur + blue radial glow; nav + close |
