import React from 'react'
import { Search, ShoppingBag, User } from "lucide-react"
import Link from 'next/link'
import { getLocalOrder } from '@/app/_actions/localOrder'
import { getSession } from '@/app/_actions/user'
import { ProductForOrderProps, SessionProps } from '@/lib/schema'
import { cn } from '@/lib/utils'
import Categories from './categories'

export default async function Header() {
 const session: SessionProps = await getSession();
 const order: any = await getLocalOrder();

 return (
  <header>
   <div className="wrapper py-4 flex items-center justify-between gap-4">
    <Link href={`/`} className='flex items-center gap-4'>
     <b className='text-xl whitespace-nowrap'>Shop</b>
    </Link>

    <div className='relative max-w-md w-full'>
     <input
      type="search"
      className='w-full pl-4 pr-10 py-2 rounded-xl border outline-none'
      placeholder='Search'
     />
     <Search className='absolute right-3 top-1/2 -translate-y-1/2' />
    </div>

    <div className='flex items-center gap-6'>
     <Link
      href={'/user'}
     >
      <User className={cn("", session?.email && "stroke-green-800")} />
     </Link>
     <Link href={'/cart'} className='relative'>
      <ShoppingBag />
      {order && (
       <span
        className='absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-5 h-5 aspect-square flex items-center justify-center text-[8px]'>
        {order.products.reduce(
         (acc: number, el: ProductForOrderProps) => {
          const res = acc + el.quantity;
          return res;
         },
         0
        )}
       </span>
      )}
     </Link>
    </div>
   </div>

   <div className='wrapper flex items-center gap-4 relative'>
    {/* <CategoriesMenu /> */}
    <Categories />
   </div>
  </header>
 )
}