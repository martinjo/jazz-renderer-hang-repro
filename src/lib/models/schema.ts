import { col, defineApp, defineSchema, type InsertOf, type RowOf } from 'jazz-tools';

// Multiple tables so the wasm worker has more reactive observers to set
// up — increases the chance of hitting the renderer hang on hard
// navigation away from a page with active QuerySubscriptions.
const schemaDef = {
	items: {
		ownerId: col.string(),
		name: col.string()
	},
	events: {
		ownerId: col.string(),
		title: col.string(),
		startsAt: col.timestamp()
	},
	notes: {
		ownerId: col.string(),
		body: col.string()
	},
	tags: {
		ownerId: col.string(),
		label: col.string()
	},
	comments: {
		ownerId: col.string(),
		text: col.string()
	},
	links: {
		ownerId: col.string(),
		url: col.string()
	},
	categories: {
		ownerId: col.string(),
		name: col.string()
	}
};

export const schema = defineSchema(schemaDef);
export const app = defineApp(schema);
export const App = app;

export type Item = RowOf<typeof App.items>;
export type ItemInsert = InsertOf<typeof App.items>;
export type Event = RowOf<typeof App.events>;
export type Note = RowOf<typeof App.notes>;
export type Tag = RowOf<typeof App.tags>;
export type Comment = RowOf<typeof App.comments>;
export type Link = RowOf<typeof App.links>;
export type Category = RowOf<typeof App.categories>;
