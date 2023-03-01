import { fail, redirect, type Actions } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { pages } from 'lib/utils/pages';
import { AuthApiError } from '@supabase/supabase-js';

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { email, missing: true });
		}

		const { error } = await supabaseClient.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			console.error(error);
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, { email, message: error.message });
			}

			return fail(500, { email, message: error.message });
		}

		throw redirect(303, pages.dashboard);
	}
};
