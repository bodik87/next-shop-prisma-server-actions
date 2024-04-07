"use client"

import React, { ChangeEvent, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { ShoppingBag } from 'lucide-react'
import { createLocalOrder } from '@/app/_actions/localOrder'
import { cn } from '@/lib/utils'

type Props = {
  isAvailable: boolean
  userEmail: string
  productId: number
  price: number
  inCart: boolean
  info: string | undefined
}

export default function AddToCart({ isAvailable, userEmail, productId, price, inCart, info }: Props) {

  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState<null | string>(null)

  const total = price * quantity

  async function action() {
    const product = { id: crypto.randomUUID(), productId, quantity, price }
    try {
      if (userEmail) {
        await createLocalOrder(userEmail, product, info)
      } else {
        await createLocalOrder("unregisteredUser@mail.com", product, undefined)
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
      <b>Price: {price}/szt</b>

      <>
        <p className='mt-2 text-3xl font-bold'>{total}</p>

        <div className='mt-4 flex gap-4 items-center'>

          {!inCart && (
            <div className='w-full flex border-2 rounded'>
              <button
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
                className='w-12 h-12 aspect-square font-bold'>
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
                className='w-12 h-12 aspect-square font-bold'>
                +
              </button>
            </div>
          )}

          <form action={action} className={cn('border-2 border-transparent', inCart && "w-full")}
          >
            <SubmitButton isAvailable={isAvailable} inCart={inCart} />
          </form>
        </div>

        <p className='text-xs font-bold mt-2 text-center text-red-600'>{error}</p>
      </>
    </>
  )
}

function SubmitButton({ isAvailable, inCart }: { isAvailable: boolean, inCart: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      disabled={pending || !isAvailable || inCart}
      className={cn("h-12 bg-green-600 disabled:bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded",
        inCart ? "w-full" : "w-12 aspect-square")}
    >
      {inCart ? "Already in cart" : <ShoppingBag />}
    </button>
  )
}