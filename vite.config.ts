import { sveltekit } from '@sveltejs/kit/vite';
import { jazzSvelteKit } from 'jazz-tools/dev/sveltekit';
import type { UserConfig } from 'vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

const config: UserConfig = {
	plugins: [
		sveltekit(),
		// Cast: jazz-tools 2.0-alpha.46 declares its Vite plugin's `config`
		// hook with a narrower type than Vite's UserConfig (missing
		// `ssr.external: true`). Runtime works; this is purely a typings gap.
		jazzSvelteKit({
			schemaDir: 'src/lib/models',
			adminSecret: env.JAZZ_ADMIN_SECRET,
			appId: env.PUBLIC_JAZZ_APP_ID
		}) as unknown as UserConfig['plugins']
	],
	// jazz-tools spawns a wasm worker via `new Worker(new URL(...))` and
	// loads its .wasm binary via the same import.meta.url pattern. Without
	// these excludes Vite's pre-bundler caches the URLs and the worker / wasm
	// 404s with "WebAssembly compile: HTTP status code is not ok".
	optimizeDeps: {
		exclude: ['jazz-tools', 'jazz-tools/svelte', 'jazz-wasm']
	}
};

export default config;
