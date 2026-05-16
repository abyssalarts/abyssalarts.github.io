<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error-page">
	{#if $page.status === 404}
		<div class="error-output">
			<span class="error-prefix">bash: cd: </span><span class="error-path">{$page.url.pathname}</span><span class="error-msg">: No such file or directory</span>
		</div>

		<div class="error-help">
			<p>Type 'help' for available commands, or try one of these:</p>
			<div class="route-list">
				<a href="/">
					<span class="route-path">~/</span>
					<span class="route-name">Home</span>
				</a>
				<a href="/products/brain-dump">
					<span class="route-path">~/products/brain-dump</span>
					<span class="route-name">Brain Dump</span>
				</a>
				<a href="/products/rift">
					<span class="route-path">~/products/rift</span>
					<span class="route-name">Rift</span>
				</a>
				<a href="/about">
					<span class="route-path">~/about</span>
					<span class="route-name">About</span>
				</a>
				<a href="/privacy">
					<span class="route-path">~/privacy</span>
					<span class="route-name">Privacy Policy</span>
				</a>
			</div>
		</div>
	{:else}
		<div class="error-output">
			<span class="error-prefix">SYSTEM ERROR: </span><span class="error-status">{$page.status}</span>
		</div>
		<p class="error-message">{$page.error?.message ?? 'An unexpected error occurred.'}</p>
		<p class="error-contact">If this persists, contact <a href="mailto:abyssalarts.dev@gmail.com">abyssalarts.dev@gmail.com</a></p>
	{/if}
</div>

<style>
	.error-page {
		min-height: 60vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 40px 0;
	}

	.error-output {
		margin-bottom: 32px;
		font-size: 15px;
	}

	.error-prefix {
		color: var(--text-body);
	}

	.error-path {
		color: var(--amber);
	}

	.error-msg {
		color: var(--red);
	}

	.error-status {
		color: var(--red);
		font-weight: 600;
	}

	.error-help {
		margin-top: 8px;
	}

	.error-help p {
		color: var(--text-secondary);
		font-size: 13px;
		margin-bottom: 16px;
	}

	.route-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.route-list a {
		display: flex;
		gap: 16px;
		text-decoration: none;
		padding: 4px 0;
		transition: opacity 0.2s;
	}

	.route-list a:hover {
		opacity: 1;
	}

	.route-path {
		color: var(--amber-dim);
		min-width: 220px;
	}

	.route-name {
		color: var(--text-secondary);
	}

	.route-list a:hover .route-path {
		color: var(--amber);
	}

	.route-list a:hover .route-name {
		color: var(--text-body);
	}

	.error-message {
		color: var(--text-body);
		font-size: 14px;
		margin-bottom: 16px;
	}

	.error-contact {
		color: var(--text-secondary);
		font-size: 13px;
	}

	.error-contact a {
		color: var(--amber-dim);
		text-decoration: none;
	}

	.error-contact a:hover {
		color: var(--amber);
	}

	@media (max-width: 600px) {
		.route-path {
			min-width: 0;
			font-size: 12px;
		}

		.route-list a {
			flex-direction: column;
			gap: 2px;
		}
	}
</style>
