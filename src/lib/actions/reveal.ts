export function reveal(node: HTMLElement): { destroy: () => void } {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			}
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -40px 0px'
		}
	);

	node.classList.add('reveal');
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
