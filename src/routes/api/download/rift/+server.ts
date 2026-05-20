import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserLicenseForProduct } from '$lib/server/licenses';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return json({ error: 'Authentication required' }, { status: 401 });
	}

	const license = await getUserLicenseForProduct(locals.user.id, 'rift');
	if (!license) {
		return json({ error: 'Valid Rift license required' }, { status: 403 });
	}

	if (!env.GITHUB_PAT) {
		return json({
			message: 'Download proxy ready. Rift binary not yet available.',
			license_key: license.license_key,
			status: 'awaiting-release'
		});
	}

	return json({
		message: 'Download proxy ready.',
		status: 'awaiting-release'
	});
};
