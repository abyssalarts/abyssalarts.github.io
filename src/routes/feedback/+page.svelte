<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import AsciiDivider from '$lib/components/AsciiDivider.svelte';
	import { reveal } from '$lib/actions/reveal';

	let submitting = $state(false);
	let submitted = $state(false);

	const form = $derived($page.form);
	const user = $derived($page.data.user);
</script>

<section class="feedback-page" use:reveal>
	<div class="terminal-header">
		<span class="header-host">abyssal-arts.com</span> feedback:
	</div>

	<AsciiDivider />

	{#if submitted || form?.success}
		<div class="success-block">
			<p class="success-line">&gt; feedback: submitted successfully... OK</p>
			<p class="success-hint">We read every submission. No auto-replies, no ticket numbers.</p>
			<a href="/" class="back-link">&lt;- back to home</a>
		</div>
	{:else}
		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					submitting = false;
					await update();
					if (!$page.form?.message) {
						submitted = true;
					}
				};
			}}
		>
			<div class="form-field">
				<label for="product">product:</label>
				<select id="product" name="product" value={form?.product ?? 'website'}>
					<option value="brain-dump">Brain Dump</option>
					<option value="rift">Rift</option>
					<option value="website">Website</option>
					<option value="other">Other</option>
				</select>
			</div>

			<div class="form-field">
				<label for="type">type:</label>
				<select id="type" name="type" value={form?.type ?? 'general'}>
					<option value="bug">Bug Report</option>
					<option value="feature">Feature Request</option>
					<option value="general">General</option>
				</select>
			</div>

			<div class="form-field">
				<label for="body">body:</label>
				<textarea
					id="body"
					name="body"
					rows="6"
					placeholder="> describe the issue, idea, or thought..."
					value={form?.body ?? ''}
					maxlength="5000"
				></textarea>
			</div>

			{#if !user}
				<div class="form-field">
					<label for="email">email:</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="so we can follow up if needed"
					/>
					<span class="field-hint">(optional if logged in — required otherwise)</span>
				</div>
			{/if}

			{#if form?.message}
				<div class="error-line">
					<span class="error-prefix">&gt; feedback: error:</span> {form.message}
				</div>
			{/if}

			<button type="submit" class="submit-btn" disabled={submitting}>
				{submitting ? 'SUBMITTING...' : 'SUBMIT FEEDBACK'}
			</button>
		</form>
	{/if}
</section>

<style>
	.feedback-page {
		padding: 40px 0 80px;
	}

	.terminal-header {
		font-size: 16px;
		color: var(--text-body);
		margin-bottom: 8px;
	}

	.header-host {
		color: var(--amber);
	}

	form {
		margin-top: 24px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	label {
		font-size: 11px;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--amber-dim);
	}

	select,
	input,
	textarea {
		font-family: 'JetBrains Mono', monospace;
		font-size: 14px;
		color: var(--text-body);
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--amber-faint);
		padding: 8px 0;
		outline: none;
		transition: border-color 0.2s;
	}

	select:focus,
	input:focus,
	textarea:focus {
		border-bottom-color: var(--amber-dim);
	}

	select {
		appearance: none;
		cursor: pointer;
		padding-right: 20px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238B6914' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0 center;
	}

	select option {
		background: var(--surface);
		color: var(--text-body);
	}

	textarea {
		resize: vertical;
		min-height: 120px;
		border: 1px solid var(--amber-faint);
		padding: 12px;
	}

	textarea:focus {
		border-color: var(--amber-dim);
	}

	textarea::placeholder {
		color: var(--text-secondary);
	}

	.field-hint {
		font-size: 11px;
		color: var(--text-secondary);
	}

	.error-line {
		color: var(--red);
		font-size: 13px;
	}

	.error-prefix {
		font-weight: 600;
	}

	.submit-btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		letter-spacing: 2px;
		color: var(--amber);
		background: transparent;
		border: 1px solid var(--amber-dim);
		padding: 12px 24px;
		cursor: pointer;
		transition: all 0.2s;
		align-self: flex-start;
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--glow-faintest);
		border-color: var(--amber);
		box-shadow: 0 0 15px var(--glow-subtle);
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: default;
	}

	.success-block {
		margin-top: 24px;
	}

	.success-line {
		color: var(--green);
		font-size: 14px;
		margin-bottom: 16px;
	}

	.success-hint {
		color: var(--text-secondary);
		font-size: 13px;
		margin-bottom: 24px;
	}

	.back-link {
		color: var(--amber-dim);
		text-decoration: none;
		font-size: 13px;
	}

	.back-link:hover {
		color: var(--amber);
	}
</style>
