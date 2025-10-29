import { pgTable, text, timestamp, uuid,boolean } from 'drizzle-orm/pg-core';
import { users } from './user';
import { genders } from './gender';
import { brands } from './brand';


export const products = pgTable('products', {
  id: uuid('id').primaryKey(),
  name: text("name"),
  description: text('description'),
  categoryId: uuid('category_id').references(()=>users.id,{ onDelete: 'cascade' }).notNull(),
  genderId: uuid('gender_id').references(()=>genders.id,{ onDelete: 'cascade' }).notNull(),
  brandId:uuid('brand_id').references(()=>brands.id),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});