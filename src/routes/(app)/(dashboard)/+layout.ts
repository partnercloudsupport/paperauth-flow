import { redirect } from '@sveltejs/kit';
import { pages } from 'lib/utils/pages';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session) throw redirect(303, pages.signIn);
};
