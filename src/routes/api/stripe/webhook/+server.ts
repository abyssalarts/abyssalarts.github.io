import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { stripe, isStripeConfigured } from '$lib/server/stripe';
import { createLicense } from '$lib/server/licenses';

export const POST: RequestHandler = async ({ request }) => {
	if (!isStripeConfigured() || !stripe) {
		return json({ error: 'Stripe not configured' }, { status: 503 });
	}

	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		return json({ error: 'Missing signature' }, { status: 400 });
	}

	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!webhookSecret) {
		return json({ error: 'Webhook secret not configured' }, { status: 503 });
	}

	let event;
	try {
		event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
	} catch {
		return json({ error: 'Invalid signature' }, { status: 400 });
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object;
		const userId = session.metadata?.userId;
		const product = session.metadata?.product;

		if (userId && product) {
			await createLicense(userId, product, session.id);
		}
	}

	return json({ received: true });
};
