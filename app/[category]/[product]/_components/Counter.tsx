"use client"

import React, { useState } from 'react'

type Props = {
 price: number
}

export default function Counter({ price }: Props) {
 const [count, setCount] = useState(1)
 return (
  <>
   <b>Price: {price} zl/szt</b>
   <p className='mt-2 text-3xl font-bold'>{price * count} zl</p>

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
     onChange={(e: any) => setCount(e.target.value)}
     className='w-full text-center font-bold px-10 border-x-2 flex items-center justify-center' />

    <button
     onClick={() => setCount(count + 1)}
     className='py-4 px-6 font-bold'>
     +
    </button>
   </div>
  </>
 )
}