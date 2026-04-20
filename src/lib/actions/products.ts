import { and, eq, inArray, lte, gte, or } from "drizzle-orm";
import { db } from "../db";
import { brands, categories, genders, productImages, products, sizes } from "../db/schema";

type PriceRange = {
  min: number;
  max: number;
};

const PRICE_RANGES: { [key: string]: PriceRange } = {
  "under-50": { min: 0, max: 50 },
  "50-100": { min: 50, max: 100 },
  "100-150": { min: 100, max: 150 },
  "over-150": { min: 150, max: Infinity },
};

type Filters = {
  gender?: string | string[];
  sports?: string | string[];
  price?: string | string[];
};

async function getAllProducts({ gender, sports, price }: Filters = {}) {
  try {
    const filters: any[] = [];

    // Only filter by gender if gender is provided
    if (gender) {
      const genderValues = Array.isArray(gender) ? gender : [gender];
      filters.push(
        inArray(genders.slug, genderValues)
      );
    }

    // Only filter by category/sports if sports is provided
    if (sports) {
      const sportsValues = Array.isArray(sports) ? sports : [sports];
      filters.push(
        inArray(categories.slug, sportsValues)
      );
    }

    // Price filter
    if (price) {
      const priceValues = Array.isArray(price) ? price : [price];
      const priceFilters = priceValues
        .map((p) => {
          const range = PRICE_RANGES[p];
          if (!range) return null;
          if (range.max === Infinity) {
            return gte(products.price, range.min);
          }
          return and(gte(products.price, range.min), lte(products.price, range.max));
        })
        .filter((p): p is any => p !== null);

      if (priceFilters.length > 0) {
        filters.push(or(...priceFilters));
      }
    }

    // Build the where clause
    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    // Get all products with their first image
    const allProducts = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        image: productImages.url,
        price: products.price,
        category: categories.name,
        gender: genders.label,
        brands: brands.name,
        isPublished: products.isPublished,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(products)
      .leftJoin(productImages, eq(products.id, productImages.productId))
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(genders, eq(products.genderId, genders.id))
      .leftJoin(brands, eq(products.brandId, brands.id))
      .where(whereClause);

    return allProducts.map(p => ({
      ...p,
      image: p.image || "/shoes/shoe-1.jpg",
    }));
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return [];
  }
}


async function getProducts(){
  try {
    const allProducts = await db.select().from(products);
    console.log(allProducts);
    return allProducts;
  } catch (error) {
    console.log('error: ',error);
  }
}


async function getProductById(id: string) {
    try {
        const product = await db
        .select({
            id: products.id,
                name: products.name,
                description: products.description,
                image: productImages.url,
                price:products.price    ,
                category: categories.name,
                gender: genders.label,
                brands: brands.name,
                isPublished: products.isPublished,
                createdAt: products.createdAt,
                updatedAt: products.updatedAt
        }).
        from(products)
        .leftJoin(productImages, eq(products.id, productImages.productId))
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .leftJoin(genders, eq(products.genderId, genders.id))
        .leftJoin(brands, eq(products.brandId, brands.id))
        .leftJoin(sizes, eq(productImages.variantId, sizes.id))
        .where(eq(products.id, id))
        .limit(1);
        if (product.length === 0) {
            return { success: false, message: "Product not found" };
        }   
        console.log(product);
        return product[0] ? {
          ...product[0],
          image: product[0].image || "/shoes/shoe-1.jpg"
        } : null;
    } catch (error:any) {
        return { success: false, message: error?.message || "An error occurred" };
    }   
}

export { getAllProducts,getProducts, getProductById };