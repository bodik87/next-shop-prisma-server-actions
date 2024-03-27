import { PRODUCTS } from '@/data'
import React from 'react'

type PageSearchParams = {
 id: string
}

type Props = {
 searchParams: PageSearchParams
}

export default function Product({ searchParams }: Props) {
 const id = searchParams.id

 const product = PRODUCTS
  .filter(product =>
   product.id === Number(id))[0]

 return (
  <section className=''>
   <div className="wrapper py-5">
    <h2 className='font-bold'>{product.title}</h2>

   </div>
  </section>
 )
}