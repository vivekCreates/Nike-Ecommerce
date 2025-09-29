
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] md:min-h-[92vh] bg-[url('/hero-bg.png')] bg-cover bg-center flex items-center justify-center">
            <div className="relative z-10 flex flex-col-reverse md:flex-row w-full max-w-8xl mx-auto px-4 sm:px-8 py-10 md:py-0 items-center justify-between">
                <div className="w-full md:w-1/2 flex flex-col gap-4 items-center md:items-start text-center md:text-left">
                    <h2 className="text-red text-lg sm:text-2xl md:text-3xl font-medium">Bold & Sporty</h2>
                    <h1 className="text-dark-900 text-3xl sm:text-5xl md:text-6xl font-bold leading-tight md:leading-[1.1]">
                        Style That Moves With You.
                    </h1>
                    <h2 className="text-base sm:text-xl md:text-2xl text-dark-900 font-normal">
                        Not just style. Not just comfort. Footwear that effortlessly moves with your every step.
                    </h2>
                    <Button
                        variant={"default"}
                        className=" md:py-6 py-5 px-6 rounded-full"
                    >
                        <Link href={"/shoes"}>
                        Find Your Shoe
                        </Link>
                    </Button>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
                    <figure className="w-3/4 sm:w-2/3 md:w-full max-w-[400px] md:max-w-[500px] lg:max-w-[700px]">
                        <Image
                            src={"/hero-shoe.png"}
                            alt="hero"
                            width={1100}
                            height={1100}
                            className="w-full h-auto object-contain drop-shadow-xl"
                            priority
                        />
                    </figure>
                </div>
            </div>
            <div className="absolute inset-0 bg-white/70 dark:bg-black/60 md:bg-transparent md:dark:bg-transparent z-0" aria-hidden="true"></div>
        </section>
    );
}
