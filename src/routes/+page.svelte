<main>
	<h1>Trigger the renderer hang</h1>

	<p class="lead">
		This page is wrapped in <code>JazzSvelteProvider</code> and mounts a
		child component that holds an active <code>QuerySubscription</code>
		against the <code>items</code> table. Both ingredients are required
		— see the README for the bisection summary.
	</p>

	<ol>
		<li>
			Make sure you opened this page in a <strong>fresh Chrome incognito
			window</strong>. Cached wasm / IndexedDB makes the hang less
			reliable.
		</li>
		<li>
			Wait for the status indicator above to turn green
			(<em>Jazz client ready</em>) and check the DevTools console for
			<code>[LiveQuery] items count: 0</code>.
		</li>
		<li>
			Click the button below. It runs
			<code>window.location.href = '/jazz-free'</code> — a plain hard
			navigation away from this Jazz-active page.
		</li>
		<li>
			Expected: Chrome shows <strong>"Aw, Snap!"</strong> with
			<code>RESULT_CODE_HUNG</code>. Repeat 10 times for confidence;
			observed rate is ~10/10.
		</li>
	</ol>

	<button class="trigger" onclick={() => (window.location.href = '/jazz-free')}>
		Trigger hang →
	</button>

	<p class="footnote">
		The destination route (<code>/jazz-free</code>) is intentionally not
		wrapped in <code>JazzSvelteProvider</code>. Opening it directly in a
		new tab works fine — only the unload of this page hangs Chrome.
	</p>
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

	ol {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
		line-height: 1.6;
		color: #333;
	}

	code {
		background: #f0f0f0;
		padding: 0.1rem 0.35rem;
		border-radius: 3px;
		font-size: 0.85em;
	}

	.trigger {
		align-self: flex-start;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		font-weight: 500;
		color: white;
		background: #dc2626;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.trigger:hover {
		background: #b91c1c;
	}

	.footnote {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #eee;
		color: #666;
		font-size: 0.9rem;
		line-height: 1.5;
	}
</style>
