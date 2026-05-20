import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import type { RequestHandler } from './$types';
import { getStripe, isStripeConfigured } from '$lib/server/stripe';
import { createLicense } from '$lib/server/licenses';
import { env } from '$env/dynamic/private';

const cryptoProvider = Stripe.createSubtleCryptoProvider();

export const POST: RequestHandler = async ({ request }) => {
	const stripe = getStripe();
	if (!isStripeConfigured() || !stripe) {
		return json({ error: 'Stripe not configured' }, { status: 503 });
	}

	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		return json({ error: 'Missing signature' }, { status: 400 });
	}

	if (!env.STRIPE_WEBHOOK_SECRET) {
		return json({ error: 'Webhook secret not configured' }, { status: 503 });
	}

	let event;
	try {
		event = await stripe.webhooks.constructEventAsync(
			body,
			signature,
			env.STRIPE_WEBHOOK_SECRET,
			undefined,
			cryptoProvider
		);
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
