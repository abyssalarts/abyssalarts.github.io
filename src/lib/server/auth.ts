import { Lucia } from 'lucia';
import { LibSQLAdapter } from '@lucia-auth/adapter-sqlite';
import { GitHub } from 'arctic';
import { db } from './db';

const adapter = new LibSQLAdapter(db, {
	user: 'users',
	session: 'sessions'
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !import.meta.env.DEV
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			email: attributes.email,
			githubId: attributes.github_id,
			avatarUrl: attributes.avatar_url,
			createdAt: attributes.created_at
		};
	}
});

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID ?? '',
	process.env.GITHUB_CLIENT_SECRET ?? '',
	null
);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
	email: string;
	github_id: string | null;
	avatar_url: string | null;
	created_at: number;
}
