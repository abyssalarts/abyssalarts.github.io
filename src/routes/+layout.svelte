<script lang="ts">
	import '$lib/styles/terminal.css';
	import BootSequence from '$lib/components/BootSequence.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import DepthMeter from '$lib/components/DepthMeter.svelte';
	import StatusBar from '$lib/components/StatusBar.svelte';
	import CommandBar from '$lib/components/CommandBar.svelte';
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const DEFAULT_DESCRIPTION = 'Privacy-first Android apps and developer tools. No ads. No subscriptions. No data harvesting. Built because they needed to exist.';
	const OG_IMAGE = 'https://abyssal-arts.com/og-image.png';

	let pageTitle = $derived(
		$page.data?.title && $page.data.title !== 'Home'
			? `Abyssal Arts — ${$page.data.title}`
			: 'Abyssal Arts'
	);
	let description = $derived($page.data?.description || DEFAULT_DESCRIPTION);
	let canonicalUrl = $derived(`https://abyssal-arts.com${$page.url.pathname}`);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Abyssal Arts" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<BootSequence />
<NavBar />

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
