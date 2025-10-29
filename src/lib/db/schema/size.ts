import { pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';
import { users } from './user';
import { genders } from './gender';
import { brands } from './brand';


export const sizes = pgTable('sizes', {
    id: uuid('id').primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    sortOrder: integer("sort_order"),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});