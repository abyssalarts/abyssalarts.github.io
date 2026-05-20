import { fail, redirect } from '@sveltejs/kit';
import { getLucia } from '$lib/server/auth';
import { getDb } from '$lib/server/db';
import { verifyPassword } from '$lib/server/crypto';
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

		const result = await getDb().execute({
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

		const validPassword = await verifyPassword(user.hashed_password as string, password);

		if (!validPassword) {
			return fail(400, { message: 'Invalid credentials.', email });
		}

		const lucia = getLucia();
		const session = await lucia.createSession(user.id as string, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/account');
	}
};
