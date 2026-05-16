<script lang="ts">
	import { depth } from '$lib/stores/depth';
</script>

<div class="depth-meter" aria-label="Scroll depth indicator">
	<span class="depth-label">DEPTH</span>
	<span class="depth-arrow">▼</span>
	<span class="depth-value">-{$depth.toFixed(0)}m</span>
</div>

<style>
	.depth-meter {
		position: fixed;
		right: 16px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		z-index: 100;
		pointer-events: none;
	}

	.depth-label {
		font-size: 9px;
		letter-spacing: 3px;
		color: var(--amber-faint);
		text-transform: uppercase;
	}

	.depth-arrow {
		font-size: 10px;
		color: var(--amber-dim);
		animation: scrollPulse 2s ease-in-out infinite;
	}

	.depth-value {
		font-size: 11px;
		letter-spacing: 1px;
		color: var(--amber-dim);
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 600px) {
		.depth-meter {
			display: none;
		}
	}
</style>
