import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = { item: any, categoryHref: string }

export default function ProductCard({ item, categoryHref }: Props) {
 return (
  <div key={item.id} className='w-full'>
   <Link
    href={{ pathname: categoryHref + item.slug + item.code, query: { id: item.id } }}
    className="bg-white flex flex-col h-full p-1 pb-2 rounded w-full shadow md:hover:shadow-lg transition-all relative"
   >
    <Image
     src={item.images[0]}
     alt={"Img"}
     width={408}
     height={100}
     className={cn("w-full object-contain bg-gray-200 rounded",
      !item.isAvailable && "opacity-80")}
     priority
     quality={100}
    />

    {!item.isAvailable &&
     <div className='absolute top-1 left-1 p-4 rounded-tl rounded-br w-fit bg-black/80 text-white text-sm font-semibold'>
      Is not available
     </div>
    }

    <p className='mt-2 px-1 font-bold lg:text-lg xl:text-base'>{item.title}</p>
    <p className='px-1 font-bold lg:text-lg xl:text-base'>{item.price}</p>
   </Link>
  </div>
 )
}