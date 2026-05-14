<main style="padding: 2rem;">
	<h1>Jazz-active route</h1>
	<p>
		This page is rendered inside <code>JazzSvelteProvider</code>, with a
		<code>LiveQuery</code> child mounted that holds an active
		<code>QuerySubscription</code> against the <code>items</code> table.
	</p>
	<p>
		Click the button below to trigger a hard navigation
		(<code>window.location.href = '/jazz-free'</code>) — that mimics the
		PlanTogether profile-dropdown code path that hangs Chrome's renderer
		with <code>RESULT_CODE_HUNG</code> ("Aw, Snap!") on cold-cache loads.
	</p>
	<button
		style="padding: 0.5rem 1rem; font-size: 1rem;"
		onclick={() => (window.location.href = '/jazz-free')}
	>
		window.location.href = '/jazz-free'
	</button>
</main>
