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
	`);
}

initDb();
