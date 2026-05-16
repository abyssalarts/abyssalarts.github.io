<script lang="ts">
	import Comment from './Comment.svelte';
	import CommentInput from './CommentInput.svelte';
	import AsciiDivider from './AsciiDivider.svelte';

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
		replies?: CommentData[];
	}

	let {
		product,
		initialComments = [],
		user = null
	}: {
		product: string;
		initialComments: CommentData[];
		user: { id: string; username: string } | null;
	} = $props();

	let comments = $state<CommentData[]>(initialComments);
	let replyingTo = $state<string | null>(null);

	const topLevelComments = $derived(
		comments.filter((c) => !c.parent_id && !c.deleted)
	);

	const totalCount = $derived(comments.filter((c) => !c.deleted).length);

	function getReplies(commentId: string): CommentData[] {
		return comments.filter((c) => c.parent_id === commentId && !c.deleted);
	}

	function getReplyingToUsername(): string {
		if (!replyingTo) return '';
		const c = comments.find((c) => c.id === replyingTo);
		return c?.username ?? '';
	}

	async function postComment(body: string) {
		const res = await fetch('/api/comments', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ product, body })
		});
		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			throw new Error(data.error || 'Failed to post comment');
		}
		const newComment = await res.json();
		comments = [...comments, newComment];
	}

	async function postReply(body: string) {
		if (!replyingTo) return;
		const res = await fetch('/api/comments', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ product, body, parent_id: replyingTo })
		});
		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			throw new Error(data.error || 'Failed to post reply');
		}
		const newReply = await res.json();
		comments = [...comments, newReply];
		replyingTo = null;
	}

	async function handleEdit(commentId: string, body: string) {
		const res = await fetch(`/api/comments/${commentId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ body })
		});
		if (res.ok) {
			comments = comments.map((c) =>
				c.id === commentId ? { ...c, body, edited_at: Math.floor(Date.now() / 1000) } : c
			);
		}
	}

	async function handleDelete(commentId: string) {
		const res = await fetch(`/api/comments/${commentId}`, {
			method: 'DELETE'
		});
		if (res.ok) {
			comments = comments.map((c) =>
				c.id === commentId ? { ...c, deleted: 1 } : c
			);
		}
	}

	function handleReply(commentId: string) {
		replyingTo = replyingTo === commentId ? null : commentId;
	}
</script>

<div class="comment-thread">
	<h2 class="thread-title">COMMENTS <span class="comment-count">[{totalCount}]</span></h2>
	<AsciiDivider />

	{#if topLevelComments.length === 0}
		<p class="no-comments">No comments yet. Be the first.</p>
	{/if}

	{#each topLevelComments as comment (comment.id)}
		<Comment
			{comment}
			currentUserId={user?.id ?? null}
			onReply={handleReply}
			onEdit={handleEdit}
			onDelete={handleDelete}
		/>

		{#each getReplies(comment.id) as reply (reply.id)}
			<Comment
				comment={reply}
				currentUserId={user?.id ?? null}
				onReply={handleReply}
				onEdit={handleEdit}
				onDelete={handleDelete}
				isReply={true}
			/>
		{/each}

		{#if replyingTo === comment.id && user}
			<div class="reply-input">
				<span class="reply-pipe">│</span>
				<div class="reply-input-content">
					<CommentInput
						username={user.username}
						onSubmit={postReply}
						placeholder="Write a reply..."
						replyingTo={comment.username}
						onCancelReply={() => (replyingTo = null)}
					/>
				</div>
			</div>
		{/if}
	{/each}

	<AsciiDivider />

	{#if user}
		<CommentInput username={user.username} onSubmit={postComment} />
	{:else}
		<p class="login-prompt">
			<a href="/auth/login">login to comment &rarr;</a>
		</p>
	{/if}
</div>

<style>
	.comment-thread {
		margin-top: 16px;
	}

	.thread-title {
		font-size: 13px;
		font-weight: 700;
		color: var(--amber);
		letter-spacing: 1px;
		text-transform: uppercase;
		margin-bottom: 8px;
	}

	.comment-count {
		color: var(--text-secondary);
		font-weight: 400;
	}

	.no-comments {
		color: var(--text-secondary);
		font-size: 12px;
		font-style: italic;
		margin: 16px 0;
	}

	.reply-input {
		display: flex;
		gap: 0;
		margin-bottom: 16px;
		margin-left: 0;
	}

	.reply-pipe {
		color: var(--amber-faint);
		font-size: 14px;
		line-height: 1.8;
		margin-right: 8px;
		user-select: none;
	}

	.reply-input-content {
		flex: 1;
	}

	.login-prompt {
		margin-top: 16px;
		font-size: 13px;
	}

	.login-prompt a {
		color: var(--amber-dim);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.login-prompt a:hover {
		color: var(--amber);
	}
</style>
