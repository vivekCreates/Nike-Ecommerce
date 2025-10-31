import { db } from "../db";
import { productImages } from "../db/schema";
import { v4 as uuidv4 } from "uuid";
import { BrandType, GenderType, ShoeType } from "../types";
import { v2 as cloudinary } from "cloudinary";
import { basename, join } from "path";
import fs from "fs";




export const uploadOnCloudinary = async ({
  productId,
  createdVariantIds,
  shoesCat,
  gender,
  nike,
}: {
  productId: string;
  createdVariantIds: string[];
  shoesCat: ShoeType;
  gender: GenderType;
  nike: BrandType;
}) => {
  try {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      throw new Error(
        "Cloudinary credentials are missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your environment."
      );
    }

    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });

    const sourceDir = join(process.cwd(), "public", "shoes");
    const files = fs
      .readdirSync(sourceDir)
      .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));

    if (files.length) {
      const pick = files[Math.floor(Math.random() * files.length)];
      const src = join(sourceDir, pick);

      const publicId = `nikestore/shoes/${productId}-${basename(pick).replace(/\.[^.]+$/, "")}`;
      const res = await cloudinary.uploader.upload(src, {
        public_id: publicId,
        folder: "nikestore/shoes",
        overwrite: true,
        resource_type: "image",
      });

      const imageRow = {
        id: uuidv4(),
        productId,
        variantId: createdVariantIds[0] ?? createdVariantIds.at(-1) ?? uuidv4(),
        categoryId: shoesCat.id,
        genderId: gender.id,
        brandId: nike?.id ?? null,
        url: res.secure_url,
        sortOrder: 0,
        isPrimary: true,
        isPublished: true,
      };

      await db.insert(productImages).values(imageRow as any);
    }
  } catch (e: any) {
    throw new Error(`Image attach failed: ${e?.message || e}`);
  }
};
