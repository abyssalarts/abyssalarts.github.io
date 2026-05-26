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
		name="RIFT"
		section="1"
		manual="Abyssal Arts Manual"
		description="a terminal that sees what your agents do"
	/>

	<div class="man-section" use:reveal>
		<h2 class="man-section-title">SYNOPSIS</h2>
		<div class="man-body">
			<code class="synopsis">rift [--project PATH] [--claude] [--panes LAYOUT]</code>
		</div>
	</div>

	<div class="man-section" use:reveal>
		<h2 class="man-section-title">DESCRIPTION</h2>
		<div class="man-body">
			<p>
				Most terminals show you text. Rift shows you what's happening — which agent
				touched which file, what hooks fired, where errors clustered, and how your
				filesystem changed over time. It's a terminal and an observability cockpit
				in one window.
			</p>
			<p>
				Built from scratch in Rust and Tauri with a Svelte 5 frontend. The terminal
				surface, process management, IPC layer, and event bus are all Rust. Not a
				wrapper — Rift owns the PTY.
			</p>
			<p>
				Every line of terminal output is classified into color-coded lanes: Claude,
				Agent, Hook, Aegis, OK, Warn, Err, Sys. Eight lanes, eight colors. You never
				squint at monochrome text to figure out who said what.
			</p>
			<p>
				The cockpit shows notification tabs with real-time badges — errors, hooks,
				agents, filesystem activity, git state, MCP tool traffic. Click a tab to
				inspect. Drag it to a side pane. Pop it out to a second monitor.
			</p>
			<p>
				AI integration is decoupled by design. Rift's core never speaks directly to
				any AI provider. Translators map external interfaces to Rift's internal event
				protocol. The cockpit works standalone and gets richer as integrations connect.
			</p>
		</div>
	</div>

	<div class="man-section" use:reveal>
		<h2 class="man-section-title">OPTIONS</h2>
		<div class="man-body">
			<div class="man-option">
				<span class="man-option-flag">--lanes</span>
				<span>Color-coded output lanes. 8 lane types — every line tagged by source at a glance.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--cockpit</span>
				<span>Live notification tabs with event streams, sparklines, and filesystem activity tree.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--bus</span>
				<span>Tokio broadcast event bus. 10K+ msg/s. External tools subscribe via IPC.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--mcp</span>
				<span>20 MCP tools for programmatic access — bus history, PTY I/O, git, DOM, screenshots.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--integrations</span>
				<span>Provider-agnostic. Aegis, Index, and custom translators plug in via Section 9 boundary.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--status</span>
				<span>v1.0 — open source (MIT). Cross-platform: Windows, macOS, Linux.</span>
			</div>
		</div>
	</div>

	<AsciiDivider />

	<div class="features-section" use:reveal>
		<div class="features-row">
			<FeatureTag label="Color-Coded Lanes" />
			<FeatureTag label="Rust + Tauri 2" />
			<FeatureTag label="Event Bus" />
			<FeatureTag label="20 MCP Tools" />
			<FeatureTag label="Cockpit" />
			<FeatureTag label="Open Source" />
		</div>
	</div>

	<div class="cta-section" use:reveal>
		<AsciiBox title="DOWNLOAD">
			<div class="cta-command">
				<span class="cta-prompt">$</span> install rift
			</div>
			<div class="cta-buy-row">
				<a class="buy-btn" href="https://github.com/Critek-creator/Rift_TerminalV2/releases/latest">
					> DOWNLOAD v1.0
				</a>
			</div>
			<div class="cta-response">
				<span class="cta-chevron">&gt;</span> free. open source (MIT). Windows / macOS / Linux.
			</div>
			<div class="cta-response">
				<span class="cta-chevron">&gt;</span> <a href="https://github.com/Critek-creator/Rift_TerminalV2" class="cta-link">view source on GitHub &rarr;</a>
			</div>
			<div class="cta-response">
				<span class="cta-chevron">&gt;</span> <a href="https://www.patreon.com/cw/AbyssalArtsDev" class="cta-link">support development on Patreon &rarr;</a>
			</div>
		</AsciiBox>
	</div>

	<div class="man-section" use:reveal>
		<CommentThread
			product="rift"
			initialComments={data.comments}
			user={$page.data.user ? { id: $page.data.user.id, username: $page.data.user.username } : null}
		/>
	</div>

	<div class="man-section" use:reveal>
		<h2 class="man-section-title">SEE ALSO</h2>
		<div class="man-body">
			<a href="/products/brain-dump" class="see-also-link">brain-dump(1)</a>,
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

	.cta-command {
		color: var(--amber);
		font-size: 15px;
		font-weight: 500;
		margin-bottom: 12px;
	}

	.cta-prompt {
		color: var(--text-secondary);
	}

	.cta-response {
		color: var(--text-body);
		font-size: 13px;
		margin-bottom: 4px;
	}

	.cta-chevron {
		color: var(--text-secondary);
	}

	.cta-link {
		color: var(--amber-dim);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.cta-link:hover {
		color: var(--amber);
	}

	.cta-error {
		color: var(--red);
	}

	.license-key {
		color: var(--amber);
		font-weight: 500;
		letter-spacing: 1px;
	}

	.status-active {
		color: var(--green);
	}

	.cta-buy-row {
		margin: 12px 0;
	}

	.buy-btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 14px;
		font-weight: 600;
		color: var(--bg);
		background: var(--amber);
		border: none;
		padding: 8px 24px;
		cursor: pointer;
		transition: background 0.3s ease, box-shadow 0.3s ease;
	}

	.buy-btn:hover:not(:disabled) {
		background: var(--amber-bright);
		box-shadow: 0 0 20px var(--glow);
	}

	.buy-btn:disabled {
		opacity: 0.6;
		cursor: wait;
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
