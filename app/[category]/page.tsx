import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from "next/image";
import { CATEGORIES, PRODUCTS } from '@/data'
import { Home, ChevronRight } from 'lucide-react'

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

          <div className='mb-4 flex gap-2 items-center text-sm'>
            <Link href={`/`} className='text-gray-500'><Home size={18} className='text-gray-500' /></Link>
            <ChevronRight size={18} className='text-gray-500' />
            <p>{CATEGORIES
              .filter(category =>
                category.id === Number(id))[0].title}
            </p>
          </div>

          <h2 className='font-bold'>Category id: <span>{id}</span></h2>

        </div>

        <div className="wrapper py-5">
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {PRODUCTS.filter(product => product.categoryId === Number(id)).map(
              (el) =>
                <div key={el.id} className='w-full'>
                  <Image
                    src={"/1.jpg"}
                    alt={"Img"}
                    width={408}
                    height={100}
                    className="w-full object-contain rounded-lg"
                    priority
                    quality={100}
                  />
                  <Link
                    href={{ pathname: categoryHref + el.slug + el.code, query: { id: el.id } }}
                    className='bg-white p-5 rounded-xl w-56 shadow'>
                    {el.title} {el.price}
                  </Link>
                </div>

            )}
          </div>
        </div>
      </Suspense>
    </section >
  )
}