# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

SvelteKit terminal-experience website for Abyssal Arts -- a solo indie Android dev studio.
Domain: abyssal-arts.com. Deployment target: Fly.io (adapter-node). Currently Phase 1 (static pages + CLI).

The design vision is "a terminal that happens to be a website" -- behaviorally terminal-like,
not just themed. Working command bar, boot sequence, depth meter, ambient status bar.

## Architecture

SvelteKit 5 + TypeScript. Single layout shell wraps all routes with CRT effects,
breadcrumbs, depth meter, status bar, command bar, and boot sequence overlay.

**Routes:**
- `/` -- Home (hero, philosophy, products, about teaser, contact)
- `/products/brain-dump` -- Brain Dump product page (man-page format)
- `/products/rift` -- Rift product page (man-page format)
- `/about` -- Studio story
- `/privacy` -- Global privacy policy
- `/privacy/brain-dump` -- Brain Dump privacy policy

**Components** (`src/lib/components/`):
- `BootSequence.svelte` -- POST-style first-visit animation with localStorage skip
- `CommandBar.svelte` -- CLI palette (/ to open, desktop only)
- `DepthMeter.svelte` -- Scroll-based depth gauge, hidden on mobile
- `StatusBar.svelte` -- Ambient rotating system messages
- `Breadcrumbs.svelte` -- Filesystem-style path navigation (guest@abyssal-arts:~/path$)
- `AsciiBox.svelte` -- Box-drawing container with optional title
- `AsciiDivider.svelte` -- Section dividers
- `ManPageHeader.svelte` -- Man page format header for product pages
- `CursorBlink.svelte` -- Blinking terminal cursor
- `ProductCard.svelte` -- Product card for home grid
- `FeatureTag.svelte` -- Terminal-styled tag

**Stores** (`src/lib/stores/`):
- `boot.ts` -- Boot state + localStorage persistence
- `command.ts` -- CLI open/close state, history, output
- `depth.ts` -- Scroll position to depth-in-meters
- `routes.ts` -- Route tree used by breadcrumbs and CLI (findNode, getChildren, getPathSegments)

**Command System** (`src/lib/commands/`):
- `registry.ts` -- Command registry, parser, tab completion. Commands self-register on import.
- `navigation.ts` -- cd, ls
- `display.ts` -- help, man, cat, history, clear
- `easter-eggs.ts` -- sudo, rm, neofetch, fortune, ping, uptime, whoami, echo, pwd, date, exit

To add a new command: create a CommandDef in the appropriate file and call registerCommand().

**Styles:** `src/lib/styles/terminal.css` -- global CSS vars, reset, scanlines, CRT vignette, scrollbar, animations.

**Actions:** `src/lib/actions/reveal.ts` -- use:reveal directive for IntersectionObserver scroll-fade-in.

## Development

```
npm run dev       # Start dev server (localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
```

## Visual Identity (non-negotiable)

Terminal-amber on near-black. Read `ABYSSAL_ARTS_BRAND.md` before content changes.

- Font: JetBrains Mono everywhere, no exceptions
- Palette: CSS custom properties in terminal.css -- --amber (#D4890A), --bg (#080806), --surface (#0F0F0D)
- Effects: CRT scanlines, vignette, amber glow. No gradients, no glassmorphism, no rounded corners
- Responsive: single breakpoint at 600px. Command bar desktop-only.

## Brand Rules (enforced)

- No emoji in product copy
- No superlatives ("revolutionary", "game-changing")
- No fake urgency or dark pattern language
- Voice: direct, honest, occasionally dry, never corporate
- Privacy-first messaging -- it's the foundation, not a feature

## Key Patterns

- Svelte 5 runes: $props(), $state(), $derived(), $effect(). No legacy export let or $: syntax.
- Scroll animations: use:reveal directive on elements that should fade in
- Terminal containers: AsciiBox for boxed content, AsciiDivider for section breaks
- Product pages: ManPageHeader + man-page body sections (SYNOPSIS, DESCRIPTION, OPTIONS, SEE ALSO)

## Phase Status

Phase 1 complete: scaffold, all pages, command bar, boot sequence, depth meter, status bar.
Phase 2 next: auth + accounts (Lucia Auth v3 + Turso). See `docs/Website-Rebuild-Plan.md`.
