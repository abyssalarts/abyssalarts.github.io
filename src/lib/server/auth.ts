import { Lucia } from 'lucia';
import { LibSQLAdapter } from '@lucia-auth/adapter-sqlite';
import { GitHub } from 'arctic';
import { getDb } from './db';
import { env } from '$env/dynamic/private';

let _lucia: Lucia;
let _github: GitHub;

export function getLucia(): Lucia {
	if (!_lucia) {
		const adapter = new LibSQLAdapter(getDb(), {
			user: 'users',
			session: 'sessions'
		});
		_lucia = new Lucia(adapter, {
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
	}
	return _lucia;
}

export function getGitHub(): GitHub {
	if (!_github) {
		_github = new GitHub(
			env.GITHUB_CLIENT_ID ?? '',
			env.GITHUB_CLIENT_SECRET ?? '',
			null
		);
	}
	return _github;
}

declare module 'lucia' {
	interface Register {
		Lucia: ReturnType<typeof getLucia>;
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
