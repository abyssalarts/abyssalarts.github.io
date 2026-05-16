import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(302, '/account');
	return { title: 'Login' };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		if (!email || !password) {
			return fail(400, { message: 'Email and password required.', email });
		}

		const result = await db.execute({
			sql: 'SELECT * FROM users WHERE email = ?',
			args: [email.toLowerCase()]
		});

		const user = result.rows[0];

		if (!user) {
			return fail(400, { message: 'Invalid credentials.', email });
		}

		if (!user.hashed_password) {
			return fail(400, { message: 'This account uses GitHub login.', email });
		}

		const validPassword = await verify(
			user.hashed_password as string,
			password,
			{ memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 }
		);

		if (!validPassword) {
			return fail(400, { message: 'Invalid credentials.', email });
		}

		const session = await lucia.createSession(user.id as string, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/account');
	}
};
