import { eq } from "drizzle-orm";
import { db } from "../db";
import { brands, categories, genders, productImages, products, sizes } from "../db/schema";


async function getAllProducts() {
    try {
        const productsList = await db
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
            })
            .from(products)
            .leftJoin(productImages, eq(products.id, productImages.productId))
            .leftJoin(categories, eq(products.categoryId, categories.id))
            .leftJoin(genders, eq(products.genderId, genders.id))
            .leftJoin(brands, eq(products.brandId, brands.id));

        return productsList;
    } catch (error:any) {
        console.log(error?.message)
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
        from(products).
        where(eq(products.id, id))
        .leftJoin(productImages, eq(products.id, productImages.productId))
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .leftJoin(genders, eq(products.genderId, genders.id))
        .leftJoin(brands, eq(products.brandId, brands.id))
        .leftJoin(sizes, eq(productImages.variantId, sizes.id))
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