import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { X } from 'lucide-react';
import { PRODUCTS } from '@/data';

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
 ],
 total: 150
}

export default function Cart({ }: Props) {

 const currentProduct = (id: number) => {
  return PRODUCTS.filter(product => product.id === id)[0]
 }

 return (
  <section>
   <div className="wrapper pb-5">
    <h2>Cart</h2>

    <section className='mt-4 flex flex-col lg:flex-row'>
     <div className='p-4 w-full lg:w-2/3 bg-white rounded-t-lg lg:rounded-r-none lg:rounded-l-xl flex flex-col items-start md:flex-row gap-8'>
      <div className='w-full'>
       <b>Products</b>

       <div className='mt-4 flex flex-col gap-3'>
        {order.products.map((product, i) => (
         <div key={product.id} className='flex flex-col md:flex-row gap-4 items-center border-b pb-3 last:border-none'>
          <div className='w-full flex gap-4 items-center'>
           <Image
            src={currentProduct(product.id).images[0]}
            alt={"Img"}
            width={408}
            height={100}
            className="w-32 h-32 object-contain bg-green-500 rounded-lg"
            priority
            quality={100}
           />

           <div className='w-full'>
            <b>{currentProduct(product.id).title}</b>
            <p>{currentProduct(product.id).price} zl</p>
           </div>
          </div>

          <div className='w-full flex gap-4 items-center justify-between'>

           <div className='mt-4 w-56 flex justify-between border-2 rounded-xl'>
            <button
             // onClick={() => setCount(count - 1)}
             className='py-4 px-6 font-bold'>
             -
            </button>

            <input
             type='number'
             min={1}
             step={1}
             // value={count}
             // onChange={(e: any) => setCount(e.target.value)}
             className='w-full text-center font-bold px-10 border-x-2 flex items-center justify-center' />

            <button
             // onClick={() => setCount(count + 1)}
             className='py-4 px-6 font-bold'>
             +
            </button>
           </div>

           <b className='px-4 whitespace-nowrap'>145 zl</b>

           <button><X /></button>
          </div>
         </div>
        ))}
       </div>

      </div>

     </div>

     <div className='w-full lg:w-1/3 min-w-[300px] bg-gray-100 p-4 rounded-b-lg lg:rounded-r-xl lg:rounded-l-none'>
      <div className='w-full flex items-center justify-between'>
       <b>Summary</b>
       <span>{order.products.length} items</span>
      </div>

      <p className='font-bold mt-4 text-xs'>Customer</p>
      <p>{order.customer.name}</p>

      <p className='font-bold mt-4 text-xs'>Adres</p>
      <p>{order.customer.adress}</p>

      <h2>{order.total} zl</h2>

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