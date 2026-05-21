import { redirect } from '@sveltejs/kit';
import { getUserLicenses } from '$lib/server/licenses';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/auth/login');

	const licenses = await getUserLicenses(locals.user.id);

	return {
		title: 'Account',
		description: 'Your Abyssal Arts account dashboard. View licenses, downloads, and account activity.',
		user: locals.user,
		licenses
	};
};
