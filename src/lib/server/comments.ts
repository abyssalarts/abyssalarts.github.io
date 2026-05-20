import { generateId } from './crypto';
import { getDb } from './db';

export interface Comment {
	id: string;
	user_id: string;
	username: string;
	product: string;
	body: string;
	parent_id: string | null;
	created_at: number;
	edited_at: number | null;
	deleted: number;
	replies?: Comment[];
}

export async function getComments(product: string): Promise<Comment[]> {
	const result = await getDb().execute({
		sql: `SELECT c.id, c.user_id, u.username, c.product, c.body, c.parent_id,
		             c.created_at, c.edited_at, c.deleted
		      FROM comments c
		      JOIN users u ON c.user_id = u.id
		      WHERE c.product = ? AND c.deleted = 0
		      ORDER BY c.created_at ASC`,
		args: [product]
	});

	const all = result.rows as unknown as Comment[];
	const topLevel: Comment[] = [];
	const replyMap = new Map<string, Comment[]>();

	for (const comment of all) {
		if (comment.parent_id) {
			const existing = replyMap.get(comment.parent_id) ?? [];
			existing.push({ ...comment, replies: undefined });
			replyMap.set(comment.parent_id, existing);
		} else {
			topLevel.push({ ...comment, replies: [] });
		}
	}

	for (const comment of topLevel) {
		comment.replies = replyMap.get(comment.id) ?? [];
	}

	return topLevel;
}

export async function createComment(
	userId: string,
	product: string,
	body: string,
	parentId?: string
): Promise<Comment> {
	if (parentId) {
		const parent = await getDb().execute({
			sql: 'SELECT id, parent_id FROM comments WHERE id = ? AND deleted = 0',
			args: [parentId]
		});
		const parentRow = parent.rows[0] as unknown as { id: string; parent_id: string | null } | undefined;
		if (!parentRow) {
			throw new Error('Parent comment not found');
		}
		if (parentRow.parent_id !== null) {
			throw new Error('Cannot reply to a reply (1 level deep only)');
		}
	}

	const id = generateId();
	const now = Math.floor(Date.now() / 1000);

	await getDb().execute({
		sql: `INSERT INTO comments (id, user_id, product, body, parent_id, created_at)
		      VALUES (?, ?, ?, ?, ?, ?)`,
		args: [id, userId, product, body, parentId ?? null, now]
	});

	const userResult = await getDb().execute({
		sql: 'SELECT username FROM users WHERE id = ?',
		args: [userId]
	});
	const username = (userResult.rows[0] as unknown as { username: string })?.username ?? 'unknown';

	return {
		id,
		user_id: userId,
		username,
		product,
		body,
		parent_id: parentId ?? null,
		created_at: now,
		edited_at: null,
		deleted: 0,
		replies: []
	};
}

export async function updateComment(commentId: string, userId: string, body: string): Promise<void> {
	const result = await getDb().execute({
		sql: `UPDATE comments SET body = ?, edited_at = unixepoch()
		      WHERE id = ? AND user_id = ? AND deleted = 0`,
		args: [body, commentId, userId]
	});
	if (result.rowsAffected === 0) {
		throw new Error('Comment not found or not yours');
	}
}

export async function deleteComment(commentId: string, userId: string): Promise<void> {
	const result = await getDb().execute({
		sql: 'UPDATE comments SET deleted = 1 WHERE id = ? AND user_id = ?',
		args: [commentId, userId]
	});
	if (result.rowsAffected === 0) {
		throw new Error('Comment not found or not yours');
	}
}

export async function canComment(userId: string): Promise<boolean> {
	const result = await getDb().execute({
		sql: 'SELECT 1 FROM comments WHERE user_id = ? AND created_at > (unixepoch() - 30)',
		args: [userId]
	});
	return result.rows.length === 0;
}
