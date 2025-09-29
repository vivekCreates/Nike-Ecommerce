import { NAV_ITEMS } from '@/lib/contants'
import { firstLetterOfName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import React from 'react'

export default function DropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>

        <Avatar className='w-8 h-8 flex items-center justify-center object-center object-cover overflow-hidden rounded-full cursor-pointer'>
          <AvatarImage
            className='w-full h-full'
            src=""
            alt="@shadcn"
          />
          <AvatarFallback className=" w-full h-full flex items-center justify-center bg-dark-700 text-white">{firstLetterOfName("vivek")}</AvatarFallback>
        </Avatar>

      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-light-200 p-2 w-40 mt-2 rounded-md shadow-sm flex flex-col items-center justify-center"
      >
        {NAV_ITEMS.map(({ href, label }) => (
          <Link key={label} href={href}>
            <DropdownMenuItem className="hover:bg-light-300 outline-none p-2 w-36 rounded-md flex cursor-pointer justify-center sm:hidden">
              {label}
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuItem className="hover:bg-light-300 outline-none w-36 p-2 rounded-md flex cursor-pointer justify-center text-red-500">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
