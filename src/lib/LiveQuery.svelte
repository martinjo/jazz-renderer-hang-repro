<!--
  Mounts multiple parallel QuerySubscriptions to push the wasm worker
  into a busier state. Empirically the more reactive observers and
  pending queries the worker is juggling, the more reliably Chrome's
  renderer hangs on hard navigation away from this page.

  All queries use a placeholder ownerId so they return zero rows —
  permissions deny non-matching reads. The subscription is still
  *issued* on the wasm side, which is what matters for the bug
  (a factory returning undefined does NOT trigger).
-->
<script lang="ts">
	import { QuerySubscription } from 'jazz-tools/svelte';
	import {
		App,
		type Item,
		type Event,
		type Note,
		type Tag,
		type Comment,
		type Link,
		type Category
	} from '$lib/models/schema';

	const OWNER = 'placeholder-owner-id';

	const items = new QuerySubscription<Item>(() => App.items.where({ ownerId: OWNER }));
	const events = new QuerySubscription<Event>(() => App.events.where({ ownerId: OWNER }));
	const notes = new QuerySubscription<Note>(() => App.notes.where({ ownerId: OWNER }));
	const tags = new QuerySubscription<Tag>(() => App.tags.where({ ownerId: OWNER }));
	const comments = new QuerySubscription<Comment>(() => App.comments.where({ ownerId: OWNER }));
	const links = new QuerySubscription<Link>(() => App.links.where({ ownerId: OWNER }));
	const categories = new QuerySubscription<Category>(() =>
		App.categories.where({ ownerId: OWNER })
	);

	$effect(() => {
		const counts = {
			items: items.current?.length ?? -1,
			events: events.current?.length ?? -1,
			notes: notes.current?.length ?? -1,
			tags: tags.current?.length ?? -1,
			comments: comments.current?.length ?? -1,
			links: links.current?.length ?? -1,
			categories: categories.current?.length ?? -1
		};
		// eslint-disable-next-line no-console
		console.log('[LiveQuery] counts:', counts);
	});
</script>
