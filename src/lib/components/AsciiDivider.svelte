<script lang="ts">
	let {
		label,
		char = '═'
	}: {
		label?: string;
		char?: string;
	} = $props();
</script>

<div class="ascii-divider" role="separator">
	<span class="ascii-divider-line" aria-hidden="true"></span>
	{#if label}
		<span class="ascii-divider-label">{label}</span>
		<span class="ascii-divider-line" aria-hidden="true"></span>
	{/if}
</div>

<style>
	.ascii-divider {
		display: flex;
		align-items: center;
		gap: 16px;
		margin: 48px 0;
		width: 100%;
	}

	.ascii-divider-line {
		flex: 1;
		height: 1px;
		background: var(--amber-faint);
	}

	.ascii-divider-label {
		font-size: 11px;
		letter-spacing: 3px;
		text-transform: uppercase;
		color: var(--amber-dim);
		white-space: nowrap;
	}
</style>
