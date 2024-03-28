import React, { Suspense } from 'react'
import { CATEGORIES, PRODUCTS } from '@/data'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type PageSearchParams = {
  id: string
}

type Props = {
  searchParams: PageSearchParams
}

function SearchBarFallback() {
  return <div className='wrapper py-5'>Loading...</div>
}

export default function Product({ searchParams }: Props) {
  const id = searchParams.id

  const product = PRODUCTS
    .filter(product =>
      product.id === Number(id))[0]

  const categoryHref = `${CATEGORIES
    .filter(category =>
      category.id === Number(product.categoryId))[0].slug}/`

  const currentProduct = (size: any) => {
    return PRODUCTS
      .filter(product =>
        product.id === Number(size.productId))[0]
  }

  return (
    <section className=''>
      <Suspense fallback={<SearchBarFallback />}>
        <div className="wrapper py-5">
          <h2 className='font-bold'>{product.title}</h2>
          <p>EAN: {product.code}</p>
          <p>Price: {product.price}</p>

          <b>Sizes</b>
          <div className='flex gap-3'>{product.sizeOptions.map(size => (
            <Link
              key={size.id}
              href={{
                pathname: categoryHref + currentProduct(size).slug + currentProduct(size).code, query: {
                  id: currentProduct(size).id
                }
              }}
              className={cn("p-2 rounded-md",
                product.id === size.productId ? "bg-red-300" : "bg-blue-300"
              )}>
              {size.size}
            </Link>
          ))}</div>
        </div>
      </Suspense>
    </section>
  )
}