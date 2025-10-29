import { pgTable, text, timestamp, uuid,boolean } from 'drizzle-orm/pg-core';



export const colors = pgTable('colors', {
  id: uuid('id').primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});