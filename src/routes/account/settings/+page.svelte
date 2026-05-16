<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import AsciiDivider from '$lib/components/AsciiDivider.svelte';
	import { reveal } from '$lib/actions/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let profileSubmitting = $state(false);
	let passwordSubmitting = $state(false);

	const form = $derived($page.form as Record<string, unknown> | null);
</script>

<section class="settings-page" use:reveal>
	<h1 class="page-title">~/.config/abyssal/settings</h1>
	<AsciiDivider />

	<div class="settings-section" use:reveal>
		<h2 class="section-label">[profile]</h2>
		<form
			method="POST"
			action="?/updateProfile"
			use:enhance={() => {
				profileSubmitting = true;
				return async ({ update }) => {
					profileSubmitting = false;
					await update();
				};
			}}
			class="settings-form"
		>
			<div class="field">
				<label for="username">username:</label>
				<input
					type="text"
					id="username"
					name="username"
					value={form?.username ?? data.user?.username ?? ''}
					required
					pattern="[a-z0-9][a-z0-9-]*[a-z0-9]"
					minlength="3"
					maxlength="32"
				/>
			</div>

			<div class="field">
				<label for="email">email:</label>
				<input
					type="email"
					id="email"
					name="email"
					value={form?.email ?? data.user?.email ?? ''}
					required
				/>
			</div>

			<div class="feedback">
				{#if profileSubmitting}
					<p class="status">> updating profile...</p>
				{/if}
				{#if form?.profileSuccess}
					<p class="status success">> settings: profile updated... OK</p>
				{/if}
				{#if form?.profileError}
					<p class="status error">> settings: error: {form.profileError}</p>
				{/if}
			</div>

			<button type="submit" class="submit-btn" disabled={profileSubmitting}>UPDATE PROFILE</button>
		</form>
	</div>

	<AsciiDivider />

	<div class="settings-section" use:reveal>
		<h2 class="section-label">[password]</h2>
		<form
			method="POST"
			action="?/updatePassword"
			use:enhance={() => {
				passwordSubmitting = true;
				return async ({ update }) => {
					passwordSubmitting = false;
					await update();
				};
			}}
			class="settings-form"
		>
			<div class="field">
				<label for="currentPassword">current:</label>
				<input
					type="password"
					id="currentPassword"
					name="currentPassword"
					required
					autocomplete="current-password"
				/>
			</div>

			<div class="field">
				<label for="newPassword">new:</label>
				<input
					type="password"
					id="newPassword"
					name="newPassword"
					required
					autocomplete="new-password"
					minlength="8"
				/>
			</div>

			<div class="field">
				<label for="confirmPassword">confirm:</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					required
					autocomplete="new-password"
				/>
			</div>

			<div class="feedback">
				{#if passwordSubmitting}
					<p class="status">> updating password...</p>
				{/if}
				{#if form?.passwordSuccess}
					<p class="status success">> settings: password updated... OK</p>
				{/if}
				{#if form?.passwordError}
					<p class="status error">> settings: error: {form.passwordError}</p>
				{/if}
			</div>

			<button type="submit" class="submit-btn" disabled={passwordSubmitting}>UPDATE PASSWORD</button>
		</form>
	</div>

	<AsciiDivider />

	<div class="back-link" use:reveal>
		<a href="/account">← back to ~/.config/abyssal/profile</a>
	</div>
</section>

<style>
	.settings-page {
		max-width: 480px;
		margin: 0 auto;
		padding-top: 20px;
	}

	.page-title {
		font-size: clamp(18px, 4vw, 24px);
		font-weight: 600;
		color: var(--amber);
		text-shadow: 0 0 20px var(--glow);
		margin-bottom: 16px;
	}

	.settings-section {
		margin: 24px 0;
	}

	.section-label {
		font-size: 14px;
		font-weight: 600;
		color: var(--amber-dim);
		margin-bottom: 16px;
	}

	.settings-form {
		padding-left: 8px;
	}

	.field {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
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
		min-height: 28px;
		margin: 12px 0;
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
		padding: 10px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.submit-btn:hover:not(:disabled) {
		background: rgba(212, 137, 10, 0.08);
		border-color: var(--amber);
		box-shadow: 0 0 20px rgba(212, 137, 10, 0.1);
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.back-link {
		font-size: 12px;
	}

	.back-link a {
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.back-link a:hover {
		color: var(--amber-dim);
	}
</style>
