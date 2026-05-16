import { registerCommand, type CommandContext } from './registry';

const sessionStart = Date.now();

function formatUptime(): string {
	const elapsed = Date.now() - sessionStart;
	const seconds = Math.floor(elapsed / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	if (hours > 0) {
		return `up ${hours} hour${hours !== 1 ? 's' : ''}, ${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`;
	}
	if (minutes > 0) {
		return `up ${minutes} minute${minutes !== 1 ? 's' : ''}, ${seconds % 60} second${seconds % 60 !== 1 ? 's' : ''}`;
	}
	return `up ${seconds} second${seconds !== 1 ? 's' : ''}`;
}

registerCommand({
	name: 'sudo',
	description: 'Run command as root',
	usage: 'sudo <cmd>',
	execute(_args: string[], _currentPath: string, context?: CommandContext) {
		const username = context?.user?.username ?? 'guest';
		return {
			output: [
				`[sudo] password for ${username}: ********`,
				`${username} is not in the sudoers file.`,
				'This incident will be reported.'
			]
		};
	}
});

registerCommand({
	name: 'rm',
	description: 'Remove files',
	usage: 'rm <path>',
	execute(args) {
		const target = args.join(' ');
		if (target.includes('-rf') || target === '/') {
			return {
				output: [
					"rm: cannot remove '/': Permission denied",
					'Nice try.'
				]
			};
		}
		return {
			output: [`rm: cannot remove '${target || '/'}': Permission denied`]
		};
	}
});

registerCommand({
	name: 'neofetch',
	description: 'Display system information',
	usage: 'neofetch',
	execute(_args: string[], _currentPath: string, context?: CommandContext) {
		const username = context?.user?.username ?? 'guest';
		return {
			output: [
				'',
				'        ___  __                    ',
				'       / _ |/ /  __ _____ ___ ___ ',
				'      / __ / _ \\/ // (_-<(_-</ _ \\',
				'     /_/ |_/_.__/\\_, /___/___/\\_,_/',
				'                /___/              ',
				'',
				`  ${username}@abyssal-arts.com`,
				'  ─────────────────────',
				'  OS: AbyssalOS v1.0',
				'  Host: abyssal-arts.com',
				'  Shell: bash 5.2',
				'  Terminal: AMBER-CRT-1',
				'  Theme: Terminal Amber [dark]',
				'  Font: JetBrains Mono',
				`  Uptime: ${formatUptime()}`,
				'  Products: 2 loaded',
				'  Privacy: enforced',
				'  Ads: 0 (forever)',
				''
			]
		};
	}
});

const fortunes = [
	"Privacy isn't a feature. It's the foundation.",
	'Built because it needed to exist.',
	'Your data. Your device. Your business.',
	"When you build something at 2am because it needed to exist, you don't need a business plan. You need a compiler.",
	'The app ecosystem is broken. Someone should be building the other thing.',
	"No ads. Not at launch. Not 'for now.' Not with an opt-out. Never.",
	"If the app works offline and doesn't cost us server time, why would we charge you monthly?",
	"These tools aren't 'accessible' as an afterthought."
];

registerCommand({
	name: 'fortune',
	description: 'Random wisdom',
	usage: 'fortune',
	execute() {
		const quote = fortunes[Math.floor(Math.random() * fortunes.length)];
		return { output: ['', `  "${quote}"`, '', '  — Abyssal Arts', ''] };
	}
});

registerCommand({
	name: 'ping',
	description: 'Ping a host',
	usage: 'ping <host>',
	execute(args) {
		const host = args[0];
		if (!host) {
			return { output: ['ping: usage error: Destination address required'] };
		}

		const t1 = (10 + Math.random() * 8).toFixed(1);
		const t2 = (10 + Math.random() * 8).toFixed(1);
		const t3 = (10 + Math.random() * 8).toFixed(1);

		return {
			output: [
				`PING ${host} (127.0.0.1): 56 data bytes`,
				`64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=${t1} ms`,
				`64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=${t2} ms`,
				`64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=${t3} ms`,
				'',
				`--- ${host} ping statistics ---`,
				`3 packets transmitted, 3 packets received, 0% packet loss`
			]
		};
	}
});

registerCommand({
	name: 'uptime',
	description: 'Show session uptime',
	usage: 'uptime',
	execute() {
		const now = new Date();
		const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
		return {
			output: [` ${timeStr} ${formatUptime()}, 1 user, load average: 0.00, 0.01, 0.00`]
		};
	}
});

registerCommand({
	name: 'whoami',
	description: 'Display current user',
	usage: 'whoami',
	execute(_args: string[], _currentPath: string, context?: CommandContext) {
		return { output: [context?.user?.username ?? 'guest'] };
	}
});

registerCommand({
	name: 'echo',
	description: 'Display a line of text',
	usage: 'echo [text]',
	execute(args) {
		return { output: [args.join(' ')] };
	}
});

registerCommand({
	name: 'pwd',
	description: 'Print working directory',
	usage: 'pwd',
	execute(_args, currentPath) {
		return { output: [currentPath === '/' ? '/' : currentPath] };
	}
});

registerCommand({
	name: 'date',
	description: 'Display current date and time',
	usage: 'date',
	execute() {
		return { output: [new Date().toString()] };
	}
});

registerCommand({
	name: 'exit',
	description: 'Close the terminal',
	usage: 'exit',
	execute() {
		return { output: ['logout'], action: 'clear' };
	}
});
