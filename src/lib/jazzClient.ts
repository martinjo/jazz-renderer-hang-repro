import {
	createJazzClient,
	BrowserAuthSecretStore,
	generateAuthSecret,
	type JazzClient
} from 'jazz-tools/svelte';
import { env } from '$env/dynamic/public';

const APP_ID = env.PUBLIC_JAZZ_APP_ID;
const SERVER_URL = env.PUBLIC_JAZZ_SERVER_URL;
const SECRET_OPTS = { appId: APP_ID, key: `${APP_ID}/auth-secret` };

let clientPromise: Promise<JazzClient> | null = null;

export function getOrCreateClient(): Promise<JazzClient> {
	if (clientPromise) return clientPromise;
	clientPromise = (async () => {
		let secret = await BrowserAuthSecretStore.loadSecret(SECRET_OPTS);
		if (!secret) {
			secret = generateAuthSecret();
			await BrowserAuthSecretStore.saveSecret(secret, SECRET_OPTS);
		}
		return createJazzClient({ appId: APP_ID, serverUrl: SERVER_URL, secret });
	})();
	return clientPromise;
}

export function shutdownActiveClient(): void {
	const p = clientPromise;
	if (!p) return;
	clientPromise = null;
	void p.then((c) => c.shutdown()).catch(() => {});
}
