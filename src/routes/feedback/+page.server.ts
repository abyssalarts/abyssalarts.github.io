import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { createFeedback, canSubmitFeedback } from '$lib/server/feedback';

export const load: PageServerLoad = async () => {
	return { title: 'Feedback' };
};

export const actions: Actions = {
	default: async ({ request, locals, getClientAddress }) => {
		const formData = await request.formData();
		const product = formData.get('product') as string;
		const type = formData.get('type') as string;
		const body = formData.get('body') as string;
		const email = formData.get('email') as string | null;

		const validProducts = ['brain-dump', 'rift', 'website', 'other'];
		const validTypes = ['bug', 'feature', 'general'];

		if (!validProducts.includes(product)) {
			return fail(400, { message: 'Invalid product', product, type, body });
		}
		if (!validTypes.includes(type)) {
			return fail(400, { message: 'Invalid type', product, type, body });
		}
		if (!body?.trim() || body.trim().length < 10) {
			return fail(400, { message: 'Feedback must be at least 10 characters', product, type, body });
		}
		if (body.length > 5000) {
			return fail(400, { message: 'Feedback too long (max 5000 characters)', product, type, body });
		}
		if (!locals.user && !email?.trim()) {
			return fail(400, { message: 'Email required when not logged in', product, type, body });
		}

		const identifier = locals.user?.id ?? getClientAddress();
		const allowed = await canSubmitFeedback(identifier);
		if (!allowed) {
			return fail(429, { message: 'Please wait before submitting again', product, type, body });
		}

		await createFeedback(product, type, body.trim(), locals.user?.id, email?.trim() || undefined);
		return { success: true };
	}
};
