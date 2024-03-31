import React from 'react'
import { Search, ShoppingBag, User } from "lucide-react"
import Link from 'next/link'
import CategoriesMenu from './categories-menu'
import { getSession } from '@/lib/auth'
import { SessionProps } from '@/app/user/page'

type Props = {}

export default async function Header({ }: Props) {
 const session: SessionProps = await getSession();
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
      className='flex flex-nowrap'>
      <User />
      <span>{session?.name?.slice(0, 1).toUpperCase()}</span>
     </Link>
     <Link href={'/cart'}>
      <ShoppingBag />
     </Link>
    </div>
   </div>

   <div className='wrapper flex items-center gap-4'>
    <CategoriesMenu />
   </div>
  </header>
 )
}