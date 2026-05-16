<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { depth } from '$lib/stores/depth';

	let currentIndex = $state(0);
	let visible = $state(true);
	let sessionStart = Date.now();

	function formatUptime(): string {
		const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
		const h = Math.floor(elapsed / 3600);
		const m = Math.floor((elapsed % 3600) / 60);
		const s = elapsed % 60;
		if (h > 0) return `${h}h ${m}m ${s}s`;
		if (m > 0) return `${m}m ${s}s`;
		return `${s}s`;
	}

	function getMessages(): string[] {
		return [
			`[uptime ${formatUptime()}]  [privacy: nominal]  [env: production]`,
			`[depth: -${$depth.toFixed(0)}m]  [signal: ████████░░ 82%]  [session: ${$page.data.user?.username ?? 'none'}]`,
			`[syscheck] privacy integrity... OK`,
			`[heartbeat] all systems nominal`,
			`[uptime ${formatUptime()}]  [depth: -${$depth.toFixed(0)}m]  [signal: strong]`
		];
	}

	onMount(() => {
		const interval = setInterval(() => {
			visible = false;
			setTimeout(() => {
				currentIndex = (currentIndex + 1) % getMessages().length;
				visible = true;
			}, 300);
		}, 8000 + Math.random() * 4000);

		return () => clearInterval(interval);
	});

	let displayMessage = $derived(getMessages()[currentIndex]);
</script>

<footer class="status-bar" aria-label="System status">
	<div class="status-content" class:status-visible={visible}>
		{displayMessage}
	</div>
</footer>

<style>
	.status-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--surface);
		border-top: 1px solid var(--amber-faint);
		padding: 4px 16px;
		z-index: 200;
		font-size: 11px;
		font-family: 'JetBrains Mono', monospace;
		color: var(--text-secondary);
		white-space: nowrap;
		overflow: hidden;
	}

	.status-content {
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.status-content.status-visible {
		opacity: 1;
	}

	@media (max-width: 600px) {
		.status-bar {
			font-size: 9px;
			padding: 3px 12px;
		}
	}
</style>
