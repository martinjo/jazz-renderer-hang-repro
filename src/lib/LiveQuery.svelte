<!--
  Minimal child component that constructs an *active* QuerySubscription
  against the `items` table. Per bisection findings (BISECT-LOG.md F6),
  this is the only ingredient (beyond JazzSvelteProvider) required to
  trigger the renderer hang on hard navigation away from the page.

  The hardcoded ownerId means the query will return zero rows (permissions
  deny the read for any non-matching session.user_id), but the subscription
  is still issued — and that's what matters for the bug.
-->
<script lang="ts">
	import { QuerySubscription } from 'jazz-tools/svelte';
	import { App, type Item } from '$lib/models/schema';

	// Any string — the value doesn't matter as long as the factory returns
	// a real query (factory returning undefined did NOT trigger the hang).
	const FAKE_OWNER_ID = 'placeholder-owner-id';

	const sub = new QuerySubscription<Item>(() =>
		App.items.where({ ownerId: FAKE_OWNER_ID })
	);

	$effect(() => {
		// Read sub.current so it's not tree-shaken.
		if (sub.current) {
			// eslint-disable-next-line no-console
			console.log('[LiveQuery] items count:', sub.current.length);
		}
	});
</script>
