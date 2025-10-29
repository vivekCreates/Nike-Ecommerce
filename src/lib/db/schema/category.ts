import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey(),
  name: text("name"),
  slug: text('slug'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});