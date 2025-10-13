"use client";

import { NAV_ITEMS } from "@/lib/contants";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import DropDownMenu from "./DropDownMenu";
import Image from "next/image";
import { Button } from "./ui/button";
import { getCurrentUser } from "@/lib/auth/action";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserType } from "@/lib/types";


export default function Header() {

  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const userData = await getCurrentUser();
      setUser(userData)
    }
    getUser();
  }, [])

  return (
    <header className=" bg-white w-full mx-auto py-3 px-4 sm:px-6 md:px-8 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">
        <Image src={"/logo.png"} width={50} height={50} alt="logo" />
      </Link>

      <nav className="hidden sm:block">
        <ul className="flex gap-4">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={label}>
              <Link href={`${href == 'men' || href == 'women' ? `/shoes?gender=${href}` : `${href}`} `} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-4 items-center">
        <Link href={"/cart"}>
          <ShoppingCart />
        </Link>
        {
          user?.id ? <DropDownMenu /> : <Button variant={"outline"} className="hover:cursor-pointer" onClick={() => router.push("/sign-in")}>SignIn</Button>
        }

      </div>
    </header>
  );
}
