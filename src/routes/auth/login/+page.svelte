<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import AsciiDivider from '$lib/components/AsciiDivider.svelte';

	let submitting = $state(false);
	let authenticated = $state(false);

	const form = $derived($page.form as { message?: string; email?: string } | null);
</script>

<section class="auth-page">
	<h1 class="auth-title">abyssal-arts.com login:</h1>
	<AsciiDivider />

	<form
		method="POST"
		use:enhance={() => {
			submitting = true;
			authenticated = false;
			return async ({ result, update }) => {
				submitting = false;
				if (result.type === 'redirect') {
					authenticated = true;
					setTimeout(() => update(), 500);
				} else {
					await update();
				}
			};
		}}
		class="auth-form"
	>
		<div class="field">
			<label for="email">email:</label>
			<input
				type="email"
				id="email"
				name="email"
				value={form?.email ?? ''}
				required
				autocomplete="email"
			/>
		</div>

		<div class="field">
			<label for="password">password:</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				autocomplete="current-password"
			/>
		</div>

		<div class="feedback">
			{#if submitting}
				<p class="status">> authenticating...</p>
			{/if}
			{#if authenticated}
				<p class="status success">> authenticating... OK</p>
			{/if}
			{#if form?.message}
				<p class="status error">> login: {form.message}</p>
			{/if}
		</div>

		<button type="submit" class="submit-btn" disabled={submitting}>LOGIN</button>
	</form>

	<div class="auth-links">
		<a href="/auth/register">No account? useradd →</a>
		<a href="/auth/login/github" class="github-link">[github] sign in with github →</a>
	</div>
</section>

<style>
	.auth-page {
		max-width: 480px;
		margin: 0 auto;
		padding-top: 40px;
	}

	.auth-title {
		font-size: 18px;
		font-weight: 600;
		color: var(--amber);
		text-shadow: 0 0 20px var(--glow);
		margin-bottom: 16px;
	}

	.auth-form {
		margin-top: 24px;
	}

	.field {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 20px;
	}

	.field label {
		font-size: 13px;
		color: var(--amber-dim);
		min-width: 90px;
		text-align: right;
	}

	.field input {
		flex: 1;
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--amber-faint);
		color: var(--text-body);
		font-family: 'JetBrains Mono', monospace;
		font-size: 14px;
		padding: 6px 4px;
		outline: none;
		transition: border-color 0.3s ease;
	}

	.field input:focus {
		border-bottom-color: var(--amber);
	}

	.feedback {
		min-height: 32px;
		margin: 16px 0;
	}

	.status {
		font-size: 13px;
		color: var(--text-secondary);
	}

	.status.error {
		color: var(--red);
	}

	.status.success {
		color: var(--green);
	}

	.submit-btn {
		display: block;
		width: 100%;
		background: transparent;
		border: 1px solid var(--amber-dim);
		color: var(--amber);
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		letter-spacing: 2px;
		padding: 12px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--glow-faintest);
		border-color: var(--amber);
		box-shadow: 0 0 20px var(--glow-subtle);
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.auth-links {
		margin-top: 24px;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.auth-links a {
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.auth-links a:hover {
		color: var(--amber-dim);
	}

	.github-link {
		margin-top: 4px;
	}
</style>
