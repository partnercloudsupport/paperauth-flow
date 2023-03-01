import type { RequestHandler } from './$types';
import { PUBLIC_STRIPE_API_VERSION } from '$env/static/public';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { pages } from 'lib/utils/pages';
import Stripe from 'stripe';

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	// @ts-ignore
	apiVersion: PUBLIC_STRIPE_API_VERSION,
	typescript: true
});

export const POST: RequestHandler = async ({ request, url }) => {
	const currentDomain = `${url.protocol}//${url.host}`;

	const data = await request.json();
	const customerId: string = data.customerId;

	const portal = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: `${currentDomain + pages.user}`
	});

	return new Response(JSON.stringify({ url: portal.url }), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
};
