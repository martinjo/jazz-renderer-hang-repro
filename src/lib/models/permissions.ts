import { schema as s } from 'jazz-tools';
import { App } from './schema';

// Inline rules per table — the looping-over-policies form blows up
// jazz-tools' union typing ("Expression produces a union type that is
// too complex to represent.").
export const permissions = s.definePermissions(App, ({ policy, session }) => {
	policy.items.allowRead.where({ ownerId: session.user_id });
	policy.items.allowInsert.where({ ownerId: session.user_id });
	policy.items.allowUpdate
		.whereOld({ ownerId: session.user_id })
		.whereNew({ ownerId: session.user_id });
	policy.items.allowDelete.where({ ownerId: session.user_id });

	policy.events.allowRead.where({ ownerId: session.user_id });
	policy.events.allowInsert.where({ ownerId: session.user_id });
	policy.events.allowUpdate
		.whereOld({ ownerId: session.user_id })
		.whereNew({ ownerId: session.user_id });
	policy.events.allowDelete.where({ ownerId: session.user_id });

	policy.notes.allowRead.where({ ownerId: session.user_id });
	policy.notes.allowInsert.where({ ownerId: session.user_id });
	policy.notes.allowUpdate
		.whereOld({ ownerId: session.user_id })
		.whereNew({ ownerId: session.user_id });
	policy.notes.allowDelete.where({ ownerId: session.user_id });

	policy.tags.allowRead.where({ ownerId: session.user_id });
	policy.tags.allowInsert.where({ ownerId: session.user_id });
	policy.tags.allowUpdate
		.whereOld({ ownerId: session.user_id })
		.whereNew({ ownerId: session.user_id });
	policy.tags.allowDelete.where({ ownerId: session.user_id });

	policy.comments.allowRead.where({ ownerId: session.user_id });
	policy.comments.allowInsert.where({ ownerId: session.user_id });
	policy.comments.allowUpdate
		.whereOld({ ownerId: session.user_id })
		.whereNew({ ownerId: session.user_id });
	policy.comments.allowDelete.where({ ownerId: session.user_id });

	policy.links.allowRead.where({ ownerId: session.user_id });
	policy.links.allowInsert.where({ ownerId: session.user_id });
	policy.links.allowUpdate
		.whereOld({ ownerId: session.user_id })
		.whereNew({ ownerId: session.user_id });
	policy.links.allowDelete.where({ ownerId: session.user_id });

	policy.categories.allowRead.where({ ownerId: session.user_id });
	policy.categories.allowInsert.where({ ownerId: session.user_id });
	policy.categories.allowUpdate
		.whereOld({ ownerId: session.user_id })
		.whereNew({ ownerId: session.user_id });
	policy.categories.allowDelete.where({ ownerId: session.user_id });
});
