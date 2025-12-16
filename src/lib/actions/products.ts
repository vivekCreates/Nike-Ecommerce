import { and, eq, inArray, lte } from "drizzle-orm";
import { db } from "../db";
import { brands, categories, genders, productImages, products, sizes } from "../db/schema";



 type Filters = {
  gender?: string | string[];
  sports?: string | string[];
  price?: string | string[];
};

async function getAllProducts({ gender, sports, price }: Filters = {}) {
  try {
    const filters = [];

    if (gender) {
      filters.push(
        inArray(genders.slug, Array.isArray(gender) ? gender : [gender])
      );
    }

    if (sports) {
      filters.push(
        inArray(categories.slug, Array.isArray(sports) ? sports : [sports])
      );
    }

    if (price) {
      const value = Number(Array.isArray(price) ? price[0] : price);
      if (!isNaN(value)) filters.push(lte(products.price, value));
    }

    return await db
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
        return product[0];
    } catch (error:any) {
        return { success: false, message: error?.message || "An error occurred" };
    }   
}

export { getAllProducts,getProducts, getProductById };