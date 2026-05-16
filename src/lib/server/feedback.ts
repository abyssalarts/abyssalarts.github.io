import { randomBytes } from 'crypto';
import { db } from './db';

export interface Feedback {
	id: string;
	user_id: string | null;
	product: string;
	type: string;
	body: string;
	email: string | null;
	created_at: number;
}

const VALID_PRODUCTS = ['brain-dump', 'rift', 'website', 'other'];
const VALID_TYPES = ['bug', 'feature', 'general'];

export async function createFeedback(
	product: string,
	type: string,
	body: string,
	userId?: string,
	email?: string
): Promise<Feedback> {
	if (!VALID_PRODUCTS.includes(product)) {
		throw new Error(`Invalid product: ${product}`);
	}
	if (!VALID_TYPES.includes(type)) {
		throw new Error(`Invalid type: ${type}`);
	}

	const id = randomBytes(8).toString('hex');
	const now = Math.floor(Date.now() / 1000);

	await db.execute({
		sql: `INSERT INTO feedback (id, user_id, product, type, body, email, created_at)
		      VALUES (?, ?, ?, ?, ?, ?, ?)`,
		args: [id, userId ?? null, product, type, body, email ?? null, now]
	});

	return {
		id,
		user_id: userId ?? null,
		product,
		type,
		body,
		email: email ?? null,
		created_at: now
	};
}

export async function canSubmitFeedback(identifier: string): Promise<boolean> {
	const result = await db.execute({
		sql: 'SELECT 1 FROM feedback WHERE (user_id = ? OR email = ?) AND created_at > (unixepoch() - 300)',
		args: [identifier, identifier]
	});
	return result.rows.length === 0;
}
