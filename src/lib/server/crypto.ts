const ITERATIONS = 100000;
const HASH_ALGO = 'SHA-256';
const KEY_LENGTH = 256;
const SALT_LENGTH = 16;

function toHex(bytes: Uint8Array): string {
	return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function fromHex(hex: string): Uint8Array {
	return new Uint8Array(hex.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
}

export async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));

	const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, [
		'deriveBits'
	]);

	const hash = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt, iterations: ITERATIONS, hash: HASH_ALGO },
		keyMaterial,
		KEY_LENGTH
	);

	return `pbkdf2:${ITERATIONS}:${toHex(salt)}:${toHex(new Uint8Array(hash))}`;
}

export async function verifyPassword(storedHash: string, password: string): Promise<boolean> {
	const parts = storedHash.split(':');
	if (parts[0] !== 'pbkdf2' || parts.length !== 4) return false;

	const iterations = parseInt(parts[1], 10);
	const salt = fromHex(parts[2]);
	const expectedHash = parts[3];

	const encoder = new TextEncoder();
	const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, [
		'deriveBits'
	]);

	const hash = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt, iterations, hash: HASH_ALGO },
		keyMaterial,
		KEY_LENGTH
	);

	return toHex(new Uint8Array(hash)) === expectedHash;
}

export function generateId(byteLength: number = 8): string {
	return toHex(crypto.getRandomValues(new Uint8Array(byteLength)));
}

export function generateRandomHex(byteLength: number): string {
	return toHex(crypto.getRandomValues(new Uint8Array(byteLength)));
}
