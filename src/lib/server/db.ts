import { createClient } from '@libsql/client';

export const db = createClient({
	url: 'file:local.db'
});

async function initDb() {
	await db.executeMultiple(`
		CREATE TABLE IF NOT EXISTS users (
			id TEXT PRIMARY KEY,
			email TEXT UNIQUE NOT NULL,
			username TEXT UNIQUE NOT NULL,
			hashed_password TEXT,
			github_id TEXT UNIQUE,
			created_at INTEGER NOT NULL DEFAULT (unixepoch()),
			avatar_url TEXT
		);

		CREATE TABLE IF NOT EXISTS sessions (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			expires_at INTEGER NOT NULL
		);

		CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);

		CREATE TABLE IF NOT EXISTS licenses (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			product TEXT NOT NULL,
			license_key TEXT UNIQUE NOT NULL,
			stripe_session_id TEXT,
			device_count INTEGER NOT NULL DEFAULT 0,
			max_devices INTEGER NOT NULL DEFAULT 3,
			created_at INTEGER NOT NULL DEFAULT (unixepoch()),
			revoked INTEGER NOT NULL DEFAULT 0
		);

		CREATE INDEX IF NOT EXISTS licenses_user_id_idx ON licenses(user_id);
		CREATE INDEX IF NOT EXISTS licenses_license_key_idx ON licenses(license_key);
	`);
}

initDb();
