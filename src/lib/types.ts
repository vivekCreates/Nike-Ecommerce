export type UserType = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null | undefined;
    createdAt: Date;
    updatedAt: Date;
} 


export type ShoeType = {
     id: string;
     name?: string | null;
     slug: string | null;
     createdAt: Date;
     updatedAt: Date; 
}

export type GenderType = ShoeType & {
    label?: string | null;
}

export type BrandType = ShoeType & {};


export type ProductType = {
    id:string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    gender: string;
    brands: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}