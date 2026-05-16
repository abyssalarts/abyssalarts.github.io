export interface RouteNode {
	path: string;
	name: string;
	description: string;
	children?: RouteNode[];
}

export const routeTree: RouteNode = {
	path: '/',
	name: '~',
	description: 'Abyssal Arts — home',
	children: [
		{
			path: '/products',
			name: 'products',
			description: 'Apps and tools built from the deep end',
			children: [
				{
					path: '/products/brain-dump',
					name: 'brain-dump',
					description: 'Voice-first thought capture — $4.99'
				},
				{
					path: '/products/rift',
					name: 'rift',
					description: 'Terminal-aesthetic development environment'
				}
			]
		},
		{
			path: '/about',
			name: 'about',
			description: 'Who we are and why we build'
		},
		{
			path: '/privacy',
			name: 'privacy',
			description: 'Privacy policies',
			children: [
				{
					path: '/privacy/brain-dump',
					name: 'brain-dump',
					description: 'Brain Dump privacy policy'
				}
			]
		},
		{
			path: '/auth',
			name: 'auth',
			description: 'Authentication',
			children: [
				{ path: '/auth/login', name: 'login', description: 'Log in to your account' },
				{ path: '/auth/register', name: 'register', description: 'Create a new account' }
			]
		},
		{
			path: '/account',
			name: 'account',
			description: 'Your account dashboard',
			children: [
				{ path: '/account/settings', name: 'settings', description: 'Account settings' }
			]
		},
		{
			path: '/feedback',
			name: 'feedback',
			description: 'Submit bug reports, feature requests, or general feedback'
		}
	]
};

export function findNode(path: string, node: RouteNode = routeTree): RouteNode | null {
	const normalized = path === '/' ? '/' : path.replace(/\/$/, '');
	if (node.path === normalized) return node;
	if (node.children) {
		for (const child of node.children) {
			const found = findNode(normalized, child);
			if (found) return found;
		}
	}
	return null;
}

export function getChildren(path: string): RouteNode[] {
	const node = findNode(path);
	return node?.children ?? [];
}

export function getPathSegments(path: string): { name: string; path: string }[] {
	if (path === '/') return [{ name: '~', path: '/' }];

	const segments: { name: string; path: string }[] = [{ name: '~', path: '/' }];
	const parts = path.split('/').filter(Boolean);
	let accumulated = '';

	for (const part of parts) {
		accumulated += '/' + part;
		const node = findNode(accumulated);
		segments.push({
			name: node?.name ?? part,
			path: accumulated
		});
	}

	return segments;
}
