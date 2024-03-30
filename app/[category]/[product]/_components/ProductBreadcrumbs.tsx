import { CATEGORIES } from '@/data'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
 categoryHref: string,
 categoryId: number,
 title: string
}

export default function ProductBreadcrumbs({ categoryHref, categoryId, title }: Props) {
 return (
  <div className='flex gap-2 items-center text-sm'>
   <Link href={`/`}>
    <Home size={18} className='text-gray-500' />
   </Link>

   <ChevronRight size={18} className='text-gray-500' />

   <Link
    className='text-gray-500'
    href={{ pathname: categoryHref, query: { id: categoryId } }}>
    {CATEGORIES
     .filter(category =>
      category.id === Number(categoryId))[0].title}
   </Link>
   <ChevronRight size={18} className='text-gray-500' />
   <b>{title}</b>
  </div>
 )
}