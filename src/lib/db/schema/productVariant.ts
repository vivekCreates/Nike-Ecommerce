import { pgTable, text, timestamp, uuid, integer, jsonb } from 'drizzle-orm/pg-core';
import { colors } from './color';
import { sizes } from './size';


export const productVariants = pgTable('productVariants', {
  id: uuid('id').primaryKey(),
  productId: uuid("product_id").notNull(),
  sku:text("sku"),
  price: integer("price").notNull(),
  salePrice: integer("sale_price"),
  colorId:uuid('color_id').references(()=>colors.id,{onDelete:'cascade'}).notNull(),
  sizeId: uuid('size_id').references(()=>sizes.id,{onDelete:'cascade'}).notNull(),
  inStock:integer("in_stock"),
  weight:integer(),
  dimensions:jsonb(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});