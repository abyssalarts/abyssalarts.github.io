import { redirect } from '@sveltejs/kit';
import { getUserLicenses } from '$lib/server/licenses';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/auth/login');

	const licenses = await getUserLicenses(locals.user.id);

	return {
		title: 'Account',
		user: locals.user,
		licenses
	};
};
