import type { RequestHandler } from './$types';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { PUBLIC_STRIPE_API_VERSION } from '$env/static/public';
import { pages } from 'lib/utils/pages';

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	// @ts-ignore
	apiVersion: PUBLIC_STRIPE_API_VERSION,
	typescript: true
});

export const POST: RequestHandler = async ({ request, url }) => {
	const currentDomain = `${url.protocol}//${url.host}`;

	const data = await request.json();
	const lookupKeys: string[] = data.lookupKeys;

	const prices = await stripe.prices.list({
		lookup_keys: lookupKeys,
		expand: ['data.product']
	});

	const checkout = await stripe.checkout.sessions.create({
		mode: 'subscription',
		line_items: [
			{
				price: prices.data[0].id,
				quantity: 1
			}
		],
		billing_address_collection: 'auto',
		success_url: `${currentDomain}${pages.success}`,
		cancel_url: `${currentDomain}${pages.cancel}`
	});

	return new Response(JSON.stringify({ url: checkout.url }), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
};
