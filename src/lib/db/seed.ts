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
  productImages,
} from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
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
      log(`Inserted ${r[uniqueKey]} into ${table}`);
    } else {
      log(`${r[uniqueKey]} already exists in ${table}, skipping...`);
    }
  }
}

async function seed() {
  try {
    log("Seeding reference tables...");

    // Check if we need to seed products (only if we have very few products)
    const existingProducts = await db.select({ count: count() }).from(products);
    const expectedProductCount = 20; // We expect 20 products
    if (existingProducts[0].count >= expectedProductCount) {
      log(`Found ${existingProducts[0].count} products, which meets or exceeds expected count of ${expectedProductCount}. Skipping product seeding...`);
      return;
    } else {
      log(`Found ${existingProducts[0].count} products, expected ${expectedProductCount}. Continuing with seeding...`);
    }

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

    const productData = [
      {
        name: "Nike Air Force 1",
        description: "The Nike Air Force 1 '07 is a basketball-inspired classic that delivers lasting comfort and style. Featuring the iconic design that revolutionized sneaker culture, this shoe offers premium leather construction, responsive cushioning, and timeless appeal that works for any occasion."
      },
      {
        name: "Nike Air Max 90",
        description: "Experience the iconic Air Max 90 with its revolutionary visible Air unit and sleek silhouette. This retro runner combines lightweight mesh and synthetic materials with the signature heel clip, providing excellent cushioning and breathability for all-day wear."
      },
      {
        name: "Nike Air Max 97",
        description: "The Nike Air Max 97 features the iconic wave-like design inspired by Japanese bullet trains. With its full-length visible Air unit and gradient colorways, this shoe delivers superior comfort and a futuristic aesthetic that stands out from the crowd."
      },
      {
        name: "Nike Air Max 270",
        description: "The Nike Air Max 270 delivers incredible all-day comfort with its massive 270-degree Air unit. The lightweight foam midsole and breathable mesh upper provide cushioning and support, while the modern design keeps you looking fresh."
      },
      {
        name: "Nike Air VaporMax",
        description: "The Nike Air VaporMax Plus features revolutionary VaporMax Air technology for lightweight, bouncy cushioning. The wavy design and breathable Flyknit upper create a futuristic look that's as comfortable as it is stylish."
      },
      {
        name: "Nike Air Zoom Pegasus 41",
        description: "The Nike Air Zoom Pegasus 41 offers reliable responsiveness and comfort for runners of all levels. With Zoom Air units in the forefoot and heel, plus a lightweight mesh upper, this versatile trainer is perfect for training and everyday wear."
      },
      {
        name: "Nike React Infinity Run Flyknit 4",
        description: "Engineered for long-distance comfort, the Nike React Infinity Run Flyknit 4 features soft React foam and a breathable Flyknit upper. The dynamic lacing system and padded collar provide a secure, customized fit for your longest runs."
      },
      {
        name: "Nike Revolution 7",
        description: "The Nike Revolution 7 delivers soft, responsive cushioning with every step. Featuring a breathable mesh upper and foam midsole, this lightweight trainer is perfect for casual wear, light training, and everyday activities."
      },
      {
        name: "Nike Downshifter 13",
        description: "The Nike Downshifter 13 combines comfort and performance in a versatile training shoe. With soft foam cushioning, a breathable upper, and a durable outsole, it's ideal for cross-training, gym workouts, and casual wear."
      },
      {
        name: "Nike Alphafly 3",
        description: "The Nike Alphafly 3 is engineered for elite racing performance. Featuring ZoomX foam and Energy Return technology, this lightweight racing flat delivers exceptional energy return and propulsion for competitive runners."
      },
      {
        name: "Nike Vaporfly 3",
        description: "The Nike Vaporfly 3 combines ZoomX foam with carbon fiber rods for maximum energy return. This elite racing shoe is designed for marathon and distance runners seeking peak performance and comfort during long races."
      },
      {
        name: "Nike SB Dunk Low",
        description: "The Nike SB Dunk Low brings skateboarding heritage to street style. With its low-profile design, durable leather construction, and iconic colorways, this shoe offers comfort and versatility for skate parks and city streets alike."
      },
      {
        name: "Nike Blazer Mid '77",
        description: "The Nike Blazer Mid '77 Vintage captures the essence of '70s basketball with its retro design. Premium leather construction, perforated detailing, and vintage-inspired colors make this a timeless addition to any sneaker collection."
      },
      {
        name: "Nike Court Vision Low",
        description: "The Nike Court Vision Low delivers court-style performance with everyday versatility. Featuring a synthetic leather upper, cushioned midsole, and heritage-inspired design, it's perfect for tennis, casual wear, and street style."
      },
      {
        name: "Nike Air Jordan 1",
        description: "The Air Jordan 1 revolutionized basketball footwear and sneaker culture. With its iconic design, premium leather construction, and legendary performance, this shoe continues to be a symbol of excellence and style."
      },
      {
        name: "Nike Air Jordan 4",
        description: "The Air Jordan 4 features innovative Air technology and mesh panels for breathability. With its iconic wing design and durable construction, this basketball legend delivers both performance and style on and off the court."
      },
      {
        name: "Nike LeBron 21",
        description: "The Nike LeBron 21 combines lightweight materials with powerful cushioning for elite performance. Featuring Max Air technology and a secure fit system, this shoe helps basketball players dominate with speed and precision."
      },
      {
        name: "Nike KD 17",
        description: "The Nike KD 17 delivers lightweight speed and agility for basketball players. With responsive cushioning and a secure fit, this shoe helps athletes move quickly and efficiently on the court."
      },
      {
        name: "Nike Metcon 9",
        description: "The Nike Metcon 9 is built for high-intensity training. With durable construction, stable support, and versatile design, this shoe performs across multiple workout types including weightlifting, HIIT, and functional training."
      },
      {
        name: "Nike Air Max Dn",
        description: "The Nike Air Max Dn features dynamic Air technology that adapts to your footstrike. With its innovative design and responsive cushioning, this shoe provides personalized comfort for running and everyday activities."
      },
    ];
    const prices = [99,109,119,129,139,149,159,169,179,189,199,209,219,229,239,249,259,269,279,289,];

    for (const productInfo of productData) {
      // Check if product already exists
      const existingProduct = await db
        .select()
        .from(products)
        .where(eq(products.name, productInfo.name))
        .limit(1);

      if (existingProduct.length > 0) {
        log(`Product ${productInfo.name} already exists, skipping...`);
        continue;
      }

      const productId = uuidv4();
      const gender = allGenders[Math.floor(Math.random() * allGenders.length)];
      const price = prices[Math.floor(Math.random() * prices.length)];

      const product = {
        id: productId,
        name: productInfo.name,
        price,
        description: productInfo.description,
        categoryId: shoesCat.id,
        genderId: gender.id,
        brandId: nike?.id ?? null,
        isPublished: true,
      };

      await db.insert(products).values(product as any);
      log(`Inserted product: ${productInfo.name}`);

      const chosenColors = allColors.slice(0, 2);
      const chosenSizes = allSizes.slice(0, 3);

      const createdVariantIds: string[] = [];

      for (const color of chosenColors) {
        for (const size of chosenSizes) {
          const variantId = uuidv4();
          const variant = {
            id: variantId,
            productId,
            sku: `${productInfo.name.replace(/\s+/g, "-").toUpperCase()}-${color.slug}-${size.slug}`,
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

      try {
        await uploadOnCloudinary({ productId, createdVariantIds, shoesCat, gender, nike });
        log(`Uploaded images for ${productInfo.name}`);
      } catch (uploadError) {
        err(`Failed to upload images for ${productInfo.name}:`, uploadError);
        // Continue with next product even if upload fails
      }
    }

    log("✅ Seed finished successfully");
  } catch (e: any) {
    err("❌ Seed failed:", e.message);
    err("Stack trace:", e.stack);
    process.exitCode = 1;
  }
}

seed();


