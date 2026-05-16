<script lang="ts">
	interface CommentData {
		id: string;
		user_id: string;
		username: string;
		product: string;
		body: string;
		parent_id: string | null;
		created_at: number;
		edited_at: number | null;
		deleted: number;
	}

	let {
		comment,
		currentUserId = null,
		onReply,
		onEdit,
		onDelete,
		isReply = false
	}: {
		comment: CommentData;
		currentUserId: string | null;
		onReply: (commentId: string) => void;
		onEdit: (commentId: string, body: string) => void;
		onDelete: (commentId: string) => void;
		isReply?: boolean;
	} = $props();

	let editing = $state(false);
	let editBody = $state('');

	const isOwn = $derived(currentUserId === comment.user_id);
	const isAdmin = $derived(comment.username === 'admin' || comment.username === 'garth');

	function timeAgo(timestamp: number): string {
		const seconds = Math.floor(Date.now() / 1000 - timestamp);
		if (seconds < 60) return 'just now';
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;
		const days = Math.floor(hours / 24);
		if (days < 30) return `${days}d ago`;
		return new Date(timestamp * 1000).toLocaleDateString();
	}

	function startEdit() {
		editBody = comment.body;
		editing = true;
	}

	function cancelEdit() {
		editing = false;
		editBody = '';
	}

	function saveEdit() {
		if (editBody.trim() && editBody !== comment.body) {
			onEdit(comment.id, editBody.trim());
		}
		editing = false;
	}
</script>

<div class="comment" class:is-reply={isReply}>
	{#if isReply}
		<span class="pipe">│</span>
	{/if}
	<div class="comment-content">
		{#if comment.deleted}
			<div class="comment-header">
				<span class="deleted-text">[deleted]</span>
			</div>
		{:else}
			<div class="comment-header">
				<span class="username" class:is-admin={isAdmin}>
					{#if isAdmin}
						{comment.username} [abyssal-arts]:
					{:else}
						{comment.username}@abyssal-arts:~$
					{/if}
				</span>
			</div>

			{#if editing}
				<div class="edit-area">
					<textarea
						bind:value={editBody}
						class="edit-input"
						rows="3"
					></textarea>
					<div class="edit-actions">
						<button class="action-btn" onclick={saveEdit}>save</button>
						<button class="action-btn" onclick={cancelEdit}>cancel</button>
					</div>
				</div>
			{:else}
				<div class="comment-body">{comment.body}</div>
			{/if}

			<div class="comment-meta">
				<span class="timestamp">{timeAgo(comment.created_at)}</span>
				{#if comment.edited_at}
					<span class="edited">(edited)</span>
				{/if}
				{#if isOwn && !editing}
					<button class="action-btn" onclick={startEdit}>edit</button>
					<button class="action-btn action-delete" onclick={() => onDelete(comment.id)}>delete</button>
				{/if}
				{#if !isReply && currentUserId}
					<button class="action-btn" onclick={() => onReply(comment.id)}>reply</button>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.comment {
		margin-bottom: 16px;
		display: flex;
		gap: 0;
	}

	.is-reply {
		margin-bottom: 8px;
		margin-left: 0;
	}

	.pipe {
		color: var(--amber-faint);
		font-size: 14px;
		line-height: 1.8;
		margin-right: 8px;
		user-select: none;
	}

	.comment-content {
		flex: 1;
		min-width: 0;
	}

	.comment-header {
		margin-bottom: 2px;
	}

	.username {
		color: var(--amber);
		font-size: 13px;
		font-weight: 500;
	}

	.username.is-admin {
		color: var(--amber-bright);
	}

	.comment-body {
		color: var(--text-body);
		font-size: 13px;
		line-height: 1.8;
		font-weight: 300;
		padding-left: 0;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.deleted-text {
		color: var(--text-secondary);
		font-style: italic;
		font-size: 12px;
	}

	.comment-meta {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 4px;
	}

	.timestamp {
		font-size: 10px;
		color: var(--text-secondary);
		letter-spacing: 0.5px;
	}

	.edited {
		font-size: 10px;
		color: var(--text-secondary);
		font-style: italic;
	}

	.action-btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: var(--text-secondary);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: color 0.2s ease;
	}

	.action-btn:hover {
		color: var(--amber-dim);
	}

	.action-delete:hover {
		color: var(--red);
	}

	.edit-area {
		margin: 4px 0;
	}

	.edit-input {
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		color: var(--text-body);
		background: var(--surface);
		border: 1px solid var(--amber-faint);
		padding: 8px 12px;
		width: 100%;
		resize: vertical;
		line-height: 1.6;
	}

	.edit-input:focus {
		outline: none;
		border-color: var(--amber-dim);
	}

	.edit-actions {
		display: flex;
		gap: 12px;
		margin-top: 4px;
	}
</style>
