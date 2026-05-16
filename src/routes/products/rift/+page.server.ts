import { getUserLicenseForProduct } from '$lib/server/licenses';
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

	return {
		title: 'Rift',
		isAuthenticated: !!user,
		hasLicense,
		licenseKey
	};
};
