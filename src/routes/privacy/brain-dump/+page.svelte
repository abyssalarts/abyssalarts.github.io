<script lang="ts">
	import AsciiBox from '$lib/components/AsciiBox.svelte';
	import AsciiDivider from '$lib/components/AsciiDivider.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="privacy-section" use:reveal>
	<p class="brand-label">Abyssal Arts</p>
	<h1 class="page-title">Brain Dump</h1>
	<p class="updated">Privacy Policy — Last Updated: April 2026</p>
</section>

<AsciiDivider label="Overview" />

<section class="privacy-section" use:reveal>
	<AsciiBox>
		<p class="highlight-text">
			Brain Dump was built on a simple principle: <strong>your thoughts belong to you.</strong>
			We collect nothing, share nothing, and store everything locally on your device.
			This is the shortest honest privacy policy in the app store.
		</p>
	</AsciiBox>
</section>

<AsciiDivider label="What We Collect" />

<section class="privacy-section" use:reveal>
	<h2 class="section-heading">Nothing.</h2>
	<p class="body-text">
		Brain Dump does not collect any personal information, usage data, analytics, or
		telemetry of any kind.
	</p>
	<ul class="check-list">
		<li><span class="cross">&#10005;</span> No personal information</li>
		<li><span class="cross">&#10005;</span> No usage analytics</li>
		<li><span class="cross">&#10005;</span> No crash reporting</li>
		<li><span class="cross">&#10005;</span> No advertising identifiers</li>
		<li><span class="cross">&#10005;</span> No location data</li>
		<li><span class="cross">&#10005;</span> No device information sent anywhere</li>
		<li><span class="cross">&#10005;</span> No behavioral tracking</li>
	</ul>
</section>

<AsciiDivider label="Where Your Data Lives" />

<section class="privacy-section" use:reveal>
	<h2 class="section-heading">Only on your device.</h2>
	<p class="body-text">
		All thoughts, categories, connections, and settings are stored exclusively on your
		device using local storage. <strong>Nothing is sent to any server.</strong> Nothing is
		stored in the cloud unless you explicitly choose to export it yourself.
	</p>
	<ul class="check-list">
		<li><span class="check">&#10003;</span> Thoughts stored locally on device only</li>
		<li><span class="check">&#10003;</span> Voice transcription processed locally or via your chosen provider</li>
		<li><span class="check">&#10003;</span> No automatic cloud sync or backup</li>
		<li><span class="check">&#10003;</span> Export is always your choice, always your destination</li>
	</ul>
</section>

<AsciiDivider label="AI Providers" />

<section class="privacy-section" use:reveal>
	<h2 class="section-heading">Optional. Your choice. Your key.</h2>
	<p class="body-text">
		Brain Dump optionally supports AI categorization and analysis via third-party
		providers including Claude (Anthropic), OpenAI, Google Gemini, and Ollama. This
		feature is <strong>entirely opt-in</strong> and requires you to provide your own API key.
	</p>
	<p class="body-text">
		When AI features are enabled, your thought content is sent to your chosen provider
		for processing. This is governed by that provider's own privacy policy — not ours.
		We do not store, log, or access your API key beyond what is needed to make the
		request.
	</p>
	<p class="body-text">
		Ollama users: all processing happens locally on your device. No data leaves your
		machine.
	</p>
	<ul class="check-list">
		<li><span class="check">&#10003;</span> AI features are fully optional</li>
		<li><span class="check">&#10003;</span> You provide your own API key</li>
		<li><span class="check">&#10003;</span> We never store or share your API key</li>
		<li><span class="check">&#10003;</span> Ollama option is fully local — zero external calls</li>
		<li><span class="cross">&#10005;</span> We do not have access to thoughts processed by AI providers</li>
	</ul>
</section>

<AsciiDivider label="Third Parties" />

<section class="privacy-section" use:reveal>
	<h2 class="section-heading">None.</h2>
	<p class="body-text">
		Brain Dump does not integrate any third-party analytics, advertising networks,
		crash reporting services, or tracking SDKs. <strong>There are no third parties with
		access to your data.</strong>
	</p>
	<ul class="check-list">
		<li><span class="cross">&#10005;</span> No advertising networks</li>
		<li><span class="cross">&#10005;</span> No analytics SDKs (Firebase, Mixpanel, etc.)</li>
		<li><span class="cross">&#10005;</span> No crash reporting services</li>
		<li><span class="cross">&#10005;</span> No social media integrations</li>
		<li><span class="cross">&#10005;</span> No data brokers or data sharing agreements</li>
	</ul>
