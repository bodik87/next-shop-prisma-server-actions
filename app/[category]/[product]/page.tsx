import React, { Suspense } from 'react'
import { PRODUCTS } from '@/data'

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

  return (
    <section className=''>
      <div className="wrapper py-5">
        <Suspense fallback={<SearchBarFallback />}>
          <h2 className='font-bold'>{product.title}</h2>
        </Suspense>

      </div>
    </section>
  )
}