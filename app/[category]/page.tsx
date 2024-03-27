import { CATEGORIES, PRODUCTS } from '@/data'
import Link from 'next/link'
import React from 'react'

type PageSearchParams = {
  id: string
}

type Props = {
  searchParams: PageSearchParams
}

export default function Category({ searchParams }: Props) {
  const id = searchParams.id

  const categoryHref = `${CATEGORIES
    .filter(category =>
      category.id === Number(id))[0].slug}/`

  return (
    <section className=''>
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
    </section>
  )
}