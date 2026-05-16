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
	let purchasing = $state(false);
	let error = $state('');

	async function buyRift() {
		purchasing = true;
		error = '';
		try {
			const res = await fetch('/api/stripe/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ product: 'rift' })
			});
			const json = await res.json();
			if (!res.ok) {
				error = json.error || 'Checkout failed';
				return;
			}
			if (json.url) {
				window.location.href = json.url;
				return;
			}
			error = 'No checkout URL returned';
		} catch {
			error = 'Network error — try again';
		} finally {
			purchasing = false;
		}
	}
</script>

<div class="man-page">
	<ManPageHeader
		name="RIFT"
		section="1"
		manual="Abyssal Arts Manual"
		description="terminal-aesthetic development environment"
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
				Rift is not another Electron wrapper with a dark theme bolted on. It's a
				terminal-native development environment built from scratch in Rust and Tauri,
				with a Svelte 5 frontend that actually belongs there.
			</p>
			<p>
				The backend is Rust. Not "Rust for the hot path and JavaScript for everything
				else" — Rust. The terminal surface, the process management, the IPC layer, the
				hook system. Native performance because the language delivers it, not because
				someone optimized around a runtime that shouldn't be there.
			</p>
			<p>
				Claude Code integration is built into the workflow. Not a chat sidebar grafted
				onto an editor — a first-class citizen with session management, skills dispatch,
				and an agent observation layer that shows you what the AI is actually doing.
			</p>
			<p>
				The pane system is modular. Split, pop out to a separate window, rearrange,
				save layouts. Your workspace reflects how you think, not how the IDE designer
				thought you should think.
			</p>
			<p>
				A skills marketplace lets the community extend the IDE. Install tools, share
				configurations, build on each other's work. Self-healing hooks watch your code
				quality and learn from your patterns — enforcement that adapts instead of
				annoying.
			</p>
		</div>
	</div>

	<div class="man-section" use:reveal>
		<h2 class="man-section-title">OPTIONS</h2>
		<div class="man-body">
			<div class="man-option">
				<span class="man-option-flag">--performance</span>
				<span>Native Rust backend. No Electron. No compromise. (default: fast)</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--ai</span>
				<span>Claude Code integration built-in, not bolted on. Sessions, skills, agent observability.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--panes LAYOUT</span>
				<span>Modular split panes with pop-out and multi-window support.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--marketplace</span>
				<span>Community skills marketplace. Install, share, extend.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--hooks</span>
				<span>Self-healing hooks. Code quality enforcement that learns your patterns.</span>
			</div>
			<div class="man-option">
				<span class="man-option-flag">--status</span>
				<span>Pre-alpha. Building in public. Shipping when it's ready, not when it's scheduled.</span>
			</div>
		</div>
	</div>

	<AsciiDivider />

	<div class="features-section" use:reveal>
		<div class="features-row">
			<FeatureTag label="Terminal Aesthetic" />
			<FeatureTag label="Rust + Tauri" />
			<FeatureTag label="Claude Code" />
			<FeatureTag label="Pane System" />
			<FeatureTag label="Skills Marketplace" />
			<FeatureTag label="Self-Healing Hooks" />
		</div>
	</div>

	<div class="cta-section" use:reveal>
		{#if data.hasLicense}
			<AsciiBox title="LICENSE ACTIVE">
				<div class="cta-command">
					<span class="cta-prompt">$</span> license --status
				</div>
				<div class="cta-response">
					<span class="cta-chevron">&gt;</span> <span class="license-key">{data.licenseKey}</span>
				</div>
				<div class="cta-response">
					<span class="cta-chevron">&gt;</span> status: <span class="status-active">active</span>
				</div>
				<div class="cta-response">
					<span class="cta-chevron">&gt;</span> <a href="/account" class="cta-link">view in account &rarr;</a>
				</div>
			</AsciiBox>
		{:else if data.isAuthenticated}
			<AsciiBox title="PURCHASE">
				<div class="cta-command">
					<span class="cta-prompt">$</span> buy rift
				</div>
				{#if error}
					<div class="cta-response cta-error">
						<span class="cta-chevron">&gt;</span> {error}
					</div>
				{/if}
				<div class="cta-buy-row">
					<button class="buy-btn" onclick={buyRift} disabled={purchasing}>
						{purchasing ? '> processing...' : '> BUY NOW'}
					</button>
				</div>
				<div class="cta-response">
					<span class="cta-chevron">&gt;</span> one-time purchase. 3-device license.
				</div>
				<div class="cta-response">
					<span class="cta-chevron">&gt;</span> validate once, works offline forever.
				</div>
			</AsciiBox>
		{:else}
			<AsciiBox title="PURCHASE">
				<div class="cta-command">
					<span class="cta-prompt">$</span> buy rift
				</div>
				<div class="cta-response">
					<span class="cta-chevron">&gt;</span> authentication required
				</div>
				<div class="cta-response">
					<span class="cta-chevron">&gt;</span> <a href="/auth/login" class="cta-link">login to purchase &rarr;</a>
				</div>
			</AsciiBox>
		{/if}
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
