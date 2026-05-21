<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { executeCommand, tabComplete } from '$lib/commands/registry';
	import {
		isCommandBarOpen,
		commandHistory,
		commandOutput,
		addToHistory,
		addOutput,
		clearOutput
	} from '$lib/stores/command';

	import '$lib/commands/navigation';
	import '$lib/commands/display';
	import '$lib/commands/easter-eggs';
	import '$lib/commands/auth';

	let inputValue = $state('');
	let historyIndex = $state(-1);
	let inputEl: HTMLInputElement | undefined = $state();
	let outputEl: HTMLDivElement | undefined = $state();

	let currentPath = $derived(
		$page.url.pathname === '/' ? '~' : '~' + $page.url.pathname
	);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === '/' && !$isCommandBarOpen) {
			if (browser && window.innerWidth <= 600) return;
			const active = document.activeElement?.tagName?.toLowerCase();
			if (active === 'input' || active === 'textarea' || active === 'select') return;
			e.preventDefault();
			isCommandBarOpen.set(true);
			historyIndex = -1;
			return;
		}
	}

	function handleInputKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
			return;
		}

		if (e.key === 'Enter') {
			e.preventDefault();
			submit();
			return;
		}

		if (e.key === 'Tab') {
			e.preventDefault();
			handleTab();
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			navigateHistory(-1);
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			navigateHistory(1);
			return;
		}
	}

	function submit() {
		const input = inputValue.trim();
		if (!input) return;

		addToHistory(input);
		historyIndex = -1;

		const rawPath = $page.url.pathname;
		const result = executeCommand(input, rawPath, { user: $page.data.user });

		if (result.action === 'clear') {
			clearOutput();
			inputValue = '';
			return;
		}

		addOutput(`${currentPath}$ ${input}`, result.output);
		inputValue = '';

		if (result.action === 'navigate' && result.navigateTo) {
			close();
			goto(result.navigateTo);
		}

		requestAnimationFrame(() => {
			if (outputEl) outputEl.scrollTop = outputEl.scrollHeight;
		});
	}

	function handleTab() {
		const completions = tabComplete(inputValue, $page.url.pathname);
		if (completions.length === 1) {
			const parts = inputValue.trimStart().split(/\s+/);
			if (parts.length <= 1) {
				inputValue = completions[0] + ' ';
			} else {
				parts[parts.length - 1] = completions[0];
				inputValue = parts.join(' ');
			}
		} else if (completions.length > 1) {
			addOutput(`${currentPath}$ ${inputValue}`, completions);
			requestAnimationFrame(() => {
				if (outputEl) outputEl.scrollTop = outputEl.scrollHeight;
			});
		}
	}

	function navigateHistory(direction: number) {
		const hist = $commandHistory;
		if (hist.length === 0) return;

		if (direction === -1) {
			if (historyIndex === -1) {
				historyIndex = hist.length - 1;
			} else if (historyIndex > 0) {
				historyIndex--;
			}
		} else {
			if (historyIndex >= hist.length - 1) {
				historyIndex = -1;
				inputValue = '';
				return;
			}
			historyIndex++;
		}

		inputValue = hist[historyIndex] ?? '';
	}

	function close() {
		isCommandBarOpen.set(false);
		inputValue = '';
		historyIndex = -1;
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			close();
		}
	}

	$effect(() => {
		if ($isCommandBarOpen && inputEl) {
			requestAnimationFrame(() => inputEl?.focus());
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $isCommandBarOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="command-backdrop" onmousedown={handleBackdropClick} onkeydown={() => {}}>
		<div class="command-bar" role="dialog" aria-label="Command terminal">
			<div class="command-output" bind:this={outputEl}>
				{#each $commandOutput as entry}
					<div class="output-entry">
						<div class="output-command">{entry.command}</div>
						{#each entry.output as line}
							<div class="output-line">{line}</div>
						{/each}
					</div>
				{/each}
			</div>
			<div class="command-input-line">
				<span class="prompt">{currentPath}$&nbsp;</span>
				<input
					bind:this={inputEl}
					bind:value={inputValue}
					onkeydown={handleInputKeydown}
					type="text"
					class="command-input"
					spellcheck="false"
					autocomplete="off"
					autocapitalize="off"
				/>
			</div>
		</div>
	</div>
{/if}

<style>
	.command-backdrop {
		position: fixed;
		inset: 0;
		background: var(--overlay);
		z-index: 9000;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 0;
		animation: backdropIn 0.15s ease-out;
	}

	.command-bar {
		width: 100%;
		max-width: 760px;
		background: var(--surface);
		border: 1px solid var(--amber-faint);
		border-top: none;
		display: flex;
		flex-direction: column;
		max-height: 60vh;
		animation: slideDown 0.15s ease-out;
	}

	.command-output {
		flex: 1;
		overflow-y: auto;
		padding: 12px 16px;
		font-size: 13px;
		line-height: 1.6;
		scrollbar-width: thin;
		scrollbar-color: var(--amber-faint) transparent;
	}

	.output-entry {
		margin-bottom: 8px;
	}

	.output-command {
		color: var(--amber);
	}

	.output-line {
		color: var(--text-body);
		white-space: pre-wrap;
		font-size: 12px;
	}

	.command-input-line {
		display: flex;
		align-items: center;
		padding: 8px 16px;
		border-top: 1px solid var(--amber-faint);
		background: var(--bg);
	}

	.prompt {
		color: var(--amber-dim);
		font-size: 13px;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.command-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--text-body);
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		caret-color: var(--amber);
		padding: 0;
	}

	@keyframes backdropIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideDown {
		from { transform: translateY(-20px); opacity: 0; }
		to { transform: translateY(0); opacity: 1; }
	}
</style>
