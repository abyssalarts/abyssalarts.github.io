import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getComments, createComment, canComment } from '$lib/server/comments';

export const GET: RequestHandler = async ({ url }) => {
	const product = url.searchParams.get('product');
	if (!product) {
		return json({ error: 'Missing product parameter' }, { status: 400 });
	}

	const comments = await getComments(product);
	return json({ comments });
};

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) {
		return json({ error: 'Authentication required' }, { status: 401 });
	}

	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}

	if (!body.product || !body.body?.trim()) {
		return json({ error: 'Missing required fields' }, { status: 400 });
	}
	if (body.body.length > 2000) {
		return json({ error: 'Comment too long (max 2000 characters)' }, { status: 400 });
	}

	const allowed = await canComment(locals.user.id);
	if (!allowed) {
		return json({ error: 'Please wait before posting again' }, { status: 429 });
	}

	try {
		const comment = await createComment(
			locals.user.id,
			body.product,
			body.body.trim(),
			body.parent_id
		);
		return json({ comment }, { status: 201 });
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to create comment';
		return json({ error: message }, { status: 400 });
	}
};
