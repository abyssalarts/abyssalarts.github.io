import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { stripe, isStripeConfigured } from '$lib/server/stripe';
import { getUserLicenseForProduct } from '$lib/server/licenses';

export const POST: RequestHandler = async ({ locals, request, url }) => {
	if (!locals.user) {
		return json({ error: 'Authentication required' }, { status: 401 });
	}

	if (!isStripeConfigured() || !stripe) {
		return json({ error: 'Stripe is not configured. Payment processing unavailable.' }, { status: 503 });
	}

	const body = await request.json();
	const product = body.product;

	if (product !== 'rift') {
		return json({ error: 'Unknown product' }, { status: 400 });
	}

	const existing = await getUserLicenseForProduct(locals.user.id, product);
	if (existing) {
		return json({ error: 'You already own a license for this product' }, { status: 409 });
	}

	const priceId = process.env.STRIPE_RIFT_PRICE_ID;
	if (!priceId) {
		return json({ error: 'Product pricing not configured' }, { status: 503 });
	}

	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		payment_method_types: ['card'],
		line_items: [{ price: priceId, quantity: 1 }],
		success_url: `${url.origin}/account?purchase=success`,
		cancel_url: `${url.origin}/products/rift?purchase=cancelled`,
		customer_email: locals.user.email,
		metadata: {
			userId: locals.user.id,
			product: product
		}
	});

	return json({ url: session.url });
};
