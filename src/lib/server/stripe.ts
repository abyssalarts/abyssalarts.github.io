import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

let _stripe: Stripe | null | undefined;

export function getStripe(): Stripe | null {
	if (_stripe === undefined) {
		_stripe = env.STRIPE_SECRET_KEY
			? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
			: null;
	}
	return _stripe;
}

export function isStripeConfigured(): boolean {
	return getStripe() !== null;
}
