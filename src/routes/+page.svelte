<script lang="ts">
	import CursorBlink from '$lib/components/CursorBlink.svelte';
	import AsciiDivider from '$lib/components/AsciiDivider.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<!-- ═══ HERO ═══ -->
<section class="hero">
	<div class="hero-content">
		<div class="hero-label">Android Studio</div>
		<h1 class="hero-title">Abyssal Arts<CursorBlink /></h1>
		<p class="hero-sub">
			Privacy-first Android apps and developer tools. No ads. No subscriptions. No data harvesting.
			Built because they needed to exist.
		</p>
		<p class="hero-tagline">"Built from the deep end — for the ones who live there."</p>
		<a href="#products" class="hero-cta">Explore Products</a>
	</div>
	<div class="scroll-hint">
		<span>scroll</span>
		<div class="scroll-line"></div>
	</div>
</section>

<AsciiDivider />

<!-- ═══ PHILOSOPHY ═══ -->
<section id="philosophy" class="philosophy" use:reveal>
	<div class="section-header" use:reveal>
		<span class="section-marker">01</span>
		<div class="section-line"></div>
		<h2 class="section-title">Philosophy</h2>
	</div>

	<div class="principle" use:reveal>
		<div class="principle-title">Privacy is the foundation, not a feature.</div>
		<p class="principle-body">
			Your data stays on your device unless you explicitly choose otherwise.
			No analytics. No tracking. No cloud sync you didn't ask for.
		</p>
	</div>

	<div class="principle" use:reveal>
		<div class="principle-title">One-time purchases over subscriptions.</div>
		<p class="principle-body">
			If the app works offline and doesn't cost us server time, why would we charge you
			monthly? You buy it. It's yours.
		</p>
	</div>

	<div class="principle" use:reveal>
		<div class="principle-title">No ads. Ever.</div>
		<p class="principle-body">Not at launch. Not "for now." Not with an opt-out. Never.</p>
	</div>

	<div class="principle" use:reveal>
		<div class="principle-title">Neurodivergent by default.</div>
		<p class="principle-body">
			These tools aren't "accessible" as an afterthought — they're built by a
			neurodivergent developer for neurodivergent users. The UX accounts for executive
			dysfunction, sensory sensitivity, and brains that don't work the way textbooks
			say they should.
		</p>
	</div>

	<div class="principle" use:reveal>
		<div class="principle-title">No dark patterns.</div>
		<p class="principle-body">
			No fake urgency. No guilt-trip modals. No engagement metrics disguised as features.
			No "are you SURE you want to leave?"
		</p>
	</div>
</section>

<AsciiDivider />

<!-- ═══ PRODUCTS ═══ -->
<section id="products" class="products" use:reveal>
	<div class="section-header" use:reveal>
		<span class="section-marker">02</span>
		<div class="section-line"></div>
		<h2 class="section-title">Products</h2>
	</div>

	<div use:reveal>
		<ProductCard
			name="Brain Dump"
			price="$4.99 — one-time purchase"
			status="live"
			description="Voice-first thought capture with AI-powered categorization and a visual Brain Web that maps how your ideas connect. Captures thoughts before they disappear. Exports to Obsidian, Markdown, JSON, or local backup. No cloud. No accounts."
			features={['Voice Capture', 'AI Categorization', 'Brain Web', 'Obsidian Export', 'Offline-First', 'Privacy-First']}
			href="/products/brain-dump"
		/>
	</div>

	<div use:reveal>
		<ProductCard
			name="Rift"
			price="Coming soon"
			status="dev"
			description="A terminal-aesthetic development environment built on Rust, Tauri, and Svelte. Claude Code integration, modular pane system, skills marketplace. The IDE that improves itself."
			features={['Terminal Aesthetic', 'Claude Code Integration', 'Pane System', 'Skills Marketplace', 'Self-Healing Hooks']}
			href="/products/rift"
		/>
	</div>
</section>

<AsciiDivider />

