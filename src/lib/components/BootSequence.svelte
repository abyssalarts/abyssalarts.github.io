<script lang="ts">
	import { hasBooted, bootComplete } from '$lib/stores/boot';
	import { browser } from '$app/environment';

	interface BootLine {
		text: string;
		delay: number;
		className?: string;
	}

	const bootLines: BootLine[] = [
		{ text: 'ABYSSAL ARTS BIOS v2.1', delay: 100 },
		{ text: 'Checking memory... 8192K OK', delay: 100 },
		{ text: 'Detecting peripherals...', delay: 80 },
		{ text: '  display: AMBER-CRT-1', delay: 60 },
		{ text: '  input: standard', delay: 60 },
		{ text: '  network: CONNECTED', delay: 80 },
		{ text: 'Loading /etc/abyssal/philosophy.conf... OK', delay: 120 },
		{ text: 'Mounting /products... 2 entries found', delay: 100 },
		{ text: 'Mounting /about... OK', delay: 80 },
		{ text: 'Mounting /privacy... OK', delay: 80 },
		{ text: '', delay: 200 },
		{ text: '╔══════════════════════════════════════════════════╗', delay: 40, className: 'notice-box' },
		{ text: '║  NOTICE: This terminal sets 0 cookies,           ║', delay: 40, className: 'notice-box' },
		{ text: '║  runs 0 trackers, sends 0 analytics.             ║', delay: 40, className: 'notice-box' },
		{ text: '║  There is nothing to consent to.                 ║', delay: 40, className: 'notice-box' },
		{ text: '╚══════════════════════════════════════════════════╝', delay: 300, className: 'notice-box' },
		{ text: '', delay: 200 },
		{ text: 'System ready.', delay: 200 },
		{ text: 'guest@abyssal-arts:~$ _', delay: 500, className: 'prompt' },
	];

	let visibleCount = $state(0);
	let fadingOut = $state(false);
	let hidden = $state(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	function skip() {
		if (fadingOut || hidden) return;
		if (timer) clearTimeout(timer);
		visibleCount = bootLines.length;
		startFadeOut();
	}

	function startFadeOut() {
		fadingOut = true;
		setTimeout(() => {
			bootComplete();
			hidden = true;
		}, 300);
	}

	function showNextLine() {
		if (visibleCount >= bootLines.length) {
			startFadeOut();
			return;
		}
		const line = bootLines[visibleCount];
		visibleCount++;
		timer = setTimeout(showNextLine, line.delay);
	}

	$effect(() => {
		if (!browser || $hasBooted) {
			hidden = true;
			return;
		}

		timer = setTimeout(showNextLine, 200);

		return () => {
			if (timer) clearTimeout(timer);
		};
	});
</script>

{#if !hidden}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="boot-overlay"
		class:fading={fadingOut}
		onclick={skip}
		onkeydown={skip}
	>
		<div class="boot-content">
			{#each bootLines.slice(0, visibleCount) as line}
				<div class="boot-line {line.className ?? ''}">{line.text}</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.boot-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--bg);
		z-index: 10000;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		opacity: 1;
		transition: opacity 300ms ease-out;
		cursor: pointer;
	}

	.boot-overlay.fading {
		opacity: 0;
	}

	.boot-content {
		padding: 40px;
		max-width: 760px;
		width: 100%;
	}

	.boot-line {
		font-size: 14px;
		color: var(--amber);
		line-height: 1.6;
		white-space: pre;
		min-height: 1.6em;
	}

	.notice-box {
		color: var(--amber-dim);
	}

	.prompt {
		color: var(--text-secondary);
	}

	@media (max-width: 600px) {
		.boot-content {
			padding: 24px 16px;
		}

		.boot-line {
			font-size: 11px;
			white-space: pre-wrap;
			word-break: break-all;
		}
	}
</style>
