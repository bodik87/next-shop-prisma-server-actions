"use client"

import { v4 as uuidv4 } from 'uuid';
import { createLocalOrder } from '@/app/_actions/localOrder'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

type Props = {
  isAvailable: boolean
  userEmail: string
  productId: number
  price: number
}

export default function AddToCart({ isAvailable, userEmail, productId, price }: Props) {

  const [quantity, setQuantity] = useState(1)

  const total = price * quantity

  async function action() {
    const product = { id: uuidv4(), productId, quantity, price }
    try {
      if (userEmail) {
        await createLocalOrder(userEmail, product)
      } else {
        await createLocalOrder("unregisteredUser@mail.com", product)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <b>Price: {price} zl/szt</b>
      <p className='mt-2 text-3xl font-bold'>{total} zl</p>

      <div className='mt-4 flex justify-between border-2 rounded-xl'>
        <button
          disabled={quantity === 1}
          onClick={() => setQuantity(quantity - 1)}
          className='py-4 px-6 font-bold'>
          -
        </button>

        <input
          type='number'
          min={1}
          step={1}
          value={quantity}
          onPaste={(e) => {
            e.preventDefault()
            return false
          }}
          onChange={(e: any) => setQuantity(e.target.value.replace(/\D/g, ''))}
          className='w-full text-center font-bold px-10 border-x-2 flex items-center justify-center' />

        <button
          onClick={() => setQuantity(quantity + 1)}
          className='py-4 px-6 font-bold'>
          +
        </button>
      </div>


      <form action={action}>
        <button
          type='submit'
          disabled={!isAvailable}
          className={cn("w-full bg-green-600 disabled:bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded-lg",
            isAvailable && "mt-4")}
        >
          {isAvailable ? "Add to cart" : "No product"}
        </button>
      </form>
    </>
  )
}