<!-- ═══ ABOUT TEASER ═══ -->
<section id="about" class="about" use:reveal>
	<div class="section-header" use:reveal>
		<span class="section-marker">03</span>
		<div class="section-line"></div>
		<h2 class="section-title">About</h2>
	</div>

	<p class="about-text" use:reveal>
		Abyssal Arts is a solo Android development studio based in Florida. One developer. No
		office. No investors. No pressure to grow for growth's sake.
	</p>

	<p class="about-text" use:reveal>
		The name comes from the deep end — the place where the mind goes when it's quiet and
		the thoughts are too honest to say out loud. Every app in this catalog is built there,
		at hours most people are asleep, by someone who needed these tools to exist and got
		tired of waiting for someone else to build them.
	</p>

	<p class="about-text" use:reveal>
		The app ecosystem is broken. Most apps exist to extract — attention, data, money, all
		three. They wrap surveillance in convenience and call it a feature. Abyssal Arts exists
		because <em>someone should be building the other thing.</em>
	</p>

	<p class="about-link" use:reveal>
		<a href="/about">Read more &rarr;</a>
	</p>
</section>

<AsciiDivider />

<!-- ═══ CONTACT ═══ -->
<section id="contact" class="contact" use:reveal>
	<div class="section-header section-header-center" use:reveal>
		<span class="section-marker">04</span>
		<div class="section-line section-line-short"></div>
		<h2 class="section-title">Contact</h2>
		<div class="section-line section-line-short"></div>
	</div>

	<p class="contact-prompt" use:reveal>Feedback, bug reports, or just want to say hello.</p>

	<div use:reveal>
		<a href="mailto:abyssalarts.dev@gmail.com" class="contact-email">abyssalarts.dev@gmail.com</a>
	</div>

	<div class="contact-links" use:reveal>
		<a href="https://github.com/abyssalarts" class="contact-link" target="_blank" rel="noopener">GitHub</a>
		<a href="https://play.google.com/store/apps/dev?id=4852489077865221589" class="contact-link" target="_blank" rel="noopener">Play Store</a>
	</div>
</section>

<!-- ═══ FOOTER ═══ -->
<footer>
	<div class="footer-text">&copy; 2026 Abyssal Arts</div>
	<div class="footer-tagline">"Built from the deep end — for the ones who live there."</div>
</footer>

