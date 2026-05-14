import { col, defineApp, defineSchema, type InsertOf, type RowOf } from 'jazz-tools';

const schemaDef = {
	items: {
		ownerId: col.string(),
		name: col.string()
	}
};

export const schema = defineSchema(schemaDef);
export const app = defineApp(schema);
export const App = app;

export type Item = RowOf<typeof App.items>;
export type ItemInsert = InsertOf<typeof App.items>;
