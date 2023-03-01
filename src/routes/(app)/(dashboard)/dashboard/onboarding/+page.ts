import { redirect } from '@sveltejs/kit';
import { pages } from 'lib/utils/pages';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ parent }) => {
	const { profile } = await parent();

	if (profile.wallet_address && profile.has_signature) throw redirect(303, pages.dashboard);
};
