"use client"

import { v4 as uuidv4 } from 'uuid';
import { createLocalOrder } from '@/app/_actions/localOrder'
import { cn } from '@/lib/utils'
import React, { ChangeEvent, useState } from 'react'

type Props = {
  isAvailable: boolean
  userEmail: string
  productId: number
  price: number
}

export default function AddToCart({ isAvailable, userEmail, productId, price }: Props) {

  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState<null | string>(null)

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuantity(Number(value))
  };

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
          onBlur={() => {
            if (quantity === null || quantity === 0) {
              setError("Min 1")
              setQuantity(1)
            }
            if (quantity > 100) {
              setError("Max 100")
              setQuantity(100)
            }
          }}
          onChange={handleChange}
          className='w-full text-center font-bold px-10 border-x-2 flex items-center justify-center' />

        <button
          onClick={() => setQuantity(quantity + 1)}
          className='py-4 px-6 font-bold'>
          +
        </button>
      </div>
      <p className='text-xs font-bold mt-2 text-center text-red-600'>{error}</p>


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