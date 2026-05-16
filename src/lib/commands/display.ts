import { registerCommand, getAllCommands, getCommand } from './registry';
import { getHistory } from '$lib/stores/command';

registerCommand({
	name: 'help',
	description: 'Show this help message',
	usage: 'help',
	execute() {
		const cmds = getAllCommands();
		const lines: string[] = ['', 'Available commands:', ''];

		for (const cmd of cmds) {
			const padded = cmd.usage.padEnd(22);
			lines.push(`  ${padded}${cmd.description}`);
		}

		lines.push('', 'Press / to open this terminal. Tab to autocomplete. Esc to close.');
		return { output: lines };
	}
});

registerCommand({
	name: 'man',
	description: 'Show manual page for a topic',
	usage: 'man <topic>',
	execute(args) {
		const topic = args[0];
		if (!topic) {
			return { output: ['What manual page do you want?', 'Usage: man <topic>'] };
		}

		const manPages: Record<string, string[]> = {
			'brain-dump': [
				'',
				'BRAIN-DUMP(1)          Abyssal Arts Manual          BRAIN-DUMP(1)',
				'',
				'NAME',
				'       brain-dump — voice-first thought capture',
				'',
				'SYNOPSIS',
				'       brain-dump [--voice] [--ai-categorize] [--export FORMAT]',
				'',
				'DESCRIPTION',
				'       Captures thoughts before they disappear. Voice-first input',
				'       with AI-powered categorization and a visual Brain Web that',
				'       maps how your ideas connect. Exports to Obsidian, Markdown,',
				'       JSON, or local backup.',
				'',
				'OPTIONS',
				'       --offline     Works entirely offline (default: true)',
				'       --privacy     No data leaves device (default: enforced)',
				'       --price       $4.99, once. Yours forever.',
				'       --ads         0 (not configurable)',
				'',
				'SEE ALSO',
				'       rift(1), anchor(1)',
				''
			],
			rift: [
				'',
				'RIFT(1)                Abyssal Arts Manual                RIFT(1)',
				'',
				'NAME',
				'       rift — terminal-aesthetic development environment',
				'',
				'SYNOPSIS',
				'       rift [--project PATH] [--skill NAME]',
				'',
				'DESCRIPTION',
				'       A code editor built on Rust, Tauri, and Svelte with Claude',
				'       Code integration, modular pane system, skills marketplace,',
				'       and self-healing hooks. The IDE that improves itself.',
				'',
				'OPTIONS',
				'       --aesthetic   Terminal amber on dark (default: enforced)',
				'       --panes      Modular, detachable, multi-monitor',
				'       --agents     Built-in Claude Code agent teams',
				'',
				'STATUS',
				'       In development. Coming soon.',
				''
			]
		};

		if (manPages[topic]) {
			return { output: manPages[topic] };
		}

		const cmd = getCommand(topic);
		if (cmd) {
			return {
				output: [
					'',
					`${topic.toUpperCase()}(1)          Abyssal Arts Commands          ${topic.toUpperCase()}(1)`,
					'',
					'NAME',
					`       ${cmd.name} — ${cmd.description}`,
					'',
					'USAGE',
					`       ${cmd.usage}`,
					''
				]
			};
		}

		return { output: [`No manual entry for ${topic}`] };
	}
});

registerCommand({
	name: 'cat',
	description: 'Display page content',
	usage: 'cat <page>',
	execute(args) {
		const target = args[0];
		if (!target) {
			return { output: ['cat: missing operand', 'Usage: cat <page>'] };
		}

		const pages: Record<string, string[]> = {
			about: [
				'Abyssal Arts is a solo Android development studio based in Florida.',
				'One developer. No office. No investors.',
				'',
				'The name comes from the deep end — the place where the mind goes',
				'when it\'s quiet and the thoughts are too honest to say out loud.',
				'',
				'Use "cd /about" to read the full page.'
			],
			privacy: [
				'This site collects no personal data.',
				'No cookies. No trackers. No analytics.',
				'',
				'Use "cd /privacy" to read the full policy.'
			]
		};

		if (pages[target]) {
			return { output: pages[target] };
		}

		return { output: [`cat: ${target}: No such file or directory`] };
	}
});

registerCommand({
	name: 'history',
	description: 'Show command history',
	usage: 'history',
	execute() {
		const hist = getHistory();
		if (hist.length === 0) {
			return { output: ['  No commands in history.'] };
		}

		const lines = hist.map((cmd, i) => `  ${String(i + 1).padStart(4)}  ${cmd}`);
		return { output: lines };
	}
});

registerCommand({
	name: 'clear',
	description: 'Clear terminal output',
	usage: 'clear',
	execute() {
		return { output: [], action: 'clear' };
	}
});
