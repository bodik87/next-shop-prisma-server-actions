"use client"

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import { PrismaOrderProps, ProductForOrderProps } from '@/lib/schema'
import { PRODUCTS } from '@/data'

type Props = {
 orders: PrismaOrderProps[]
}

export default function Orders({ orders }: Props) {
 const jsonProducts = orders.map(order => order.products)

 const products: ProductForOrderProps[] = jsonProducts
  .map((jsonProduct: string) => JSON.parse(jsonProduct))

 const currentProduct = (item: any) => {
  return PRODUCTS
   .filter(product =>
    product.id === Number(item.productId))[0]
 }


 return (
  <Disclosure defaultOpen={orders.length > 0}>
   {({ open }) => (
    <>
     <Disclosure.Button className="mt-4 flex gap-2 w-fit justify-between rounded-lg pt-4 text-left font-medium focus:outline-none group">
      <b>Existed orders</b>
      <ChevronDown className={`${open && "rotate-180"} group-hover:stroke-green-600`} />
     </Disclosure.Button>

     <Disclosure.Panel className="mt-2">
      {orders.map((order, index: number) =>
       <div key={order.id} className='w-fit mt-4 bg-white p-3 rounded-md'>
        <b>{index + 1} order</b>
        <p>Total: {order.total} zl</p>
        <p>Created: {order.createdAt.toISOString()}</p>
        <p>Info: {order.info}</p>

        <Disclosure>
         {({ open }) => (
          <>
           <Disclosure.Button className="flex gap-2 w-fit justify-between rounded-lg pt-4 text-left font-medium focus:outline-none group">
            <b>Products</b>
            <ChevronDown className={`${open && "rotate-180"} group-hover:stroke-green-600`} />
           </Disclosure.Button>

           <Disclosure.Panel className="mt-2">
            {products
             .map((product, index) => (
              <div key={product.id}>
               <p>{index + 1}. {currentProduct(product).title}: {product.price} * {product.quantity}zt = {product.quantity * product.price}zl</p>
              </div>
             ))}
           </Disclosure.Panel>
          </>
         )}
        </Disclosure>
       </div>
      )}
     </Disclosure.Panel>
    </>
   )}
  </Disclosure>
 )
}