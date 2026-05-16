<script lang="ts">
	let { label }: { label: string } = $props();
</script>

<span class="feature-tag">{label}</span>

<style>
	.feature-tag {
		font-size: 10px;
		letter-spacing: 1px;
		text-transform: uppercase;
		color: var(--amber-dim);
		padding: 4px 10px;
		border: 1px solid var(--amber-faint);
		background: rgba(212, 137, 10, 0.03);
		white-space: nowrap;
	}
</style>
