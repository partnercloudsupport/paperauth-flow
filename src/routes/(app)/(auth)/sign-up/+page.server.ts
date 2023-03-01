import Stripe from 'stripe';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { pages } from 'lib/utils/pages';
import { AuthApiError } from '@supabase/supabase-js';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { PUBLIC_STRIPE_API_VERSION } from '$env/static/public';

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	// @ts-ignore
	apiVersion: PUBLIC_STRIPE_API_VERSION,
	typescript: true
});

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const actions: Actions = {
	default: async (event) => {
		const { request, url } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const honeypot = formData.get('phone-number') as string;
		const fName = formData.get('first-name') as string;
		const lName = formData.get('last-name') as string;

		if (honeypot) {
			return fail(500, { email, fName, lName, message: 'Something went wrong' });
		}

		if (!email || !password || !fName || !lName) {
			return fail(400, { email, fName, lName, missing: true });
		}

		const customer = await stripe.customers.create({
			email: email,
			name: `${capitalizeFirstLetter(fName)} ${capitalizeFirstLetter(lName)}`
		});

		const { data, error } = await supabaseClient.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					first_name: capitalizeFirstLetter(fName),
					last_name: capitalizeFirstLetter(lName),
					stripe_customer_id: customer.id ?? ''
				},
				emailRedirectTo: url.origin + pages.signIn
			}
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, { email, fName, lName, message: error.message });
			}
			return fail(500, { email, fName, lName, message: error.message });
		}

		return {
			success: true
		};
	}
};
