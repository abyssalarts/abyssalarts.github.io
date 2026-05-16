import { findNode, getChildren, type RouteNode } from '$lib/stores/routes';

export interface CommandResult {
	output: string[];
	action?: 'navigate' | 'clear' | 'none';
	navigateTo?: string;
}

export interface CommandContext {
	user?: { username: string; email: string } | null;
}

export interface CommandDef {
	name: string;
	description: string;
	usage: string;
	execute: (args: string[], currentPath: string, context?: CommandContext) => CommandResult;
}

const commands = new Map<string, CommandDef>();

export function registerCommand(def: CommandDef) {
	commands.set(def.name, def);
}

export function getCommand(name: string): CommandDef | undefined {
	return commands.get(name);
}

export function getAllCommands(): CommandDef[] {
	return Array.from(commands.values());
}

export function parse(input: string): { command: string; args: string[] } {
	const parts = input.trim().split(/\s+/);
	return { command: parts[0] || '', args: parts.slice(1) };
}

export function tabComplete(partial: string, currentPath: string): string[] {
	const trimmed = partial.trimStart();
	const spaceIndex = trimmed.indexOf(' ');

	if (spaceIndex === -1) {
		const matches = Array.from(commands.keys()).filter((name) => name.startsWith(trimmed));
		return matches;
	}

	const cmdName = trimmed.substring(0, spaceIndex);
	const argPart = trimmed.substring(spaceIndex + 1).trimStart();
	const pathCommands = ['cd', 'ls', 'cat', 'man'];

	if (!pathCommands.includes(cmdName)) return [];

	return completePathArg(argPart, currentPath);
}

function completePathArg(partial: string, currentPath: string): string[] {
	let basePath: string;
	let prefix: string;

	if (partial.startsWith('/')) {
		const lastSlash = partial.lastIndexOf('/');
		basePath = partial.substring(0, lastSlash) || '/';
		prefix = partial.substring(lastSlash + 1);
	} else if (partial.startsWith('~/')) {
		const withoutTilde = partial.substring(1);
		const lastSlash = withoutTilde.lastIndexOf('/');
		basePath = withoutTilde.substring(0, lastSlash) || '/';
		prefix = withoutTilde.substring(lastSlash + 1);
	} else if (partial.includes('/')) {
		const resolved = resolvePath(partial, currentPath);
		const lastSlash = resolved.lastIndexOf('/');
		basePath = resolved.substring(0, lastSlash) || '/';
		prefix = partial.substring(partial.lastIndexOf('/') + 1);
	} else {
		basePath = currentPath;
		prefix = partial;
	}

	const children = getChildren(basePath);
	return children
		.filter((c) => c.name.startsWith(prefix))
		.map((c) => c.name);
}

export function resolvePath(target: string, currentPath: string): string {
	if (target === '~' || target === '') return '/';
	if (target.startsWith('~/')) return target.substring(1);
	if (target.startsWith('/')) return target;

	const parts = currentPath === '/' ? [] : currentPath.split('/').filter(Boolean);

	for (const segment of target.split('/')) {
		if (segment === '..') {
			parts.pop();
		} else if (segment !== '.') {
			parts.push(segment);
		}
	}

	return '/' + parts.join('/');
}

export function executeCommand(input: string, currentPath: string, context?: CommandContext): CommandResult {
	const { command, args } = parse(input);
	if (!command) return { output: [] };

	const cmd = getCommand(command);
	if (!cmd) {
		return { output: [`bash: ${command}: command not found`] };
	}

	return cmd.execute(args, currentPath, context);
}
