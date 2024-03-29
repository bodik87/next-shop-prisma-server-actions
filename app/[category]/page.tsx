import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from "next/image";
import { CATEGORIES, PRODUCTS } from '@/data'
import { Home, ChevronRight, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils';

type PageSearchParams = {
  id: string
}

type Props = {
  searchParams: PageSearchParams
}

function SearchBarFallback() {
  return <div className='wrapper py-5'>Loading...</div>
}

export default function Category({ searchParams }: Props) {
  const id = searchParams.id

  const categoryHref = `${CATEGORIES
    .filter(category =>
      category.id === Number(id))[0].slug}/`

  return (
    <section className=''>
      <Suspense fallback={<SearchBarFallback />}>
        <div className="wrapper py-5">

          <div className='flex gap-2 items-center text-sm'>
            <Link href={`/`} className='text-gray-500'><Home size={18} className='text-gray-500' /></Link>
            <ChevronRight size={18} className='text-gray-500' />
            <b>{CATEGORIES
              .filter(category =>
                category.id === Number(id))[0].title}
            </b>
          </div>

          <h2 className='mt-4 font-bold text-2xl'>
            {CATEGORIES.filter(category =>
              category.id === Number(id))[0].title}
          </h2>

        </div>

        <div className="wrapper">
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
            {PRODUCTS.filter(product => product.categoryId === Number(id)).map(
              (el) =>
                <div key={el.id} className='w-full'>
                  <Link
                    href={{ pathname: categoryHref + el.slug + el.code, query: { id: el.id } }}
                    className='flex flex-col h-full bg-white p-5 rounded-xl w-full shadow'>

                    <Image
                      src={"/1.jpg"}
                      alt={"Img"}
                      width={408}
                      height={100}
                      className="mb-2 w-full object-contain rounded-lg"
                      priority
                      quality={100}
                    />

                    <h3 className='font-bold text-xl'>{el.title}</h3>
                    <div className='mt-2 flex justify-between items-center'>
                      <p className='font-bold text-xl'>{el.price} zl</p>

                      <button
                        className={cn('bg-green-500 p-2.5 rounded-xl font-bold text-lg',
                          el.isAvailable ? "bg-green-300" : "bg-gray-200",
                          el.isAvailable && "bg-red-400"
                        )}>
                        {el.isAvailable ? <ShoppingBag /> : "No"}
                      </button>
                    </div>


                  </Link>
                </div>

            )}
          </div>
        </div>
      </Suspense>
    </section >
  )
}