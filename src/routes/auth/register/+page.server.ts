import { fail, redirect } from '@sveltejs/kit';
import { getLucia } from '$lib/server/auth';
import { getDb } from '$lib/server/db';
import { hashPassword, generateId } from '$lib/server/crypto';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(302, '/account');
	return { title: 'Register' };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim() ?? '';
		const username = formData.get('username')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		if (!email || !email.includes('@')) {
			return fail(400, { message: 'Valid email address required.', email, username });
		}

		if (username.length < 3 || username.length > 32 || !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(username)) {
			return fail(400, {
				message: 'Username must be 3-32 characters, lowercase alphanumeric and hyphens only.',
				email,
				username
			});
		}

		if (password.length < 8) {
			return fail(400, { message: 'Password must be at least 8 characters.', email, username });
		}

		const passwordHash = await hashPassword(password);
		const userId = generateId(10);

		try {
			await getDb().execute({
				sql: 'INSERT INTO users (id, email, username, hashed_password, created_at) VALUES (?, ?, ?, ?, ?)',
				args: [userId, email.toLowerCase(), username.toLowerCase(), passwordHash, Math.floor(Date.now() / 1000)]
			});
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : '';
			if (msg.includes('UNIQUE') && msg.includes('email')) {
				return fail(400, { message: 'Email already registered.', email, username });
			}
			if (msg.includes('UNIQUE') && msg.includes('username')) {
				return fail(400, { message: 'Username already taken.', email, username });
			}
			return fail(400, { message: 'Email or username already taken.', email, username });
		}

		const lucia = getLucia();
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/account');
	}
};
