import { readable } from 'svelte/store';
import { browser } from '$app/environment';

const MAX_DEPTH = 200;

export const depth = readable(0, (set) => {
	if (!browser) return;

	function onScroll() {
		const scrollY = window.scrollY;
		const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
		if (maxScroll <= 0) {
			set(0);
			return;
		}
		const ratio = Math.min(scrollY / maxScroll, 1);
		set(Math.round(ratio * MAX_DEPTH * 10) / 10);
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	return () => {
		window.removeEventListener('scroll', onScroll);
	};
});
