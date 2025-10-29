import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const genders = pgTable('genders', {
  id: uuid('id').primaryKey(),
  label: text("label"),
  slug: text('slug'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});