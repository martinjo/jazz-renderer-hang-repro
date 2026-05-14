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

<nav class="topnav">
	<a href="/" class:active={page.url.pathname === '/'}>/ (Jazz-active)</a>
	<a href="/jazz-free" class:active={page.url.pathname.startsWith('/jazz-free')}>
		/jazz-free (no provider)
	</a>
	<span class="spacer"></span>
	<span class="status">
		{#if isJazzFreeRoute}
			<span class="dot dot-grey"></span>
			provider skipped on this route
		{:else if clientReady}
			<span class="dot dot-green"></span>
			Jazz client ready
		{:else}
			<span class="dot dot-yellow"></span>
			booting Jazz client…
		{/if}
	</span>
</nav>

<div class="page">
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
		<p class="muted">booting Jazz client…</p>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		color: #111;
		background: #fafafa;
	}

	.topnav {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1.5rem;
		border-bottom: 1px solid #e5e5e5;
		background: white;
		font-size: 0.9rem;
	}

	.topnav a {
		color: #555;
		text-decoration: none;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.topnav a.active {
		background: #eef;
		color: #224;
		font-weight: 500;
	}

	.spacer {
		flex: 1;
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #666;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		display: inline-block;
	}

	.dot-green {
		background: #22c55e;
	}
	.dot-yellow {
		background: #eab308;
	}
	.dot-grey {
		background: #9ca3af;
	}

	.page {
		max-width: 760px;
		margin: 2rem auto;
		padding: 0 1.5rem;
	}

	.muted {
		color: #666;
	}
</style>
