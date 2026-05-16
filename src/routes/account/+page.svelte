<script lang="ts">
	import AsciiBox from '$lib/components/AsciiBox.svelte';
	import AsciiDivider from '$lib/components/AsciiDivider.svelte';
	import { reveal } from '$lib/actions/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const memberSince = $derived(() => {
		if (!data.user?.createdAt) return 'unknown';
		const d = new Date(data.user.createdAt * 1000);
		return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	});

	const authMethod = $derived(() => {
		const hasPassword = true;
		const hasGithub = !!data.user?.githubId;
		if (hasPassword && hasGithub) return 'email + github';
		if (hasGithub) return 'github';
		return 'email';
	});
</script>

<section class="account-page" use:reveal>
	<h1 class="page-title">~/.config/abyssal/profile</h1>
	<AsciiDivider />

	<div class="profile-fields" use:reveal>
		<div class="field-row">
			<span class="field-label">username:</span>
			<span class="field-value">{data.user?.username}</span>
		</div>
		<div class="field-row">
			<span class="field-label">email:</span>
			<span class="field-value">{data.user?.email}</span>
		</div>
		<div class="field-row">
			<span class="field-label">member_since:</span>
			<span class="field-value">{memberSince()}</span>
		</div>
		<div class="field-row">
			<span class="field-label">auth_method:</span>
			<span class="field-value">{authMethod()}</span>
		</div>
	</div>

	<div class="licenses-section" use:reveal>
		<AsciiBox title="licenses">
			<p class="placeholder-text">No licenses yet.</p>
			<p class="placeholder-hint">Rift license management coming in Phase 3.</p>
		</AsciiBox>
	</div>

	<AsciiDivider />

	<div class="account-actions" use:reveal>
		<a href="/account/settings" class="action-link">[settings]</a>
		<form method="POST" action="/auth/logout" class="logout-form">
			<button type="submit" class="action-link action-btn">[logout]</button>
		</form>
	</div>
</section>

<style>
	.account-page {
		padding-top: 20px;
	}

	.page-title {
		font-size: clamp(18px, 4vw, 24px);
		font-weight: 600;
		color: var(--amber);
		text-shadow: 0 0 20px var(--glow);
		margin-bottom: 16px;
	}

	.profile-fields {
		margin: 24px 0;
		padding-left: 16px;
	}

	.field-row {
		display: flex;
		gap: 16px;
		padding: 6px 0;
		font-size: 14px;
	}

	.field-label {
		color: var(--amber-dim);
		min-width: 140px;
	}

	.field-value {
		color: var(--text-body);
	}

	.licenses-section {
		margin: 32px 0;
	}

	.placeholder-text {
		font-size: 13px;
		color: var(--text-secondary);
	}

	.placeholder-hint {
		font-size: 11px;
		color: var(--amber-faint);
		margin-top: 4px;
	}

	.account-actions {
		display: flex;
		gap: 24px;
		align-items: center;
	}

	.action-link {
		font-size: 13px;
		color: var(--amber-dim);
		text-decoration: none;
		font-family: 'JetBrains Mono', monospace;
		transition: color 0.3s ease;
		cursor: pointer;
	}

	.action-link:hover {
		color: var(--amber);
	}

	.action-btn {
		background: none;
		border: none;
		padding: 0;
		font-family: 'JetBrains Mono', monospace;
	}

	.logout-form {
		display: inline;
	}
</style>
