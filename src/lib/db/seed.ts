// scripts/seed.ts
import "dotenv/config";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import {
  genders,
  colors,
  sizes,
  brands,
  categories,
  products,
  productVariants,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary"; // ✅ correct import path for utils

const log = (...args: unknown[]) => console.log("[seed]", ...args);
const err = (...args: unknown[]) => console.error("[seed:error]", ...args);

async function upsertMany(table: any, rows: any[], uniqueKey: string) {
  for (const r of rows) {
    const exists = await db
      .select()
      .from(table)
      .where(eq(table[uniqueKey], r[uniqueKey]))
      .limit(1);
    if (!exists.length) {
      await db.insert(table).values(r as any);
    }
  }
}

async function seed() {
  try {
    log("Seeding reference tables...");

    const genderRows = [
      { id: uuidv4(), label: "Men", slug: "men" },
      { id: uuidv4(), label: "Women", slug: "women" },
      { id: uuidv4(), label: "Unisex", slug: "unisex" },
    ];
    await upsertMany(genders, genderRows, "slug");

    const colorRows = [
      { id: uuidv4(), name: "Black", slug: "black" },
      { id: uuidv4(), name: "White", slug: "white" },
      { id: uuidv4(), name: "Red", slug: "red" },
      { id: uuidv4(), name: "Blue", slug: "blue" },
      { id: uuidv4(), name: "Green", slug: "green" },
    ];
    await upsertMany(colors, colorRows, "slug");

    const sizeRows = [
      { id: uuidv4(), name: "7", slug: "7", sortOrder: 0 },
      { id: uuidv4(), name: "8", slug: "8", sortOrder: 1 },
      { id: uuidv4(), name: "9", slug: "9", sortOrder: 2 },
      { id: uuidv4(), name: "10", slug: "10", sortOrder: 3 },
      { id: uuidv4(), name: "11", slug: "11", sortOrder: 4 },
    ];
    await upsertMany(sizes, sizeRows, "slug");

    const brandRows = [{ id: uuidv4(), name: "Nike", slug: "nike", logoUrl: null }];
    await upsertMany(brands, brandRows, "slug");

    const categoryRows = [
      { id: uuidv4(), name: "Shoes", slug: "shoes" },
      { id: uuidv4(), name: "Running Shoes", slug: "running-shoes" },
      { id: uuidv4(), name: "Lifestyle", slug: "lifestyle" },
    ];
    await upsertMany(categories, categoryRows, "slug");

    log("Inserting sample products...");

    const allGenders = await db.select().from(genders);
    const allColors = await db.select().from(colors);
    const allSizes = await db.select().from(sizes);
    const nike = (await db.select().from(brands).where(eq(brands.slug, "nike")))[0];
    const shoesCat = (await db.select().from(categories).where(eq(categories.slug, "shoes")))[0];

    const productNames = [
      "Nike Air Force 1",
      "Nike Air Max 90",
      "Nike Air Max 97",
      "Nike Air Max 270",
      "Nike Air VaporMax",
      "Nike Air Zoom Pegasus 41",
      "Nike React Infinity Run Flyknit 4",
      "Nike Revolution 7",
      "Nike Downshifter 13",
      "Nike Alphafly 3",
      "Nike Vaporfly 3",
      "Nike SB Dunk Low",
      "Nike Blazer Mid '77",
      "Nike Court Vision Low",
      "Nike Air Jordan 1",
      "Nike Air Jordan 4",
      "Nike LeBron 21",
      "Nike KD 17",
      "Nike Metcon 9",
      "Nike Air Max Dn",
    ];
    const prices = [99,109,119,129,139,149,159,169,179,189,199,209,219,229,239,249,259,269,279,289,];

    for (const name of productNames) {
      const productId = uuidv4();
      const gender = allGenders[Math.floor(Math.random() * allGenders.length)];
      const price = prices[Math.floor(Math.random() * prices.length)];

      const product = {
        id: productId,
        name,
        price,
        description: `${name} - comfortable and stylish.`,
        categoryId: shoesCat.id,
        genderId: gender.id,
        brandId: nike?.id ?? null,
        isPublished: true,
      };

      await db.insert(products).values(product as any);

      const chosenColors = allColors.slice(0, 2);
      const chosenSizes = allSizes.slice(0, 3);

      const createdVariantIds: string[] = [];

      for (const color of chosenColors) {
        for (const size of chosenSizes) {
          const variantId = uuidv4();
          const variant = {
            id: variantId,
            productId,
            sku: `${name.replace(/\s+/g, "-").toUpperCase()}-${color.slug}-${size.slug}`,
            price: Math.floor(Math.random() * 100) + 80,
            salePrice: null,
            colorId: color.id,
            sizeId: size.id,
            inStock: Math.floor(Math.random() * 50) + 1,
            weight: null,
            dimensions: null,
          };

          await db.insert(productVariants).values(variant as any);
          createdVariantIds.push(variantId);
        }
      }

      await uploadOnCloudinary({ productId, createdVariantIds, shoesCat, gender, nike });
    }

    log("✅ Seed finished successfully");
  } catch (e: any) {
    err(e);
    process.exitCode = 1;
  }
}

seed();


