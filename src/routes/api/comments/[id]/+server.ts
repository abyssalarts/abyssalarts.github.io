import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateComment, deleteComment } from '$lib/server/comments';

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
	if (!locals.user) {
		return json({ error: 'Authentication required' }, { status: 401 });
	}

	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}

	if (!body.body?.trim()) {
		return json({ error: 'Missing body' }, { status: 400 });
	}
	if (body.body.length > 2000) {
		return json({ error: 'Comment too long (max 2000 characters)' }, { status: 400 });
	}

	try {
		await updateComment(params.id, locals.user.id, body.body.trim());
		return json({ success: true });
	} catch {
		return json({ error: 'Comment not found or not yours' }, { status: 403 });
	}
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		return json({ error: 'Authentication required' }, { status: 401 });
	}

	try {
		await deleteComment(params.id, locals.user.id);
		return json({ success: true });
	} catch {
		return json({ error: 'Comment not found or not yours' }, { status: 403 });
	}
};
