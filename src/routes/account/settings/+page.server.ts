import { fail, redirect } from '@sveltejs/kit';
import { hash, verify } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

const argon2Options = { memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 };

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/auth/login');
	return { title: 'Settings', user: locals.user };
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.user) redirect(302, '/auth/login');

		const formData = await request.formData();
		const username = formData.get('username')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';

		if (!email || !email.includes('@')) {
			return fail(400, { profileError: 'Valid email required.', username, email });
		}

		if (username.length < 3 || username.length > 32 || !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(username)) {
			return fail(400, {
				profileError: 'Username must be 3-32 characters, lowercase alphanumeric and hyphens.',
				username,
				email
			});
		}

		try {
			await db.execute({
				sql: 'UPDATE users SET username = ?, email = ? WHERE id = ?',
				args: [username.toLowerCase(), email.toLowerCase(), locals.user.id]
			});
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : '';
			if (msg.includes('UNIQUE')) {
				return fail(400, { profileError: 'Username or email already taken.', username, email });
			}
			return fail(500, { profileError: 'Failed to update profile.', username, email });
		}

		return { profileSuccess: true };
	},

	updatePassword: async ({ request, locals }) => {
		if (!locals.user) redirect(302, '/auth/login');

		const formData = await request.formData();
		const currentPassword = formData.get('currentPassword')?.toString() ?? '';
		const newPassword = formData.get('newPassword')?.toString() ?? '';
		const confirmPassword = formData.get('confirmPassword')?.toString() ?? '';

		if (!currentPassword || !newPassword) {
			return fail(400, { passwordError: 'All password fields required.' });
		}

		if (newPassword.length < 8) {
			return fail(400, { passwordError: 'New password must be at least 8 characters.' });
		}

		if (newPassword !== confirmPassword) {
			return fail(400, { passwordError: 'Passwords do not match.' });
		}

		const result = await db.execute({
			sql: 'SELECT hashed_password FROM users WHERE id = ?',
			args: [locals.user.id]
		});

		const user = result.rows[0];
		if (!user?.hashed_password) {
			return fail(400, { passwordError: 'This account uses GitHub login. No password to change.' });
		}

		const validCurrent = await verify(user.hashed_password as string, currentPassword, argon2Options);
		if (!validCurrent) {
			return fail(400, { passwordError: 'Current password is incorrect.' });
		}

		const newHash = await hash(newPassword, argon2Options);
		await db.execute({
			sql: 'UPDATE users SET hashed_password = ? WHERE id = ?',
			args: [newHash, locals.user.id]
		});

		return { passwordSuccess: true };
	}
};
