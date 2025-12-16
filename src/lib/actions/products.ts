import { and, eq, inArray, lte } from "drizzle-orm";
import { db } from "../db";
import { brands, categories, genders, productImages, products, sizes } from "../db/schema";




 async function getAllProducts({
  gender,
  sports,
  price,
}: {
  gender?: string | string[] | undefined;
  sports?: string | string[] | undefined;
  price?: string | string[] | undefined;
}) {
  try {
    const filters: any[] = [];

    // ✅ Handle gender
    if (gender) {
      const genderArr = Array.isArray(gender) ? gender : [gender];
      filters.push(inArray(genders.slug, genderArr));
    }

    // ✅ Handle category
    if (sports) {
      const categoryArr = Array.isArray(sports) ? sports : [sports];
      filters.push(inArray(categories.slug, categoryArr));
    }

    console.log("category: ",sports)

    // ✅ Handle price (assume max price filter)
    if (price) {
      const priceValue = Array.isArray(price) ? Number(price[0]) : Number(price);
      if (!isNaN(priceValue)) filters.push(lte(products.price, priceValue));
    }

    // ✅ Final query
    const productsList = await db
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
      .where(filters.length ? and(...filters) : undefined);

      console.log("productsList: ",productsList);

    return productsList;
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return [];
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
        return product[0];
    } catch (error:any) {
        return { success: false, message: error?.message || "An error occurred" };
    }   
}

export { getAllProducts, getProductById };