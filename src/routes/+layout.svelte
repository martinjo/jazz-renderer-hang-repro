<script lang="ts">
	import { JazzSvelteProvider } from 'jazz-tools/svelte';
	import { getOrCreateClient } from '$lib/jazzClient';
	import LiveQuery from '$lib/LiveQuery.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { children }: { children: import('svelte').Snippet } = $props();

	// Mount-time snapshot of the route — `/jazz-free` skips the provider so
	// hitting that URL directly works as a control (proves the destination
	// itself is not the problem).
	const initialPath = page.url.pathname;
	const isJazzFreeRoute = initialPath.startsWith('/jazz-free');

	// Jazz client created in onMount to match the official getting-started
	// pattern (see garden-co/jazz#776).
	let clientReady = $state(false);
	onMount(() => {
		if (!isJazzFreeRoute) {
			void getOrCreateClient().then(() => (clientReady = true));
		}
	});
</script>

<nav style="padding: 1rem; border-bottom: 1px solid #ccc;">
	<a href="/">/ (Jazz-active)</a>
	&nbsp;|&nbsp;
	<a href="/jazz-free">/jazz-free (no provider)</a>
	&nbsp;|&nbsp;
	<span>current: {page.url.pathname}</span>
</nav>

{#if isJazzFreeRoute}
	{@render children()}
{:else if clientReady}
	{#await getOrCreateClient() then client}
		<JazzSvelteProvider {client}>
			<LiveQuery />
			{@render children()}
		</JazzSvelteProvider>
	{/await}
{:else}
	<p style="padding: 1rem;">booting Jazz client…</p>
{/if}
