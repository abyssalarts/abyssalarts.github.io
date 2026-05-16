<script lang="ts">
	import '$lib/styles/terminal.css';
	import BootSequence from '$lib/components/BootSequence.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import DepthMeter from '$lib/components/DepthMeter.svelte';
	import StatusBar from '$lib/components/StatusBar.svelte';
	import CommandBar from '$lib/components/CommandBar.svelte';
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>Abyssal Arts{$page.data?.title ? ` — ${$page.data.title}` : ''}</title>
</svelte:head>

<BootSequence />

<div class="terminal-shell">
	<Breadcrumbs />
	<main class="container">
		{@render children()}
	</main>
	<DepthMeter />
	<StatusBar />
	<CommandBar />
</div>

<style>
	.terminal-shell {
		min-height: 100vh;
		position: relative;
		padding-bottom: 32px;
	}
</style>
