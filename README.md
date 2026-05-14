# jazz-renderer-hang-repro

Minimal standalone reproduction of an intermittent Chrome renderer hang
("Aw, Snap!" / `RESULT_CODE_HUNG`) in
[`jazz-tools@2.0.0-alpha.46`](https://www.npmjs.com/package/jazz-tools/v/2.0.0-alpha.46)
that triggers when a page mounting a `QuerySubscription` is unloaded via a
hard navigation (`window.location.href = '...'`).

Reproducible **~10/10** on cold-cache loads after bisecting down from a
larger SvelteKit application.

## Minimum ingredients

The bug requires all three simultaneously:

1. A mounted `JazzSvelteProvider`.
2. A child component that constructs **and runs** a `QuerySubscription`
   against a real schema table. A factory that returns `undefined` (i.e.,
   the `QuerySubscription` is constructed but never issues a query) does
   **not** trigger the hang.
3. A `window.location.href = '/somewhere'` hard navigation away from the
   page.

Removing any one of the three drops the hang rate to 0/10.

## Setup

Prerequisites: Docker (for the local Jazz sync server), Node 20+, pnpm.

```bash
git clone <this-repo>
cd jazz-renderer-hang-repro

cp .env.example .env            # throwaway appId + admin secret pre-filled

docker compose up -d            # starts a single-app Jazz server on :1626
                                # using the appId + admin secret from .env

pnpm install
pnpm dev                        # publishes schema, then starts Vite on :5173
```

On first `pnpm dev` you should see:

```
[jazz] using server from env: http://localhost:1626
[jazz] app id: 4568a15b-e9b1-500b-a047-2b57358cebce
[jazz] schema published
  VITE v6.x  ready in ...
  ➜  Local: http://localhost:5173/
```

## How to reproduce

1. Open `http://localhost:5173/` in a **fresh Chrome incognito window**.
   The hang is most reliable on cold caches (no cached wasm, no
   IndexedDB / OPFS state).
2. Wait for the Jazz client to boot (the page renders "Jazz-active route"
   and the console logs `[LiveQuery] items count: 0`).
3. Click the **`window.location.href = '/jazz-free'`** button.
4. Expected: Chrome shows "Aw, Snap!" with `RESULT_CODE_HUNG`. Reload
   always recovers.

For statistical confidence: repeat **10 times** with a fresh incognito
window each trial. Observed hang rate when the original bug was bisected:
10/10 in this minimum configuration, 8/10 in the larger PlanTogether
application (workarounds in that app do not eliminate it).

### Control: the `/jazz-free` route

`/jazz-free` is intentionally **not** wrapped in `JazzSvelteProvider`
(mount-time route gating in `+layout.svelte`). Opening it directly in a
new tab works fine — only the **hard navigation away from a Jazz-active
page** hangs.

## Architecture

| File | Role |
|---|---|
| `src/lib/models/schema.ts` | Single-table schema: `items { ownerId, name }` |
| `src/lib/models/permissions.ts` | Owner-only policies |
| `src/lib/jazzClient.ts` | Anonymous client via `BrowserAuthSecretStore` |
| `src/lib/LiveQuery.svelte` | Holds the `QuerySubscription` that triggers the bug |
| `src/routes/+layout.svelte` | Mounts `JazzSvelteProvider` (skipped on `/jazz-free`) |
| `src/routes/+page.svelte` | Hard-reload button |
| `src/routes/jazz-free/+page.svelte` | Provider-free destination |
| `vite.config.ts` | `jazzSvelteKit` plugin + `optimizeDeps.exclude` for wasm |
| `docker-compose.yml` | Local Jazz sync server (`jazz-tools server`) on :1626 |

## Diagnostic observations

- Performance trace shows **0 ms scripting** during the hang — the work
  is below user JS, in browser/native code.
- The wasm worker spawned by Jazz appears to be the proximate cause.
- A factory returning `undefined` (no query issued) does **not** trigger
  the hang — suggesting the wasm-side subscription/observer state is the
  trigger, not just the existence of a `QuerySubscription` instance.
- `getSession()` alone (no subscription) does **not** trigger the hang.
- Direct URL navigation to `/jazz-free` in a new tab works fine; the
  issue is specifically the **client-side unload of a Jazz-active page**.
- Calling `await client.shutdown()` before the `window.location.href`
  assignment reduces but does not eliminate the hang in the larger
  application that this repro was bisected from.

## Environment

- `jazz-tools`: **2.0.0-alpha.46** (latest at time of filing)
- `@sveltejs/kit`: ^2.16.0
- `svelte`: ^5.0.0
- Chrome: tested on stable channel, macOS (please report your version when
  filing an issue against this repo)

