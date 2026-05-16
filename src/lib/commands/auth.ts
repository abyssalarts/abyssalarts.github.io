import { registerCommand, type CommandResult } from './registry';

registerCommand({
	name: 'login',
	description: 'Navigate to login page',
	usage: 'login',
	execute: (_args, _currentPath, context): CommandResult => {
		if (context?.user) {
			return { output: [`Already logged in as ${context.user.username}.`] };
		}
		return {
			output: ['Redirecting to login...'],
			action: 'navigate',
			navigateTo: '/auth/login'
		};
	}
});

registerCommand({
	name: 'register',
	description: 'Navigate to registration page',
	usage: 'register',
	execute: (_args, _currentPath, context): CommandResult => {
		if (context?.user) {
			return { output: [`Already logged in as ${context.user.username}.`] };
		}
		return {
			output: ['Redirecting to registration...'],
			action: 'navigate',
			navigateTo: '/auth/register'
		};
	}
});

registerCommand({
	name: 'logout',
	description: 'End current session',
	usage: 'logout',
	execute: (_args, _currentPath, context): CommandResult => {
		if (!context?.user) {
			return { output: ['Not logged in.'] };
		}
		return {
			output: [`Ending session for ${context.user.username}...`],
			action: 'navigate',
			navigateTo: '/account'
		};
	}
});
