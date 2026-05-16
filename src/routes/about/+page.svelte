<script lang="ts">
	import AsciiBox from '$lib/components/AsciiBox.svelte';
	import AsciiDivider from '$lib/components/AsciiDivider.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="about-section" use:reveal>
	<h1 class="page-title">About</h1>
	<p class="page-subtitle">Who we are, what we build, and why.</p>
</section>

<AsciiDivider label="Who We Are" />

<section class="about-section" use:reveal>
	<p class="body-text">
		Abyssal Arts is a solo Android development studio founded by Garth, based in
		Florida. Rachel handles social media and community outreach. That's the whole team.
	</p>
	<p class="body-text">
		The name comes from the deep end — the place where the mind goes when it's 2am and
		the world is quiet and the thoughts are too honest to say out loud. Abyssal Arts
		builds tools for people who live there.
	</p>
</section>

<AsciiDivider label="What We Build" />

<section class="about-section" use:reveal>
	<p class="body-text">
		Privacy-first Android apps and developer tools. Every product is built because it
		needed to exist — not because a market gap was identified, not because a trend was
		chased, not because a VC asked for it.
	</p>
</section>

<AsciiDivider label="Why We Build" />

<section class="about-section" use:reveal>
	<p class="body-text highlight">Because the app ecosystem is broken.</p>
	<p class="body-text">
		Most apps exist to extract — attention, data, money, all three. They wrap
		surveillance in convenience and call it a feature. They A/B test your willpower.
		They turn your focus into someone else's revenue.
	</p>
	<p class="body-text">
		Abyssal Arts exists because someone should be building the other thing.
	</p>
	<p class="body-text">
		Apps that work offline. Apps that don't phone home. Apps that charge once and then
		leave you alone. Apps built by someone who actually uses them, for people who
		actually need them.
	</p>
	<p class="body-text highlight">Privacy isn't a feature. It's the foundation.</p>
</section>

<AsciiDivider label="How We Build" />

<section class="about-section" use:reveal>
	<ul class="principle-list">
		<li><span class="marker">></span> One-time purchases over subscriptions</li>
		<li><span class="marker">></span> No ads. Ever.</li>
		<li><span class="marker">></span> No dark patterns</li>
		<li><span class="marker">></span> Neurodivergent by default</li>
		<li><span class="marker">></span> Technical accuracy over marketing polish</li>
	</ul>
</section>

<AsciiDivider />

<section class="about-section" use:reveal>
	<AsciiBox variant="double">
		<p class="quote">
			"When you build something at 2am because it needed to exist, you don't
			need a business plan. You need a compiler."
		</p>
		<p class="quote-attribution">— Abyssal Arts</p>
	</AsciiBox>
</section>

<style>
	.about-section {
		margin-bottom: 16px;
	}

	.page-title {
		font-size: clamp(24px, 5vw, 36px);
		font-weight: 600;
		color: var(--amber);
		text-shadow: 0 0 20px var(--glow);
		margin-bottom: 12px;
	}

	.page-subtitle {
		font-size: 13px;
		color: var(--text-secondary);
		letter-spacing: 0.5px;
	}

	.body-text {
		font-size: 14px;
		font-weight: 300;
		color: var(--text-body);
		line-height: 1.9;
		margin-bottom: 16px;
	}

	.body-text.highlight {
		color: var(--amber);
		font-weight: 500;
	}

	.body-text em {
		color: var(--amber-dim);
		font-style: normal;
	}

	.principle-list {
		list-style: none;
		padding: 0;
	}

	.principle-list li {
		font-size: 14px;
		color: var(--text-body);
		padding: 8px 0;
		border-bottom: 1px solid var(--amber-faint);
		display: flex;
		gap: 12px;
		align-items: baseline;
	}

	.principle-list li:last-child {
		border-bottom: none;
	}

	.marker {
		color: var(--amber-dim);
		font-weight: 600;
	}

	.quote {
		font-size: 14px;
		color: var(--amber-dim);
		font-style: italic;
		line-height: 1.8;
		margin-bottom: 8px;
	}

	.quote-attribution {
		font-size: 12px;
		color: var(--text-secondary);
		text-align: right;
	}
</style>
