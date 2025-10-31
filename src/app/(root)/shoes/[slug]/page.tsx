import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import ReviewSection from "@/components/ReviewSection";
import ShoeImageCard from "@/components/ShoeImageCard";
import ShoeSizes from "@/components/ShoeSizes";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/actions/products";
import { products, SHOES } from "@/lib/contants";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Heart } from "lucide-react";
import { ProductType } from "@/lib/types";

export default async function Page({ params }: { params: { slug: string } }) {
  const {slug} = await params;
  const product = await getProductById(slug) as ProductType;
  console.log(product);

  return (
    <>
      <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* { <div className="flex lg:flex-col gap-2 flex-wrap justify-center lg:justify-start">
            {product.images?.map((img: string, idx: number) => (
              <ShoeImageCard key={idx} idx={idx} img={img} />
            ))}
          </div> } */}
{
          <figure className="relative w-full lg:w-[28rem] h-[34rem] rounded-md overflow-hidden flex justify-center items-center">
            <Image
              src={product?.image}
              alt={product?.name}
              width={600}
              height={600}
              className="w-full h-full object-cover object-center"
            />
          </figure> }

          <div className="w-full lg:max-w-lg flex flex-col gap-4 p-5 rounded-md">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">{product?.name}</h1>
              <p className="text-sm md:text-base">{product?.gender}</p>
              <h1 className="text-xl md:text-2xl font-semibold">${product?.price}</h1>
              <p className="text-green-600 text-sm">Extra 20% off</p>
            </div>

            <ShoeSizes />

            <div className="flex flex-col gap-4 py-4">
              <Button className="py-7 rounded-full">Add to Bag</Button>
              <Button className="py-7 rounded-full border-1 border-black" variant="outline">
                <Heart /> Favourite
              </Button>
            </div>

            <div className="flex flex-col gap-4 py-10">
              <h1 className="text-heading-3">Product Details</h1>
              <p>{product?.description}</p>
              <ReviewSection />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-heading-3 ml-10 font-semibold">You Might Also Like</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 p-10">
          {/* {products.slice(0, 3).map(({ id, name, price, imageUrl }) => (
            <ProductCard  key={id} name={name} price={price} image={imageUrl} />
          ))} */}
        </div>
      </div>
    </>
  );
}
