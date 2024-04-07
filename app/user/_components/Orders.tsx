"use client"

import React from 'react'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import { PrismaOrderProps, ProductForOrderProps } from '@/lib/schema'
import { formatDate } from '@/lib/date'
import { PRODUCTS } from '@/data'
import MasonryGrid from '@/components/ui/MasonryGrid'

type Props = { orders: PrismaOrderProps[] }

export default function Orders({ orders }: Props) {
  const parsedOrders = orders.map(order => {
    const { products, ...spread } = order
    const parsedProducts: ProductForOrderProps[] = JSON.parse(products)
    return { products: parsedProducts, ...spread }
  })

  const currentProduct = (item: any) => {
    return PRODUCTS
      .filter(product =>
        product.id === Number(item.productId))[0]
  }

  return (
    <Disclosure defaultOpen={orders.length < 2}>
      {({ open }) => (
        <>
          <Disclosure.Button className="mt-4 flex gap-2 w-fit justify-between rounded pt-4 text-left font-medium focus:outline-none group">
            <b>{`Existed orders (${orders.length})`}</b>
            <ChevronDown className={`${open && "rotate-180"} group-hover:stroke-green-600`} />
          </Disclosure.Button>

          <Disclosure.Panel>
            <MasonryGrid>
              {parsedOrders
                .sort((a, b): any => (a.createdAt as any > b.createdAt as any) - (a.createdAt as any < b.createdAt as any))
                .map((order, index: number) =>
                  <div key={order.id} className='mt-2 first:mt-0 w-full bg-white p-3 rounded'>
                    <b>{index + 1}.</b>
                    <p>Total: <b>{order.total} zl</b></p>
                    <p>Created: {formatDate(order.createdAt)}</p>
                    <p>Info: {order.info}</p>

                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex gap-2 w-fit justify-between rounded pt-4 text-left font-medium focus:outline-none group">
                            <b>Products</b>
                            <ChevronDown className={`${open && "rotate-180"} group-hover:stroke-green-600`} />
                          </Disclosure.Button>

                          <Disclosure.Panel className="mt-2">
                            {order.products.map((product, i) => (
                              <div key={product.id} className='w-full bg-gray-100 p-3 rounded text-sm'>
                                <b>{i + 1}. {currentProduct(product).title}</b>
                                <div className='mt-1 flex gap-2'>
                                  <Image
                                    src={currentProduct(product).images[0]}
                                    alt={"Img"}
                                    width={50}
                                    height={50}
                                    className="object-contain h-fit bg-gray-200 rounded"
                                    priority
                                    quality={100}
                                  />
                                  <div>
                                    <p>Purchase price: {product.price} zl</p>
                                    <p>Quantity: {product.quantity} szt</p>
                                  </div>
                                </div>

                              </div>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                )}
            </MasonryGrid>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}