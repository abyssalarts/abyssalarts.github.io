<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		variant = 'single',
		children
	}: {
		title?: string;
		variant?: 'single' | 'double';
		children: Snippet;
	} = $props();
</script>

<div class="ascii-box" class:double={variant === 'double'}>
	{#if title}
		<div class="ascii-box-title">
			<span class="ascii-box-title-text">{title}</span>
		</div>
	{/if}
	<div class="ascii-box-content">
		{@render children()}
	</div>
</div>

<style>
	.ascii-box {
		position: relative;
		background: var(--surface);
		border: 1px solid var(--amber-faint);
		width: 100%;
		transition: border-color 0.3s ease;
	}

	.ascii-box.double {
		border-width: 2px;
	}

	.ascii-box-title {
		position: absolute;
		top: -1px;
		left: 12px;
		transform: translateY(-50%);
		padding: 0 8px;
		background: var(--surface);
	}

	.double .ascii-box-title {
		top: -2px;
	}

	.ascii-box-title-text {
		font-size: 11px;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--amber-dim);
	}

	.ascii-box-content {
		padding: 20px 24px;
	}
</style>
