# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page landing site for Abyssal Arts — a solo indie Android dev studio. Hosted on GitHub Pages at abyssal-arts.com. No build tools, no frameworks, no dependencies.

## Architecture

**Single file: `index.html`** — contains all HTML, CSS (in `<style>`), and JS (in `<script>`). No external CSS/JS files, no bundler, no package.json.

Sections in order: Hero, Philosophy (01), Products (02), About (03), Contact (04), Footer.

**JS behavior:** IntersectionObserver adds `.visible` to `.reveal` elements on scroll (threshold 0.1, -40px bottom margin). That's the entire JS surface.

## Visual Identity

Terminal-amber on near-black. This is non-negotiable — see `ABYSSAL_ARTS_BRAND.md` for the full brand guide.

- **Font:** JetBrains Mono (Google Fonts) — monospace everywhere, no exceptions
- **Palette:** CSS custom properties on `:root` — `--amber` (#D4890A) primary, `--bg` (#080806) background, `--surface` (#0F0F0D) cards
- **Effects:** CRT scanlines (`body::after`), vignette (`body::before`), amber glow via `text-shadow`. No gradients, no glassmorphism, no rounded corners
- **Responsive:** Single breakpoint at 600px

## Development

No build step. Open `index.html` in a browser or use any local server:

```
python -m http.server 8000
```

## Brand Rules (enforced)

Read `ABYSSAL_ARTS_BRAND.md` before making content changes. Key constraints:

- No emoji in product copy
- No superlatives ("revolutionary", "game-changing")
- No fake urgency or dark pattern language
- Voice: direct, honest, occasionally dry, never corporate
- Privacy-first messaging — it's the foundation, not a feature
