import { CATEGORIES } from '@/data'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = { id: string }

export default function CategoryBreadcrumbs({ id }: Props) {
 return (
  <div className='flex gap-2 items-center text-sm'>
   <Link
    href={`/`}
    className='text-gray-500'>
    <Home size={18} className='text-gray-500' />
   </Link>

   <ChevronRight size={18} className='text-gray-500' />

   <b>{CATEGORIES.filter(category =>
    category.id === Number(id))[0].title}
   </b>
  </div>
 )
}