import { registerCommand, resolvePath } from './registry';
import { findNode, getChildren } from '$lib/stores/routes';

registerCommand({
	name: 'cd',
	description: 'Change directory (navigate to page)',
	usage: 'cd <path>',
	execute(args, currentPath) {
		const target = args[0] ?? '';
		const resolved = resolvePath(target, currentPath);
		const node = findNode(resolved);

		if (!node) {
			return { output: [`bash: cd: ${resolved}: No such file or directory`] };
		}

		return {
			output: [],
			action: 'navigate',
			navigateTo: node.path
		};
	}
});

registerCommand({
	name: 'ls',
	description: 'List contents of directory',
	usage: 'ls [path]',
	execute(args, currentPath) {
		const target = args[0];
		const resolved = target ? resolvePath(target, currentPath) : currentPath;
		const node = findNode(resolved);

		if (!node) {
			return { output: [`ls: cannot access '${resolved}': No such file or directory`] };
		}

		const children = getChildren(resolved);
		if (children.length === 0) {
			return { output: [] };
		}

		if (args.includes('-l')) {
			const lines = children.map((c) => {
				const padded = c.name.padEnd(20);
				return `  ${padded}${c.description}`;
			});
			return { output: lines };
		}

		return { output: [children.map((c) => c.name).join('  ')] };
	}
});
