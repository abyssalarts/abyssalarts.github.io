<script lang="ts">
	import FeatureTag from './FeatureTag.svelte';

	let {
		name,
		price,
		status,
		description,
		features,
		href
	}: {
		name: string;
		price: string;
		status: 'live' | 'alpha' | 'dev' | 'planned';
		description: string;
		features: string[];
		href: string;
	} = $props();

	const statusLabels: Record<string, string> = {
		live: 'Live',
		alpha: 'Alpha',
		dev: 'Dev',
		planned: 'Planned'
	};
</script>

<a {href} class="product-card">
	<span class="product-status status-{status}">{statusLabels[status]}</span>
	<div class="product-name">{name}</div>
	<div class="product-price">{price}</div>
	<p class="product-description">{description}</p>
	<div class="product-features">
		{#each features as feature}
			<FeatureTag label={feature} />
		{/each}
	</div>
</a>

<style>
	.product-card {
		display: block;
		background: var(--surface);
		border: 1px solid var(--amber-faint);
		padding: 32px;
		margin-bottom: 24px;
		position: relative;
		transition: border-color 0.3s ease, box-shadow 0.3s ease;
		text-decoration: none;
		color: inherit;
	}

	.product-card:hover {
		border-color: var(--amber-dim);
		box-shadow: 0 0 30px rgba(212, 137, 10, 0.05);
	}

	.product-status {
		position: absolute;
		top: 16px;
		right: 16px;
		font-size: 10px;
		letter-spacing: 2px;
		text-transform: uppercase;
		padding: 4px 10px;
		border: 1px solid;
	}

	.status-live {
		color: var(--green);
		border-color: rgba(123, 160, 91, 0.3);
	}

	.status-alpha {
		color: var(--amber);
		border-color: var(--amber-faint);
	}

	.status-dev {
		color: var(--amber-dim);
		border-color: var(--amber-faint);
	}

	.status-planned {
		color: var(--text-secondary);
		border-color: var(--amber-faint);
	}

	.product-name {
		font-size: 20px;
		font-weight: 600;
		color: var(--amber);
		margin-bottom: 4px;
		text-shadow: 0 0 15px var(--glow);
	}

	.product-price {
		font-size: 11px;
		color: var(--text-secondary);
		margin-bottom: 16px;
	}

	.product-description {
		font-size: 13px;
		font-weight: 300;
		color: var(--text-body);
		line-height: 1.8;
		margin-bottom: 20px;
	}

	.product-features {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	@media (max-width: 600px) {
		.product-card {
			padding: 24px;
		}

		.product-status {
			position: static;
			display: inline-block;
			margin-bottom: 12px;
		}
	}
</style>
