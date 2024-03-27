import React, { Suspense } from 'react'
import Link from 'next/link'
import { CATEGORIES, PRODUCTS } from '@/data'

type PageSearchParams = {
  id: string
}

type Props = {
  searchParams: PageSearchParams
}

function SearchBarFallback() {
  return <div className='wrapper'>Loading...</div>
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
          <h2 className='font-bold'>Category id: <span>{id}</span></h2>

        </div>

        <div className="wrapper py-5">
          {PRODUCTS.filter(product => product.id === Number(id)).map(
            (el) =>
              <Link
                key={el.id}
                href={{ pathname: categoryHref + el.slug, query: { id: el.id } }}
                className='bg-white p-5 rounded-xl w-56 shadow'>
                {el.title} {el.price}
              </Link>
          )}
        </div>
      </Suspense>
    </section>
  )
}