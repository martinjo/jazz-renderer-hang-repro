import { schema as s } from 'jazz-tools';
import { App } from './schema';

export const permissions = s.definePermissions(App, ({ policy, session }) => {
	policy.items.allowRead.where({ ownerId: session.user_id });
	policy.items.allowInsert.where({ ownerId: session.user_id });
	policy.items.allowUpdate
		.whereOld({ ownerId: session.user_id })
		.whereNew({ ownerId: session.user_id });
	policy.items.allowDelete.where({ ownerId: session.user_id });
});
