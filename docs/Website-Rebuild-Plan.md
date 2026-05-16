# Abyssal Arts Website Rebuild — "The Terminal"

**Decided:** 2026-05-01
**Current state:** Static single-page `index.html` on GitHub Pages (abyssal-arts.com)
**Target state:** SvelteKit app with auth, e-commerce, comments, product pages
**Stack:** SvelteKit + Lucia Auth + Turso (SQLite edge) + Stripe + Fly.io
**Cost target:** ~$0/mo on free tiers until revenue justifies scaling
**Aesthetic:** Terminal-amber CRT — but pushed further than "dark background + amber text"

---

## Design Vision — "Not Another Dark Theme"

The current site has the palette right but the layout is generic (hero → sections → footer). The rebuild should feel like the user walked into a terminal. Not a website themed like a terminal — a terminal that happens to be a website.

### Design Pillars

1. **Terminal-native interaction** — navigation feels like a filesystem, not a navbar. `~/products/brain-dump` not "Products > Brain Dump". Command-line-style breadcrumbs. Typing cursor on headers.
2. **ASCII-first layout language** — box-drawing characters (`┌─┐│└─┘━═`) for cards and containers instead of CSS borders. Section dividers are `═══` not `<hr>`. Tables use proper ASCII table drawing.
3. **Boot sequence** — first visit shows a 2-3 second boot animation (fast, skippable). Repeat visitors skip it (localStorage flag). Sets the tone immediately: this is not a generic indie studio site.
4. **Scanlines + CRT curvature** — carried from current site but refined. Subtle barrel distortion on the viewport edge. Scanlines stay.
5. **No stock imagery** — product screenshots in CRT monitor frames. ASCII art for decorative elements. The header images already exist in the project folder.
6. **Interactive product pages** — each product page has a "terminal preview" section where users see actual app output rendered as terminal text (Brain Dump's terminal output, Rift's command output). Not screenshots of terminals — actual styled text.
7. **Comments as terminal I/O** — comments render as `user@abyssal-arts:~$ <comment>` with responses as stdout. The comment form is a terminal input line.

### What This Is NOT

- Not a portfolio template with dark mode toggled on
- Not Material Design with amber tokens swapped in
- Not a gaming/cyberpunk aesthetic (no neon, no glitch effects, no animated grids)
- Not retro for retro's sake — the terminal aesthetic is functional, not nostalgic

---

## Stack Decisions

| Layer | Choice | Why |
|---|---|---|
| **Framework** | SvelteKit | Already in the Tauri/AIDE stack. SSR + API routes + static prerender in one framework |
| **Auth** | Lucia Auth v3 | Svelte-native, session-based, no vendor lock-in. Email/password + GitHub OAuth |
| **Database** | Turso (libSQL) | SQLite-compatible, edge-deployed, generous free tier (9GB, 500M reads/mo). `@libsql/client` |
| **Payments** | Stripe Checkout | One-time purchase for Rift. Webhook → license key generation. No subscription billing needed |
| **Hosting** | Fly.io | Free tier (3 shared VMs). `adapter-node` for SvelteKit. Close to Turso edge nodes |
| **DNS** | Keep Cloudflare | Already managing abyssal-arts.com DNS. Point A record from GitHub Pages → Fly.io |
| **Images** | Local assets | Headers, icons already in project folder. No CDN needed at this scale |
| **Comments** | Custom (DB table) | Accounts already exist for license management — comments are just another table. No third-party |
| **Feedback** | `/feedback` route | Dedicated form → DB table. Simpler than comments, structured fields (product, type, body) |

---

## Data Model (Turso/SQLite)

```sql
-- Users (Lucia Auth managed)
users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  hashed_password TEXT,
  github_id TEXT UNIQUE,
  created_at INTEGER NOT NULL,
  avatar_url TEXT
)

-- Lucia sessions
sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  expires_at INTEGER NOT NULL
)

-- License keys (Rift + future products)
licenses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  product TEXT NOT NULL,          -- 'rift', future products
  license_key TEXT UNIQUE NOT NULL,
  stripe_payment_id TEXT,
  device_count INTEGER DEFAULT 0,
  max_devices INTEGER DEFAULT 3,
  created_at INTEGER NOT NULL,
  revoked INTEGER DEFAULT 0
)

-- Comments
comments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  product TEXT NOT NULL,          -- 'brain-dump', 'rift', etc.
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  edited_at INTEGER,
  parent_id TEXT REFERENCES comments(id)  -- threaded replies
)

-- Feedback
feedback (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),  -- nullable for anonymous
  product TEXT NOT NULL,
  type TEXT NOT NULL,              -- 'bug', 'feature', 'general'
  body TEXT NOT NULL,
  email TEXT,                      -- if not logged in
  created_at INTEGER NOT NULL
)
```

