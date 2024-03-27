import React from 'react'
import { Search, ShoppingBag } from "lucide-react"
import Link from 'next/link'
import CategoriesMenu from './categories-menu'

type Props = {}

export default function Header({ }: Props) {
 return (
  <header>
   <div className="wrapper py-4 flex items-center justify-between gap-4">
    <Link href={`/`} className='flex items-center gap-4'>
     <b>Shop</b>
    </Link>

    <div className='relative max-w-md w-full'>
     <input
      type="search"
      className='w-full pl-4 pr-10 py-2 rounded-xl border outline-none'
      placeholder='Search'
     />
     <Search className='absolute right-3 top-1/2 -translate-y-1/2' />
    </div>

    <div className='flex items-center gap-4'>
     <ShoppingBag />
    </div>
   </div>

   <div className='wrapper pb-4 flex items-center gap-4'>
    <CategoriesMenu />
   </div>
  </header>
 )
}