<script lang="ts">
	import ManPageHeader from '$lib/components/ManPageHeader.svelte';
	import AsciiBox from '$lib/components/AsciiBox.svelte';
	import AsciiDivider from '$lib/components/AsciiDivider.svelte';
	import FeatureTag from '$lib/components/FeatureTag.svelte';
	import CommentThread from '$lib/components/CommentThread.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="man-page">
	<ManPageHeader
		name="BRAIN-DUMP"
		section="1"
		manual="Abyssal Arts Manual"
		description="voice-first thought capture with AI categorization"
	/>

	<div class="man-section" use:reveal>
		<h2 class="man-section-title">SYNOPSIS</h2>
		<div class="man-body">
			<code class="synopsis">brain-dump [--voice] [--ai-categorize] [--export FORMAT]</code>
		</div>
	</div>

	<div class="man-section" use:reveal>
		<h2 class="man-section-title">DESCRIPTION</h2>
		<div class="man-body">
			<p>
				Brain Dump captures your thoughts before they disappear. Voice-first input,
				AI-powered categorization, and a visual Brain Web that maps how your ideas
				connect. No cloud. No accounts. No ads. $4.99, once.
			</p>
			<p>
				Speak your thoughts and Brain Dump transcribes and categorizes them automatically.
				The AI doesn't just file things away — it builds a web of connections between
				your ideas, surfacing patterns you'd miss in a flat list.
			</p>
			<p>
				The Brain Web is the core of the experience. Every thought you capture becomes a
				node. Related thoughts connect. Over time, you see the shape of your thinking —
				clusters of obsession, unexpected bridges between topics, the threads you keep
				returning to at 2am.
			</p>
			<p>
				Export to Obsidian when you're ready to build on an idea. Or Markdown. Or JSON.
				Or just keep everything in Brain Dump — it works entirely offline, stores
				everything locally, and never phones home.
			</p>
		</div>
	</div>

	<div class="man-section" use:reveal>
		<h2 class="man-section-title">OPTIONS</h2>
		<div class="man-body">
			<div class="man-option">
				<span class="man-option-flag">--offline</span>
				<span>Works entirely offline. Your data never leaves your device. (default: true)</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--privacy</span>
				<span>No analytics, no tracking, no cloud sync you didn't ask for. (default: enforced)</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--voice</span>
				<span>Voice-first capture. Speak, and it writes. AI handles the rest.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--ai-categorize</span>
				<span>Automatic categorization and connection mapping. On-device.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--export FORMAT</span>
				<span>Obsidian, Markdown, JSON, or local backup. Your data, your format.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--price</span>
				<span>$4.99. Once. Yours forever.</span>
			</div>
		</div>
	</div>

	<AsciiDivider />

	<div class="features-section" use:reveal>
		<div class="features-row">
			<FeatureTag label="Voice Capture" />
			<FeatureTag label="AI Categorization" />
			<FeatureTag label="Brain Web" />
			<FeatureTag label="Obsidian Export" />
			<FeatureTag label="Offline-First" />
			<FeatureTag label="Privacy-First" />
		</div>
	</div>

	<div class="cta-section" use:reveal>
		<AsciiBox title="INSTALL">
			<a
				href="https://play.google.com/store/apps/dev?id=4852489077865221589"
				target="_blank"
				rel="noopener"
				class="cta-link"
			>
				<span class="cta-prompt">$</span> install brain-dump
			</a>
			<div class="cta-hint">Available on Google Play — $4.99, one-time purchase</div>
		</AsciiBox>
	</div>

	<div class="man-section" use:reveal>
		<CommentThread
			product="brain-dump"
			initialComments={data.comments}
			user={$page.data.user ? { id: $page.data.user.id, username: $page.data.user.username } : null}
		/>
	</div>

	<div class="man-section" use:reveal>
		<h2 class="man-section-title">SEE ALSO</h2>
		<div class="man-body">
			<a href="/products/rift" class="see-also-link">rift(1)</a>,
			anchor(1)
		</div>
	</div>
</div>

<style>
	.man-page {
		padding: 40px 0 80px;
	}

	.man-section {
		margin-bottom: 32px;
	}

	.man-section-title {
		font-size: 13px;
		font-weight: 700;
		color: var(--amber);
		letter-spacing: 1px;
		margin-bottom: 8px;
		text-transform: uppercase;
	}

	.man-body {
		padding-left: 24px;
		color: var(--text-body);
		line-height: 1.8;
		font-size: 13px;
		font-weight: 300;
	}

	.man-body p {
		margin-bottom: 16px;
	}

	.man-body p:last-child {
		margin-bottom: 0;
	}

	.synopsis {
		color: var(--amber-dim);
		font-size: 13px;
		background: none;
		padding: 0;
	}

	.man-option {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 8px;
		margin-bottom: 12px;
		font-size: 13px;
	}

	.man-option-flag {
		color: var(--amber-dim);
		font-weight: 500;
	}

	.features-section {
		margin: 32px 0;
	}

	.features-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.cta-section {
		margin: 40px 0;
	}

	.cta-link {
		display: block;
		color: var(--amber);
		text-decoration: none;
		font-size: 15px;
		font-weight: 500;
		margin-bottom: 8px;
		transition: text-shadow 0.3s ease;
	}

	.cta-link:hover {
		text-shadow: 0 0 20px var(--glow);
	}

	.cta-prompt {
		color: var(--text-secondary);
	}

	.cta-hint {
		font-size: 11px;
		color: var(--text-secondary);
	}

	.see-also-link {
		color: var(--amber-dim);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.see-also-link:hover {
		color: var(--amber);
	}

	@media (max-width: 600px) {
		.man-option {
			grid-template-columns: 1fr;
			gap: 2px;
		}

		.man-option-flag {
			font-size: 12px;
		}
	}
</style>
