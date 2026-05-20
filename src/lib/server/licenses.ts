import { generateId, generateRandomHex } from './crypto';
import { getDb } from './db';

export interface License {
	id: string;
	user_id: string;
	product: string;
	license_key: string;
	stripe_session_id: string | null;
	device_count: number;
	max_devices: number;
	created_at: number;
	revoked: number;
}

export interface ValidationResult {
	valid: boolean;
	product?: string;
	reason?: string;
	device_count?: number;
	max_devices?: number;
}

export function generateLicenseKey(product: string): string {
	const prefix = product.toUpperCase();
	const segments = Array.from({ length: 4 }, () => generateRandomHex(2).toUpperCase());
	return `${prefix}-${segments.join('-')}`;
}

export async function createLicense(
	userId: string,
	product: string,
	stripeSessionId?: string
): Promise<License> {
	const id = generateId();
	const licenseKey = generateLicenseKey(product);
	const now = Math.floor(Date.now() / 1000);

	await getDb().execute({
		sql: `INSERT INTO licenses (id, user_id, product, license_key, stripe_session_id, created_at)
		      VALUES (?, ?, ?, ?, ?, ?)`,
		args: [id, userId, product, licenseKey, stripeSessionId ?? null, now]
	});

	return {
		id,
		user_id: userId,
		product,
		license_key: licenseKey,
		stripe_session_id: stripeSessionId ?? null,
		device_count: 0,
		max_devices: 3,
		created_at: now,
		revoked: 0
	};
}

export async function getUserLicenses(userId: string): Promise<License[]> {
	const result = await getDb().execute({
		sql: 'SELECT * FROM licenses WHERE user_id = ? ORDER BY created_at DESC',
		args: [userId]
	});
	return result.rows as unknown as License[];
}

export async function getUserLicenseForProduct(
	userId: string,
	product: string
): Promise<License | null> {
	const result = await getDb().execute({
		sql: 'SELECT * FROM licenses WHERE user_id = ? AND product = ? AND revoked = 0 LIMIT 1',
		args: [userId, product]
	});
	const row = result.rows[0];
	return row ? (row as unknown as License) : null;
}

export async function validateLicenseKey(key: string): Promise<ValidationResult> {
	const result = await getDb().execute({
		sql: 'SELECT * FROM licenses WHERE license_key = ?',
		args: [key]
	});

	const license = result.rows[0] as unknown as License | undefined;

	if (!license) {
		return { valid: false, reason: 'Invalid license key' };
	}

	if (license.revoked) {
		return { valid: false, reason: 'License has been revoked' };
	}

	if (license.device_count >= license.max_devices) {
		return {
			valid: false,
			reason: `Device limit reached (${license.device_count}/${license.max_devices})`,
			device_count: license.device_count,
			max_devices: license.max_devices
		};
	}

	return {
		valid: true,
		product: license.product,
		device_count: license.device_count,
		max_devices: license.max_devices
	};
}

export async function incrementDeviceCount(key: string): Promise<void> {
	await getDb().execute({
		sql: 'UPDATE licenses SET device_count = device_count + 1 WHERE license_key = ?',
		args: [key]
	});
}
