"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { X } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/data';
import Link from 'next/link';

type Props = {}

const order = {
  id: 1,
  customer: {
    id: 1,
    name: "Bogdan",
    adress: "Poznanska 14a"
  },
  products: [
    { id: 1, productId: 1, quantity: 1 },
    { id: 2, productId: 3, quantity: 3 },
    { id: 3, productId: 2, quantity: 2 },
  ],
  total: 150
}

export default function Cart({ }: Props) {

  const currentProduct = (id: number) => {
    return PRODUCTS.filter(product => product.id === id)[0]
  }

  // const categoryHref = `${CATEGORIES
  //   .filter(category =>
  //     category.id === Number(product.categoryId))[0].slug}/`

  return (
    <section>
      <div className="wrapper pb-5">
        <h2>Cart</h2>

        <section className='mt-4 flex flex-col lg:flex-row rounded-lg shadow-md'>
          <div className='p-4 w-full lg:w-2/3 bg-white rounded-t-lg lg:rounded-r-none lg:rounded-l-lg flex flex-col items-start md:flex-row gap-8'>
            <div className='w-full'>

              <div className='flex flex-col gap-3'>
                {order.products.map((product, index) => (
                  <div key={product.id} className='flex flex-col md:flex-row gap-4 items-center border-b pb-3 last:pb-0 last:border-none'>
                    <div className='w-full flex gap-4 md:items-center'>
                      <Link
                        href={'/'}
                        className='w-32 h-32 aspect-square'
                      // href={{
                      //   pathname: categoryHref + currentProduct(analogue).slug + currentProduct(analogue).code, query: {
                      //     id: currentProduct(analogue).id
                      //   }
                      // }}
                      >
                        <Image
                          src={currentProduct(product.id).images[0]}
                          alt={"Img"}
                          width={408}
                          height={100}
                          className="w-full h-full object-contain bg-gray-200 rounded-lg"
                          priority
                          quality={100}
                        />
                      </Link>

                      <div className='w-full'>
                        <b>{index + 1}. {currentProduct(product.id).title}</b>
                        <p>{currentProduct(product.id).price} zl/szt</p>
                      </div>
                    </div>

                    <div className='w-full flex gap-4 items-center justify-between'>

                      <div className='max-w-44 w-full flex justify-between border-2 rounded-xl'>
                        <button
                          // onClick={() => setCount(count - 1)}
                          className='h-12 w-12 aspect-square font-bold'>
                          -
                        </button>

                        <input
                          type='number'
                          value={order.products.filter(el => el.id === product.id)[0].quantity}
                          min={1}
                          step={1}
                          onPaste={(e) => {
                            e.preventDefault()
                            return false
                          }}
                          // value={count}
                          // onChange={(e: any) => setCount(e.target.value)}
                          className='w-full text-center font-bold border-x-2 flex items-center justify-center' />

                        <button
                          // onClick={() => setCount(count + 1)}
                          className='h-12 w-12 aspect-square font-bold'>
                          +
                        </button>
                      </div>

                      <b className='px-4 whitespace-nowrap'>
                        {order.products.filter(el => el.id === product.id)[0].quantity * currentProduct(product.id).price}
                      </b>

                      <button
                        className='w-9 h-9 bg-red-50 flex items-center justify-center rounded-lg active:scale-95'>
                        <X />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          <div className='w-full lg:w-1/3 min-w-[300px] bg-gray-100 p-4 rounded-b-lg lg:rounded-r-lg lg:rounded-l-none'>
            <div className='w-full flex items-center justify-between'>
              <b className='text-lg'>Summary</b>
              <span>{order.products.length} items</span>
            </div>

            <p className='font-bold mt-4 text-xs'>Customer</p>
            <p>{order.customer.name}</p>

            <p className='font-bold mt-4 text-xs'>Adres</p>
            <p>{order.customer.adress}</p>

            <div className='flex justify-between items-center'>
              <h2>Total:</h2>
              <h2>{order.total} zl</h2>
            </div>

            <button
              className={cn("w-full bg-black disabled:bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded-lg",
                true && "mt-4")}
            >
              Buy
            </button>
          </div>
        </section>
      </div>
    </section>
  )
}