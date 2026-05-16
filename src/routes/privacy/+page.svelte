<script lang="ts">
	import AsciiBox from '$lib/components/AsciiBox.svelte';
	import AsciiDivider from '$lib/components/AsciiDivider.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="privacy-section" use:reveal>
	<h1 class="page-title">Privacy Policy</h1>
	<p class="page-subtitle">abyssal-arts.com</p>
	<p class="updated">Last updated: May 2026</p>
</section>

<AsciiDivider label="The Short Version" />

<section class="privacy-section" use:reveal>
	<AsciiBox title="TL;DR">
		<p class="highlight-text">
			This website collects nothing. No cookies. No analytics. No tracking pixels.
			No fingerprinting. No third-party scripts that phone home.
		</p>
	</AsciiBox>
</section>

<AsciiDivider label="What We Store" />

<section class="privacy-section" use:reveal>
	<ul class="data-list">
		<li>
			<span class="marker">1.</span>
			<span>A <code>localStorage</code> flag to remember if you've seen the boot sequence. That's it. It never leaves your browser.</span>
		</li>
		<li>
			<span class="marker">2.</span>
			<span>When accounts launch, we'll store: email, username, hashed password, and session cookies. Nothing else. This policy will be updated then.</span>
		</li>
	</ul>
</section>

<AsciiDivider label="Third Parties" />

<section class="privacy-section" use:reveal>
	<ul class="data-list">
		<li>
			<span class="check">></span>
			<span><strong>Google Fonts</strong> (JetBrains Mono) — loaded on page visit. Google's privacy policy applies to the font request.</span>
		</li>
		<li>
			<span class="marker dim">_</span>
			<span class="dim">That's the entire list.</span>
		</li>
	</ul>
</section>

<AsciiDivider label="Your Data" />

<section class="privacy-section" use:reveal>
	<p class="body-text">
		There is no data. We don't have it. We can't sell it, share it, or lose it
		because it doesn't exist.
	</p>
</section>

<AsciiDivider label="Contact" />

<section class="privacy-section" use:reveal>
	<p class="body-text">
		Questions about this policy:
		<a href="mailto:abyssalarts.dev@gmail.com">abyssalarts.dev@gmail.com</a>
	</p>
</section>

<AsciiDivider label="Product Policies" />

<section class="privacy-section" use:reveal>
	<p class="body-text">
		Product-specific privacy policies with more detail:
	</p>
	<ul class="link-list">
		<li><a href="/privacy/brain-dump">Brain Dump Privacy Policy</a></li>
	</ul>
</section>

<style>
	.privacy-section {
		margin-bottom: 16px;
	}

	.page-title {
		font-size: clamp(24px, 5vw, 36px);
		font-weight: 600;
		color: var(--amber);
		text-shadow: 0 0 20px var(--glow);
		margin-bottom: 8px;
	}

	.page-subtitle {
		font-size: 13px;
		color: var(--text-secondary);
		letter-spacing: 0.5px;
		margin-bottom: 4px;
	}

	.updated {
		font-size: 11px;
		color: var(--amber-faint);
		letter-spacing: 2px;
		text-transform: uppercase;
	}

	.highlight-text {
		font-size: 14px;
		color: var(--amber);
		line-height: 1.8;
	}

	.body-text {
		font-size: 14px;
		font-weight: 300;
		color: var(--text-body);
		line-height: 1.8;
		margin-bottom: 12px;
	}

	.body-text a {
		color: var(--amber);
		text-decoration: none;
	}

	.body-text a:hover {
		text-decoration: underline;
	}

	.data-list {
		list-style: none;
		padding: 0;
	}

	.data-list li {
		font-size: 13px;
		color: var(--text-body);
		padding: 10px 0;
		border-bottom: 1px solid var(--amber-faint);
		display: flex;
		gap: 12px;
		align-items: baseline;
		line-height: 1.8;
	}

	.data-list li:last-child {
		border-bottom: none;
	}

	.marker {
		color: var(--amber-dim);
		font-weight: 600;
		flex-shrink: 0;
	}

	.check {
		color: var(--amber);
		font-weight: 600;
		flex-shrink: 0;
	}

	.dim {
		color: var(--text-secondary);
	}

	code {
		font-family: inherit;
		color: var(--amber-dim);
		background: var(--surface);
		padding: 1px 6px;
		border: 1px solid var(--amber-faint);
		font-size: 12px;
	}

	strong {
		color: var(--amber-dim);
		font-weight: 500;
	}

	.link-list {
		list-style: none;
		padding: 0;
	}

	.link-list li {
		padding: 6px 0;
	}

	.link-list a {
		font-size: 13px;
		color: var(--amber);
		text-decoration: none;
	}

	.link-list a:hover {
		text-decoration: underline;
	}
</style>
