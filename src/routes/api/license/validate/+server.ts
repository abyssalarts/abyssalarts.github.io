import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateLicenseKey, incrementDeviceCount } from '$lib/server/licenses';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);

	if (!body?.license_key || typeof body.license_key !== 'string') {
		return json({ valid: false, reason: 'Missing license_key' }, { status: 400 });
	}

	const result = await validateLicenseKey(body.license_key);

	if (result.valid) {
		await incrementDeviceCount(body.license_key);
		return json({
			valid: true,
			product: result.product,
			device_count: (result.device_count ?? 0) + 1,
			max_devices: result.max_devices
		});
	}

	return json(result);
};
