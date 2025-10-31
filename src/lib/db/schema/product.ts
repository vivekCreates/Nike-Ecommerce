import { pgTable, text, timestamp, uuid,boolean,integer } from 'drizzle-orm/pg-core';
import { genders } from './gender';
import { brands } from './brand';
import { categories } from './category';



export const products = pgTable('products', {
  id: uuid('id').primaryKey(),
  name: text("name"),
  description: text('description'),
  price:integer('price').notNull(),
  categoryId: uuid('category_id').references(()=>categories.id,{ onDelete: 'cascade' }).notNull(),
  genderId: uuid('gender_id').references(()=>genders.id,{ onDelete: 'cascade' }).notNull(),
  brandId:uuid('brand_id').references(()=>brands.id),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});