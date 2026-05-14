<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<main style="padding: 1rem;">
	<h1>Jazz-free route</h1>
	<p>
		This page is <strong>not</strong> wrapped in <code>JazzSvelteProvider</code>.
		Reaching it via direct URL works fine — the hang only triggers when SvelteKit
		does a client-side navigation from / to here, which causes the provider to
		unmount mid-transition.
	</p>
	<button onclick={() => goto('/')}>goto('/')</button>
</main>
