import { writable, get } from 'svelte/store';

export const isCommandBarOpen = writable(false);
export const commandHistory = writable<string[]>([]);
export const commandOutput = writable<Array<{ command: string; output: string[] }>>([]);

export function addToHistory(cmd: string) {
	commandHistory.update((h) => [...h, cmd]);
}

export function addOutput(command: string, output: string[]) {
	commandOutput.update((o) => [...o, { command, output }]);
}

export function clearOutput() {
	commandOutput.set([]);
}

export function getHistory(): string[] {
	return get(commandHistory);
}