</section>

<AsciiDivider label="Your Control" />

<section class="privacy-section" use:reveal>
	<h2 class="section-heading">Complete.</h2>
	<p class="body-text">You have full control over your data at all times.</p>
	<ul class="check-list">
		<li><span class="check">&#10003;</span> Export all thoughts at any time (JSON, Markdown, Obsidian, ZIP)</li>
		<li><span class="check">&#10003;</span> Delete individual thoughts at any time</li>
		<li><span class="check">&#10003;</span> Wipe all data completely from Settings > Privacy &amp; Data > Clear All Data</li>
		<li><span class="check">&#10003;</span> Uninstalling the app removes all local data permanently</li>
	</ul>
</section>

<AsciiDivider label="Children" />

<section class="privacy-section" use:reveal>
	<h2 class="section-heading">Not directed at children.</h2>
	<p class="body-text">
		Brain Dump is not directed at children under 13. We do not knowingly collect
		information from children. Since we collect no information from anyone, this is
		straightforward.
	</p>
</section>

<AsciiDivider label="Changes" />

<section class="privacy-section" use:reveal>
	<h2 class="section-heading">We'll tell you.</h2>
	<p class="body-text">
		If this privacy policy ever changes, we will update the date above and note the
		changes in the app's release notes. We will never retroactively change our data
		practices in ways that are less private than what is described here.
	</p>
</section>

<AsciiDivider label="Contact" />

<section class="privacy-section" use:reveal>
	<h2 class="section-heading">Questions?</h2>
	<p class="body-text">
		If you have any questions about this privacy policy, contact us at:
	</p>
	<AsciiBox>
		<p class="contact-email">
			<a href="mailto:hello@abyssalarts.com">hello@abyssalarts.com</a>
		</p>
	</AsciiBox>
</section>

<style>
	.privacy-section {
		margin-bottom: 16px;
	}

	.brand-label {
		font-size: 10px;
		letter-spacing: 5px;
		text-transform: uppercase;
		color: var(--text-secondary);
		margin-bottom: 12px;
	}

	.page-title {
		font-size: clamp(24px, 5vw, 36px);
		font-weight: 600;
		color: var(--amber);
		text-shadow: 0 0 20px var(--glow);
		letter-spacing: 3px;
		margin-bottom: 8px;
	}

	.updated {
		font-size: 11px;
		color: var(--amber-faint);
		letter-spacing: 2px;
		text-transform: uppercase;
	}

	.section-heading {
		font-size: 16px;
		font-weight: 500;
		color: var(--amber);
		letter-spacing: 1px;
		margin-bottom: 14px;
	}

	.highlight-text {
		font-size: 14px;
		color: var(--text-body);
		line-height: 1.9;
	}

	.highlight-text strong {
		color: var(--amber);
		font-weight: 500;
	}

	.body-text {
		font-size: 13px;
		font-weight: 300;
		color: var(--text-body);
		line-height: 1.9;
		margin-bottom: 14px;
		letter-spacing: 0.3px;
	}

	.body-text strong {
		color: var(--amber);
		font-weight: 500;
	}

	.check-list {
		list-style: none;
		padding: 0;
		margin: 14px 0;
	}

	.check-list li {
		font-size: 13px;
		color: var(--text-body);
		padding: 8px 0;
		border-bottom: 1px solid var(--amber-faint);
		display: flex;
		gap: 12px;
		align-items: flex-start;
		line-height: 1.6;
	}

	.check-list li:last-child {
		border-bottom: none;
	}

	.check {
		color: var(--amber);
		flex-shrink: 0;
	}

	.cross {
		color: var(--red);
		flex-shrink: 0;
	}

	.contact-email {
		font-size: 14px;
	}

	.contact-email a {
		color: var(--amber);
		text-decoration: none;
		font-weight: 500;
	}

	.contact-email a:hover {
		text-decoration: underline;
	}
</style>
