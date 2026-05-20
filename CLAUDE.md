# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

SvelteKit terminal-experience website for Abyssal Arts -- a solo indie Android dev studio.
Domain: abyssal-arts.com. Deployment target: Fly.io (adapter-node). Phases 1-4 complete. Phase 5 (Fly.io deploy + DNS cutover) remaining.

The design vision is "a terminal that happens to be a website" -- behaviorally terminal-like,
not just themed. Working command bar, boot sequence, depth meter, ambient status bar.

## Architecture

SvelteKit 5 + TypeScript. Single layout shell wraps all routes with CRT effects,
breadcrumbs, depth meter, status bar, command bar, and boot sequence overlay.

**Routes:**
- `/` -- Home (hero, philosophy, products, about teaser, contact)
- `/products/brain-dump` -- Brain Dump product page (man-page format)
- `/products/rift` -- Rift product page (man-page format, purchase button)
- `/about` -- Studio story
- `/privacy` -- Global privacy policy
- `/privacy/brain-dump` -- Brain Dump privacy policy
- `/auth/login` -- Email/password login
- `/auth/register` -- Registration form
- `/auth/logout` -- Logout (server action only)
- `/account` -- User dashboard (licenses, activity)
- `/account/settings` -- Email, password, avatar
- `/feedback` -- Structured feedback form (product, type, body)
- `/api/stripe/checkout` -- Creates Stripe Checkout session
- `/api/stripe/webhook` -- Handles checkout.session.completed
- `/api/license/validate` -- Rift app license validation endpoint
- `/api/download/rift` -- Authenticated proxy to private GitHub release asset
- `/api/comments` -- Comment CRUD (GET list, POST create)
- `/api/comments/[id]` -- Comment CRUD (PATCH edit, DELETE)

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
- `Comment.svelte` -- Single comment display (terminal I/O styled: user@abyssal:~$)
- `CommentInput.svelte` -- Terminal-styled comment input line
- `CommentThread.svelte` -- Threaded comment list with replies

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
- `auth.ts` -- login, logout, register (triggers navigation to auth routes)

To add a new command: create a CommandDef in the appropriate file and call registerCommand().

**Styles:** `src/lib/styles/terminal.css` -- global CSS vars, reset, scanlines, CRT vignette, scrollbar, animations.

**Server** (`src/lib/server/`):
- `db.ts` -- Turso (libSQL) database client
- `auth.ts` -- Lucia Auth v3 setup (session-based, email/password + GitHub OAuth)
- `stripe.ts` -- Stripe client configuration
- `licenses.ts` -- License key generation (RIFT-XXXX-XXXX-XXXX-XXXX) + validation logic
- `comments.ts` -- Comment CRUD operations
- `feedback.ts` -- Feedback submission handling

**Hooks:** `src/hooks.server.ts` -- Lucia session validation on every request.

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

Phases 1-4 complete. See `docs/Website-Rebuild-Plan.md` for full plan.

- Phase 1: SvelteKit scaffold, all pages, command bar, boot sequence, depth meter, status bar
- Phase 2: Lucia Auth v3 + Turso, register/login/logout, account dashboard + settings
- Phase 3: Stripe Checkout, webhook, license key generation + validation, download proxy
- Phase 4: Terminal-styled comments (threaded), structured feedback form + API

Phase 5 next: Fly.io deployment, Turso production DB, Stripe live keys, Cloudflare DNS cutover, production smoke test.
