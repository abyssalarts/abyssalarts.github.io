import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'abyssal_booted';

function getInitialState(): boolean {
	if (!browser) return true;
	return localStorage.getItem(STORAGE_KEY) === 'true';
}

export const hasBooted = writable<boolean>(getInitialState());

export function bootComplete(): void {
	hasBooted.set(true);
	if (browser) {
		localStorage.setItem(STORAGE_KEY, 'true');
	}
}

export function resetBoot(): void {
	hasBooted.set(false);
	if (browser) {
		localStorage.removeItem(STORAGE_KEY);
	}
}