---

## Route Map

```
/                         → Home (hero + philosophy + product grid)
/products/brain-dump      → BD landing page (features, screenshots, Play Store link)
/products/rift            → Rift landing page (GUI showcase, purchase button)
/products/anchor          → Anchor page (coming soon state)
/products/aethergard      → Aethergard page (coming soon state)
/about                    → Studio story, team, philosophy
/feedback                 → Feedback form (product selector + type + body)
/privacy                  → Global privacy policy
/privacy/brain-dump       → BD-specific privacy policy (migrate existing)
/privacy/rift             → Rift privacy policy

/auth/login               → Login form
/auth/register            → Registration form
/auth/callback/github     → GitHub OAuth callback

/account                  → User dashboard
/account/licenses         → License keys + download links
/account/settings         → Email, password, avatar

/api/auth/*               → Lucia auth endpoints
/api/stripe/webhook       → Stripe webhook handler
/api/comments             → CRUD for comments
/api/feedback             → POST for feedback
/api/license/validate     → Rift app calls this to validate license key
```

---

## License Key Flow (Rift)

```
1. User creates account at abyssal-arts.com
2. User navigates to /products/rift → clicks "Buy" ($X.XX)
3. Stripe Checkout session created (SvelteKit API route)
4. User completes payment on Stripe-hosted page
5. Stripe fires webhook → /api/stripe/webhook
6. Webhook handler:
   a. Verifies Stripe signature
   b. Generates license key (UUID-based, formatted: RIFT-XXXX-XXXX-XXXX-XXXX)
   c. Inserts into licenses table linked to user_id
   d. Sends confirmation email with key (or just shows in /account/licenses)
7. User installs Rift → first launch asks for license key
8. Rift app calls /api/license/validate with key
   a. Server checks: key exists, not revoked, device_count < max_devices
   b. On success: increments device_count, returns { valid: true }
   c. On failure: returns { valid: false, reason: "..." }
9. Rift stores validation locally — re-validates on major version updates only
```

### Anti-Piracy (Pragmatic, Not Paranoid)

- License key + account lock = sharing requires sharing your account credentials
- 3-device limit prevents casual mass-distribution
- No always-online DRM — Rift validates once, works offline after
- No obfuscation theater — if someone cracks it, they weren't going to pay anyway
- Focus on making the product worth buying, not impossible to steal

### Download Delivery (Decided 2026-05-01)

Rift binary (~40MB) stays on the **private GitHub repo** as a release asset. Downloads are served through a SvelteKit API proxy — the user never sees a GitHub URL.

```
/api/download/rift  (GET, authenticated)
  1. Verify user session (Lucia)
  2. Verify user has valid, non-revoked license for 'rift'
  3. Fetch latest release asset from GitHub API (fine-grained PAT, scoped to repo releases)
  4. Stream binary to user (pipe, no temp storage on Fly.io)
  5. Log download (license_id, version, timestamp) for device-count tracking
```

Why this works:
- Repo stays private — code + binary protected
- Download requires auth + valid license — no public URLs to share
- GitHub hosts the binary for free (2GB limit per asset, Rift is 40MB)
- Download logging = device tracking for free
- PAT stored as Fly.io env var, scoped to releases-only (minimal permissions)

---

## Build Phases

### Phase 1 — Scaffold + Product Pages (1-2 sessions)
**Goal:** SvelteKit project with the terminal aesthetic, home page, BD landing page, Rift page. No auth, no backend. Static deploy to verify the design works.

- [ ] `npm create svelte@latest` with TypeScript
- [ ] Port CSS variables, scanlines, CRT effects from current `index.html`
- [ ] Build the layout system: ASCII box-drawing components, terminal breadcrumbs
- [ ] Boot sequence component (localStorage skip for repeat visitors)
- [ ] Home page: hero + philosophy + product grid (port from current site)
- [ ] `/products/brain-dump` — features, screenshots in CRT frames, Play Store link
- [ ] `/products/rift` — GUI showcase, feature list, "Buy" button (placeholder until Phase 3)
- [ ] `/about` — studio story from ABYSSAL_ARTS_BRAND.md
- [ ] `/privacy` + `/privacy/brain-dump` — migrate existing privacy page
- [ ] Responsive: mobile-first, single breakpoint at 600px (carry from current)
- [ ] Deploy to Fly.io (adapter-node) or verify static build works
- [ ] Visual QA: does it feel like "a terminal that happens to be a website"?

**Acceptance:** Home + 2 product pages + about + privacy render correctly. The aesthetic is distinct — not a generic dark-theme portfolio.

### Phase 2 — Auth + Account System (1 session)
**Goal:** Users can register, log in, see their account dashboard.

