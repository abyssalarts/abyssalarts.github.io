import { getUserLicenseForProduct } from '$lib/server/licenses';
import { getComments } from '$lib/server/comments';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	let hasLicense = false;
	let licenseKey: string | undefined;

	if (user) {
		const license = await getUserLicenseForProduct(user.id, 'rift');
		if (license) {
			hasLicense = true;
			licenseKey = license.license_key;
		}
	}

	const comments = await getComments('rift');

	return {
		title: 'Rift',
		description: 'A terminal-aesthetic development environment built on Rust, Tauri, and Svelte. Claude Code integration, modular pane system, skills marketplace.',
		isAuthenticated: !!user,
		hasLicense,
		licenseKey,
		comments
	};
};
