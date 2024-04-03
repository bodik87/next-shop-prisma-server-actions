"use client"

import React, { ChangeEvent, useState } from 'react'

type Props = {
 children: React.ReactNode
 total: number,
 quantity: number
 setQuantity: React.Dispatch<React.SetStateAction<number>>
}

export default function Counter({ children, quantity, total, setQuantity }: Props) {
 const [error, setError] = useState<null | string>(null)

 const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value
  setQuantity(Number(value))
 };

 return (
  <>
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
   {children}
  </>
 )
}