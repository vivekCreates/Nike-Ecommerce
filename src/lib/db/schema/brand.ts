import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const brands = pgTable('brands', {
  id: uuid('id').primaryKey(),
  name: text("name"),
  slug: text('slug'),
  logoUrl:text('logo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});