- [ ] Set up Turso database + `@libsql/client`
- [ ] Install + configure Lucia Auth v3
- [ ] Create users + sessions tables
- [ ] `/auth/register` — email/password registration
- [ ] `/auth/login` — email/password login
- [ ] `/auth/callback/github` — GitHub OAuth (optional identity)
- [ ] `/account` — user dashboard (empty for now — "no licenses yet")
- [ ] `/account/settings` — change email, password
- [ ] Session management: secure cookies, CSRF protection
- [ ] Terminal-styled auth forms (input fields look like terminal prompts)

**Acceptance:** Full register → login → dashboard → logout flow works. Sessions persist across page loads.

### Phase 3 — Stripe + License Keys (1 session)
**Goal:** Users can purchase Rift and receive a license key.

- [ ] Stripe account setup (if not already done)
- [ ] Create Rift product + price in Stripe dashboard
- [ ] `/api/stripe/checkout` — creates Checkout session, redirects to Stripe
- [ ] `/api/stripe/webhook` — handles `checkout.session.completed`
- [ ] License key generation (RIFT-XXXX-XXXX-XXXX-XXXX format)
- [ ] licenses table + insert on webhook
- [ ] `/account/licenses` — shows purchased licenses + download links
- [ ] `/api/license/validate` — Rift app validation endpoint
- [ ] Stripe webhook signature verification (security-critical)
- [ ] Test end-to-end: register → buy → receive key → validate key

**Acceptance:** Complete purchase flow works with Stripe test mode. License key appears in account dashboard. Validation endpoint returns correct responses.

### Phase 4 — Comments + Feedback (1 session)
**Goal:** Users can comment on product pages and submit feedback.

- [ ] comments table + CRUD API routes
- [ ] Comment component: terminal I/O styled (`user@abyssal:~$ comment text`)
- [ ] Threaded replies (parent_id, 1 level deep max for v1)
- [ ] Comment form: terminal input line at bottom of product page
- [ ] Basic moderation: logged-in users only, edit own comments, delete own comments
- [ ] `/feedback` — structured form (product selector, type dropdown, body textarea)
- [ ] feedback table + POST API route
- [ ] Email notification to admin on new feedback (optional — or just check DB)
- [ ] Rate limiting: prevent comment spam (simple IP + user-based throttle)

**Acceptance:** Comments appear on product pages. Feedback form submits successfully. Only logged-in users can comment.

### Phase 5 — Deploy + DNS Cutover (½ session)
**Goal:** Live on abyssal-arts.com, replacing the GitHub Pages site.

- [ ] Final Fly.io deployment with production env vars
- [ ] Turso production database (free tier)
- [ ] Stripe live mode keys (swap from test)
- [ ] Cloudflare DNS: A record from GitHub Pages IP → Fly.io app
- [ ] SSL/TLS verification
- [ ] Test all flows on production: register, login, browse, comment
- [ ] Old GitHub Pages site: archive the repo, don't delete (fallback)
- [ ] Monitor for 48 hours post-cutover

**Acceptance:** abyssal-arts.com serves the new SvelteKit site. All auth/purchase/comment flows work in production.

---

## Future (Not in This Build)

- Rift download hosting (where does the binary live? GitHub Releases? Fly.io volume? S3?)
- Email verification on registration (nice-to-have, not blocking)
- Admin dashboard for comment moderation + feedback triage
- Product announcement blog/changelog section
- Anchor / AIDE / Aethergard product pages (placeholder "coming soon" in Phase 1, full pages later)
- SEO optimization (meta tags, OG images, sitemap.xml)
- Analytics (privacy-respecting — Plausible or Umami self-hosted, if at all)

---

## Assets Available (in project folder)

| File | Purpose |
|---|---|
| `header_cinematic_4096x1000.png` | Wide cinematic header |
| `header_playstore_4096x2304.png` | Play Store style header |
| `header_website_4096x1400.png` | Website hero header |
| `logo.png` | Studio logo |
| `ABYSSAL_ARTS_BRAND.md` | Brand guide (voice, palette, typography, philosophy) |
| `braindump/privacy/` | Existing BD privacy policy |
| `CNAME` | Current domain mapping |

---

## Cost Breakdown

| Service | Free Tier | When It Costs |
|---|---|---|
| Fly.io | 3 shared VMs, 3GB volume | >3 VMs or >3GB |
| Turso | 9GB storage, 500M reads | >9GB or >500M reads |
| Stripe | $0 base | 2.9% + $0.30 per transaction |
| Cloudflare DNS | Free | Never (DNS is free tier) |
| Domain | Already owned | Annual renewal |
| **Total pre-revenue** | **$0/mo** | |

---

*Planned 2026-05-01 via /aegis --think. Stack: SvelteKit + Lucia Auth + Turso + Stripe + Fly.io. Design: "a terminal that happens to be a website." 5 phases, ~4.5 sessions estimated.*
