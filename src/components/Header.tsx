"use client";

import { NAV_ITEMS } from "@/lib/contants";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import DropDownMenu from "./DropDownMenu";
import Image from "next/image";
import { Button } from "./ui/button";


export default function Header() {
  const user = {}
  return (
    <header className="w-full mx-auto py-3 px-4 sm:px-6 md:px-8 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">
        <Image src={"/logo.png"} priority width={50} height={50} alt="logo" className="bg-transparent" />
      </Link>

      <nav className="hidden sm:block">
        <ul className="flex gap-4">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={label}>
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-4 items-center">
        <ShoppingCart />
        {
          user ? <DropDownMenu/> : <Button variant={"outline"}>SignUp</Button>
        }
       
      </div>
    </header>
  );
}
