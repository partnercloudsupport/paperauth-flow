import { redirect, type Actions } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { pages } from 'lib/utils/pages';
import { unauthenticate } from 'flow/blocto';

export const actions: Actions = {
	default: async (event) => {
		await unauthenticate();

		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();

		throw redirect(303, pages.signIn);
	}
};
