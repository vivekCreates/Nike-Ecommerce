import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {v2 as cloudinary} from 'cloudinary';
import { readdirSync } from "fs";
import { basename, join } from "path";
import { v4 as uuidv4 } from "uuid";
import { productImages } from "./db/schema";
import { db } from "./db";
import { BrandType, GenderType, ShoeType } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const firstLetterOfName = (str: string) => {
  return str.charAt(0).toUpperCase();
}


export const randomShoeImage = (arr: string[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}



export const uploadOnCloudinary = async({productId,createdVariantIds,shoesCat,gender,nike}:{productId:string,createdVariantIds:string[],shoesCat:ShoeType,gender:GenderType,nike:BrandType}) => {
          try {
          
            if (typeof window === 'undefined') {
              const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
              if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
                throw new Error('Cloudinary credentials are missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your environment.');
              }
              cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                secure: true,
              });
            }

            const sourceDir = join(process.cwd(), 'public', 'shoes');
            const files = readdirSync(sourceDir).filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
            if (files.length) {
              const pick = files[Math.floor(Math.random() * files.length)];
              const src = join(sourceDir, pick);

              // Upload to Cloudinary
              const publicId = `nikestore/shoes/${productId}-${basename(pick).replace(/\.[^.]+$/, '')}`;
              const res = await cloudinary.uploader.upload(src, {
                public_id: publicId,
                folder: 'nikestore/shoes',
                overwrite: true,
                resource_type: 'image',
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
          } catch (e:any) {
            throw new Error('image attach failed',e?.message );
          }
}