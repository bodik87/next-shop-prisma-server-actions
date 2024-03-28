import React, { Suspense } from 'react'
import Link from 'next/link'
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

          <div className='mb-4 flex gap-2 items-center'>
            <Link href={`/`}><Home size={20} /></Link>
            <ChevronRight />
            <b>{CATEGORIES
              .filter(category =>
                category.id === Number(id))[0].title}</b>
          </div>

          <h2 className='font-bold'>Category id: <span>{id}</span></h2>

        </div>

        <div className="wrapper py-5">
          <div className='flex gap-3'>
            {PRODUCTS.filter(product => product.categoryId === Number(id)).map(
              (el) =>
                <Link
                  key={el.id}
                  href={{ pathname: categoryHref + el.slug + el.code, query: { id: el.id } }}
                  className='bg-white p-5 rounded-xl w-56 shadow'>
                  {el.title} {el.price}
                </Link>
            )}
          </div>
        </div>
      </Suspense>
    </section >
  )
}