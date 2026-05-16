<script lang="ts">
	let {
		username,
		onSubmit,
		placeholder = 'Write a comment...',
		replyingTo,
		onCancelReply
	}: {
		username: string;
		onSubmit: (body: string) => Promise<void>;
		placeholder?: string;
		replyingTo?: string;
		onCancelReply?: () => void;
	} = $props();

	let body = $state('');
	let submitting = $state(false);
	let error = $state('');

	const charCount = $derived(body.length);
	const maxChars = 2000;
	const canSubmit = $derived(body.trim().length > 0 && body.length <= maxChars && !submitting);

	async function handleSubmit() {
		if (!canSubmit) return;
		submitting = true;
		error = '';
		try {
			await onSubmit(body.trim());
			body = '';
		} catch (e: any) {
			error = e?.message || 'Failed to post comment';
		} finally {
			submitting = false;
		}
	}
</script>

<div class="comment-input">
	{#if replyingTo}
		<div class="replying-to">
			<span class="replying-label">replying to {replyingTo}</span>
			{#if onCancelReply}
				<button class="cancel-reply" onclick={onCancelReply}>cancel</button>
			{/if}
		</div>
	{/if}

	<div class="input-row">
		<span class="prompt">{username}@abyssal-arts:~$</span>
		<textarea
			bind:value={body}
			{placeholder}
			class="input-field"
			rows="1"
			disabled={submitting}
			oninput={(e) => {
				const el = e.currentTarget;
				el.style.height = 'auto';
				el.style.height = Math.min(el.scrollHeight, 144) + 'px';
			}}
		></textarea>
	</div>

	<div class="input-meta">
		<span class="char-count" class:over-limit={charCount > maxChars}>{charCount}/{maxChars}</span>
		{#if error}
			<span class="error-msg">{error}</span>
		{/if}
		{#if submitting}
			<span class="posting">&gt; posting...</span>
		{/if}
		<button class="submit-btn" onclick={handleSubmit} disabled={!canSubmit}>
			{submitting ? 'posting...' : 'SUBMIT'}
		</button>
	</div>
</div>

<style>
	.comment-input {
		margin-top: 16px;
	}

	.replying-to {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 8px;
	}

	.replying-label {
		font-size: 11px;
		color: var(--amber-dim);
		letter-spacing: 0.5px;
	}

	.cancel-reply {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: var(--text-secondary);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.cancel-reply:hover {
		color: var(--red);
	}

	.input-row {
		display: flex;
		align-items: flex-start;
		gap: 8px;
	}

	.prompt {
		color: var(--amber);
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		line-height: 1.8;
		flex-shrink: 0;
	}

	.input-field {
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		color: var(--text-body);
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--amber-faint);
		padding: 0 0 4px;
		width: 100%;
		resize: none;
		overflow: hidden;
		line-height: 1.8;
	}

	.input-field:focus {
		outline: none;
		border-bottom-color: var(--amber-dim);
	}

	.input-field::placeholder {
		color: var(--text-secondary);
		opacity: 0.5;
	}

	.input-field:disabled {
		opacity: 0.5;
	}

	.input-meta {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 8px;
	}

	.char-count {
		font-size: 10px;
		color: var(--text-secondary);
		letter-spacing: 0.5px;
	}

	.char-count.over-limit {
		color: var(--red);
	}

	.error-msg {
		font-size: 11px;
		color: var(--red);
	}

	.posting {
		font-size: 11px;
		color: var(--amber-dim);
	}

	.submit-btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--amber);
		background: none;
		border: 1px solid var(--amber-faint);
		padding: 4px 12px;
		cursor: pointer;
		margin-left: auto;
		transition: border-color 0.2s ease, background 0.2s ease;
	}

	.submit-btn:hover:not(:disabled) {
		border-color: var(--amber-dim);
		background: rgba(212, 137, 10, 0.05);
	}

	.submit-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	@media (max-width: 600px) {
		.input-row {
			flex-direction: column;
			gap: 4px;
		}

		.prompt {
			font-size: 11px;
		}
	}
</style>
