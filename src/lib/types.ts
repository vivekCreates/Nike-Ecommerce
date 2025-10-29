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