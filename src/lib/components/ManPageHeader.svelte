<script lang="ts">
	let {
		name,
		section = '1',
		manual = 'Abyssal Arts Manual',
		description
	}: {
		name: string;
		section?: string;
		manual?: string;
		description: string;
	} = $props();

	const tag = `${name.toUpperCase()}(${section})`;
	const nameLower = name.toLowerCase();
</script>

<div class="man-page-header">
	<div class="man-page-top">
		<span class="man-page-tag">{tag}</span>
		<span class="man-page-manual">{manual}</span>
		<span class="man-page-tag">{tag}</span>
	</div>
	<div class="man-page-section">
		<h1 class="man-page-section-title">NAME</h1>
		<p class="man-page-section-body">
			{nameLower} — {description}
		</p>
	</div>
</div>

<style>
	.man-page-header {
		margin-bottom: 48px;
		font-family: 'JetBrains Mono', monospace;
	}

	.man-page-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 24px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--amber-faint);
	}

	.man-page-tag {
		font-size: 13px;
		font-weight: 700;
		color: var(--amber);
		text-shadow: 0 0 15px var(--glow);
	}

	.man-page-manual {
		font-size: 12px;
		color: var(--text-secondary);
		letter-spacing: 1px;
	}

	.man-page-section {
		margin-top: 16px;
	}

	.man-page-section-title {
		font-size: 13px;
		font-weight: 700;
		color: var(--amber);
		letter-spacing: 1px;
		margin-bottom: 4px;
	}

	.man-page-section-body {
		font-size: 13px;
		font-weight: 300;
		color: var(--text-body);
		padding-left: 24px;
		line-height: 1.8;
	}
</style>
