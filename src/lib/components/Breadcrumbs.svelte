<script lang="ts">
	import { page } from '$app/stores';
	import { getPathSegments } from '$lib/stores/routes';

	let pathname = $derived($page.url.pathname);
	let segments = $derived(getPathSegments(pathname));
</script>

<nav class="breadcrumbs" aria-label="Filesystem navigation">
	<span class="prompt-user">guest</span><span class="prompt-at">@</span><span class="prompt-host">abyssal-arts</span><span class="prompt-colon">:</span>{#each segments as segment, i}<a
			href={segment.path}
			class="prompt-path"
			aria-current={i === segments.length - 1 ? 'page' : undefined}
		>{i > 0 ? '/' : ''}{segment.name}</a
		>{/each}<span class="prompt-dollar">$</span><span class="cursor"></span>
</nav>

<style>
	.breadcrumbs {
		font-size: 13px;
		padding: 12px 24px;
		white-space: nowrap;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.breadcrumbs::-webkit-scrollbar {
		display: none;
	}

	.prompt-user,
	.prompt-host {
		color: var(--text-secondary);
	}

	.prompt-at,
	.prompt-colon {
		color: var(--text-secondary);
	}

	.prompt-path {
		color: var(--amber);
		text-decoration: none;
	}

	.prompt-path:hover {
		color: var(--amber-bright);
		text-decoration: underline;
	}

	.prompt-path[aria-current='page'] {
		color: var(--amber-bright);
	}

	.prompt-dollar {
		color: var(--text-secondary);
		margin-left: 1px;
	}

	.cursor {
		display: inline-block;
		width: 8px;
		height: 14px;
		background: var(--amber);
		margin-left: 4px;
		vertical-align: text-bottom;
		animation: blink 1s step-end infinite;
	}

	@media (max-width: 600px) {
		.breadcrumbs {
			font-size: 11px;
			padding: 8px 16px;
		}
	}
</style>
