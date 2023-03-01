import type { LayoutServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { pages } from 'lib/utils/pages';

export const load: LayoutServerLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) throw redirect(303, pages.signIn);

	const { data, error } = await supabaseClient
		.from('profiles')
		.select('wallet_address, has_signature')
		.eq('user_id', session?.user.id);

	if (error) throw fail(500, { data: 'Error fetching data' });
	if (!data) throw fail(500, { data: 'No data found' });

	return { profile: data[0] };
};
