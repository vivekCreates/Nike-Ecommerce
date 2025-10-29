import { pgTable, text, timestamp, uuid, boolean, integer } from 'drizzle-orm/pg-core';
import { genders } from './gender';
import { brands } from './brand';
import { products } from './product';
import { productVariants } from './productVariant';
import { categories } from './category';

export const productImages = pgTable('productImages', {
  id: uuid('id').primaryKey(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull(),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'cascade' }).notNull(),
  genderId: uuid('gender_id').references(() => genders.id, { onDelete: 'cascade' }).notNull(),
  brandId: uuid('brand_id').references(() => brands.id),
  url: text('url').notNull(),
  sortOrder: integer('sort_order').default(0),
  isPrimary: boolean('is_primary').default(false),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});