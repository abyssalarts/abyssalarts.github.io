<script lang="ts">
	import { page } from '$app/stores';

	let scrollY = $state(0);
	let visible = $derived(scrollY > 80);
	let isHome = $derived($page.url.pathname === '/');
</script>

<svelte:window bind:scrollY />

<nav class="nav" class:visible aria-label="Main navigation">
	<a href="/" class="nav-brand">Abyssal Arts</a>
	<div class="nav-links">
		{#if isHome}
			<a href="#philosophy" class="nav-link">Philosophy</a>
			<span class="nav-separator">|</span>
			<a href="#products" class="nav-link">Products</a>
			<span class="nav-separator">|</span>
			<a href="#about" class="nav-link">About</a>
			<span class="nav-separator">|</span>
			<a href="#contact" class="nav-link">Contact</a>
			<span class="nav-separator">|</span>
		{:else}
			<a href="/products/brain-dump" class="nav-link">Brain Dump</a>
			<span class="nav-separator">|</span>
			<a href="/products/rift" class="nav-link">Rift</a>
			<span class="nav-separator">|</span>
			<a href="https://vault.abyssal-arts.com" class="nav-link">The Vault</a>
			<span class="nav-separator">|</span>
			<a href="/about" class="nav-link">About</a>
			<span class="nav-separator">|</span>
		{/if}
		<a href="/wiki/" class="nav-link">Wiki</a>
		<span class="nav-separator">|</span>
		<a href="/auth/login" class="nav-login">Login</a>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9000;
		background: var(--surface);
		border-bottom: 1px solid var(--amber-faint);
		padding: 12px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		opacity: 0;
		transform: translateY(-100%);
		transition: opacity 0.3s ease-out, transform 0.3s ease-out;
	}

	.nav.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.nav-brand {
		font-size: 12px;
		font-weight: 600;
		color: var(--amber);
		text-decoration: none;
		letter-spacing: 2px;
		text-transform: uppercase;
		text-shadow: 0 0 15px var(--glow);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.nav-link {
		font-size: 11px;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.2s ease-out;
	}

	.nav-link:hover {
		color: var(--amber);
	}

	.nav-link:focus-visible {
		outline: 1px solid var(--amber-dim);
		outline-offset: 4px;
	}

	.nav-separator {
		color: var(--amber-faint);
		font-size: 11px;
		user-select: none;
	}

	.nav-login {
		font-size: 11px;
		letter-spacing: 2px;
		text-transform: uppercase;
		color: var(--amber);
		text-decoration: none;
		padding: 4px 12px;
		border: 1px solid var(--amber-dim);
		transition: background 0.2s ease-out, border-color 0.2s ease-out;
	}

	.nav-login:hover {
		background: var(--glow-faintest);
		border-color: var(--amber);
	}

	.nav-login:focus-visible {
		outline: 1px solid var(--amber);
		outline-offset: 2px;
	}

	@media (max-width: 600px) {
		.nav-links .nav-separator {
			display: none;
		}

		.nav-links {
			gap: 12px;
			flex-wrap: wrap;
			justify-content: flex-end;
		}

		.nav-link {
			font-size: 10px;
			letter-spacing: 1px;
		}

		.nav-brand {
			font-size: 10px;
			letter-spacing: 1px;
		}

		.nav-login {
			font-size: 10px;
			padding: 3px 10px;
		}
	}

	@media (max-width: 400px) {
		.nav-links {
			gap: 8px;
		}

		.nav-link {
			font-size: 9px;
		}
	}
</style>
