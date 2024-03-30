import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from "next/image";
import { CATEGORIES, PRODUCTS } from '@/data'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils';
import CategoryBreadcrumbs from './_components/CategoryBreadcrumbs';

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

        <div className="wrapper pt-5 pb-3">
          <CategoryBreadcrumbs id={id} />

          <h2 className='mt-4 font-bold text-2xl'>
            {CATEGORIES.filter(category =>
              category.id === Number(id))[0].title}
          </h2>
        </div>

        <div className="wrapper pb-5">
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
            {PRODUCTS.filter(product => product.categoryId === Number(id)).map(
              (el) =>
                <div key={el.id} className='w-full'>
                  <Link
                    href={{ pathname: categoryHref + el.slug + el.code, query: { id: el.id } }}
                    className={cn("flex flex-col h-full  p-3 rounded-xl w-full shadow relative",
                      el.isAvailable ? "bg-white" : "bg-gray-100")}
                  >
                    <Image
                      src={el.images[0]}
                      alt={"Img"}
                      width={408}
                      height={100}
                      className={cn("w-full object-contain rounded-lg",
                        !el.isAvailable && "opacity-50")}
                      priority
                      quality={100}
                    />

                    {!el.isAvailable && <div className='absolute top-3 left-3 p-4 rounded-tl-lg rounded-br-lg w-fit bg-black text-white text-sm font-semibold'>
                      Is not available
                    </div>}

                    <h3 className='mt-4 font-bold text-xl'>{el.title}</h3>

                    <div className='mt-2 flex justify-between items-end'>
                      <p className='font-bold text-xl'>{el.price} zl</p>

                      {el.isAvailable &&
                        <button
                          className={cn('bg-green-500 p-2.5 rounded-xl font-bold text-lg',
                            el.isAvailable ? "bg-green-300" : "bg-gray-200",
                            el.isAvailable && "bg-red-400"
                          )}>
                          <ShoppingBag />
                        </button>
                      }
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