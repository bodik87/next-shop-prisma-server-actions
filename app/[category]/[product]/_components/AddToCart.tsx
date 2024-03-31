"use client"

import { createLocalOrder } from '@/app/_actions/orders'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

type Props = {
  isAvailable: boolean
  userEmail: string
  price: number
}

export default function AddToCart({ isAvailable, userEmail, price }: Props) {

  const [count, setCount] = useState(1)

  async function action() {
    try {
      if (userEmail) {
        await createLocalOrder(userEmail, total)
      } else {
        await createLocalOrder("unregisteredUser@mail.com", total)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const total = price * count

  return (
    <>
      <b>Price: {price} zl/szt</b>
      <p className='mt-2 text-3xl font-bold'>{total} zl</p>

      <div className='mt-4 flex justify-between border-2 rounded-xl'>
        <button
          disabled={count === 1}
          onClick={() => setCount(count - 1)}
          className='py-4 px-6 font-bold'>
          -
        </button>

        <input
          type='number'
          min={1}
          step={1}
          value={count}
          onPaste={(e) => {
            e.preventDefault()
            return false
          }}
          onChange={(e: any) => setCount(e.target.value.replace(/\D/g, ''))}
          className='w-full text-center font-bold px-10 border-x-2 flex items-center justify-center' />

        <button
          onClick={() => setCount(count + 1)}
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