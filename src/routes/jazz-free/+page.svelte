<main>
	<h1>Destination reached (no hang)</h1>

	<p class="lead">
		This page is intentionally rendered <strong>outside</strong>
		<code>JazzSvelteProvider</code>. Mount-time route gating in
		<code>+layout.svelte</code> short-circuits the provider on any path
		starting with <code>/jazz-free</code>.
	</p>

	<p>
		If you got here without Chrome showing "Aw, Snap!", that's a
		<strong>negative</strong> trial. The hang is intermittent on warm
		caches — close the incognito window entirely and try a fresh one.
	</p>

	<a href="/" class="back">← back to trigger page</a>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		margin: 0 0 0.25rem 0;
		font-size: 1.5rem;
	}

	.lead {
		color: #444;
		margin: 0;
		line-height: 1.5;
	}

	code {
		background: #f0f0f0;
		padding: 0.1rem 0.35rem;
		border-radius: 3px;
		font-size: 0.85em;
	}

	.back {
		align-self: flex-start;
		margin-top: 0.5rem;
		padding: 0.5rem 1rem;
		color: #224;
		background: #eef;
		border-radius: 6px;
		text-decoration: none;
		font-size: 0.9rem;
	}

	.back:hover {
		background: #dde;
	}
</style>