<style>
	/* ═══ HERO ═══ */
	.hero {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		padding: 0;
	}

	.hero-content {
		padding: 0;
	}

	.hero-label {
		font-size: 11px;
		letter-spacing: 4px;
		text-transform: uppercase;
		color: var(--text-secondary);
		margin-bottom: 24px;
		opacity: 0;
		animation: fadeUp 0.8s ease-out 0.2s forwards;
	}

	.hero-title {
		font-size: clamp(32px, 6vw, 56px);
		font-weight: 700;
		color: var(--amber);
		line-height: 1.15;
		margin-bottom: 32px;
		text-shadow: 0 0 30px var(--glow), 0 0 60px rgba(212, 137, 10, 0.08);
		opacity: 0;
		animation: fadeUp 0.8s ease-out 0.4s forwards;
	}

	.hero-sub {
		font-size: 15px;
		font-weight: 300;
		color: var(--text-body);
		max-width: 520px;
		margin-bottom: 48px;
		opacity: 0;
		animation: fadeUp 0.8s ease-out 0.6s forwards;
	}

	.hero-tagline {
		font-size: 12px;
		color: var(--amber-dim);
		font-style: italic;
		letter-spacing: 0.5px;
		opacity: 0;
		animation: fadeUp 0.8s ease-out 0.8s forwards;
	}

	.scroll-hint {
		position: absolute;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		opacity: 0;
		animation: fadeUp 0.8s ease-out 1.2s forwards;
	}

	.scroll-hint span {
		font-size: 10px;
		letter-spacing: 3px;
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.scroll-line {
		width: 1px;
		height: 32px;
		background: linear-gradient(to bottom, var(--amber-dim), transparent);
		animation: scrollPulse 2s ease-in-out infinite;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes scrollPulse {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 0.7; }
	}

	/* ═══ SECTION HEADERS ═══ */
	.section-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 40px;
	}

	.section-header-center {
		justify-content: center;
	}

	.section-marker {
		font-size: 11px;
		color: var(--amber-dim);
		letter-spacing: 2px;
		white-space: nowrap;
	}

	.section-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(to right, var(--amber-faint), transparent);
	}

	.section-line-short {
		max-width: 60px;
	}

	.section-title {
		font-size: 22px;
		font-weight: 600;
		color: var(--amber);
		text-shadow: 0 0 20px var(--glow);
	}

	/* ═══ SECTIONS ═══ */
	section {
		padding: 80px 0;
		scroll-margin-top: 48px;
	}

	.philosophy {
		border-top: 1px solid var(--amber-dim);
		background: var(--surface);
	}

	.products {
		border-top: 1px solid var(--amber-dim);
	}

	.about {
		border-top: 1px solid var(--amber-dim);
		background: var(--surface);
	}

	.contact {
		border-top: 1px solid var(--amber-dim);
	}

	/* ═══ HERO CTA ═══ */
	.hero-cta {
		display: inline-block;
		font-size: 11px;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--amber);
		text-decoration: none;
		padding: 12px 24px;
		border: 1px solid var(--amber-dim);
		margin-top: 32px;
		transition: background 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out;
		text-shadow: 0 0 15px var(--glow);
		opacity: 0;
		animation: fadeUp 0.8s ease-out 1.0s forwards;
	}

	.hero-cta:hover {
		background: rgba(212, 137, 10, 0.08);
		border-color: var(--amber);
		box-shadow: 0 0 20px rgba(212, 137, 10, 0.1);
	}

	/* ═══ PHILOSOPHY ═══ */

	.principle {
		margin-bottom: 36px;
		padding-left: 20px;
		border-left: 2px solid var(--amber-faint);
		transition: border-color 0.3s ease;
	}

	.principle:hover {
		border-left-color: var(--amber-dim);
	}

	.principle-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--amber);
		margin-bottom: 8px;
	}

	.principle-body {
		font-size: 13px;
		font-weight: 300;
		color: var(--text-body);
		line-height: 1.8;
	}

	/* ═══ ABOUT ═══ */
	.about-text {
		font-size: 13px;
		font-weight: 300;
		color: var(--text-body);
		line-height: 1.9;
		margin-bottom: 20px;
	}

	.about-text em {
		color: var(--amber-dim);
		font-style: normal;
	}

	.about-link {
		margin-top: 8px;
	}

	.about-link a {
		font-size: 13px;
		color: var(--amber-dim);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.about-link a:hover {
		color: var(--amber);
	}

	/* ═══ CONTACT ═══ */
	.contact {
		text-align: center;
		padding-bottom: 120px;
	}

	.contact-prompt {
		font-size: 13px;
		color: var(--text-body);
		margin-bottom: 24px;
	}

	.contact-email {
		display: inline-block;
		font-size: 15px;
		color: var(--amber);
		text-decoration: none;
		padding: 12px 28px;
		border: 1px solid var(--amber-dim);
		transition: all 0.3s ease;
		text-shadow: 0 0 15px var(--glow);
	}

	.contact-email:hover {
		background: rgba(212, 137, 10, 0.08);
		border-color: var(--amber);
		box-shadow: 0 0 20px rgba(212, 137, 10, 0.1);
	}

	.contact-links {
		margin-top: 32px;
		display: flex;
		justify-content: center;
		gap: 32px;
	}

	.contact-link {
		font-size: 11px;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.contact-link:hover {
		color: var(--amber-dim);
	}

	/* ═══ FOOTER ═══ */
	footer {
		text-align: center;
		padding: 40px 24px;
		border-top: 1px solid var(--amber-faint);
	}

	.footer-text {
		font-size: 11px;
		color: var(--text-secondary);
		letter-spacing: 1px;
	}

	.footer-tagline {
		font-size: 11px;
		color: var(--amber-dim);
		font-style: italic;
		margin-top: 8px;
	}

	/* ═══ RESPONSIVE ═══ */
	@media (max-width: 600px) {
		section {
			padding: 60px 0;
		}

		.contact-links {
			flex-direction: column;
			gap: 16px;
		}
	}
</style>
