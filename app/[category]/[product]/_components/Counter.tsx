"use client"

import React, { useState } from 'react'

type Props = {
 price: number
}

export default function Counter({ price }: Props) {
 const [count, setCount] = useState(1)
 return (
  <>
   <p>Price: {price} zl/szt</p>
   <p className='mt-2 text-3xl font-bold'>{price * count} zl</p>

   <div className='mt-2 flex justify-between border-2 rounded-xl'>
    <button
     disabled={count === 1}
     onClick={() => setCount(count - 1)}
     className='p-4 font-bold'>
     -
    </button>

    <input
     type='number'
     min={1}
     step={1}
     value={count}
     onChange={(e: any) => setCount(e.target.value)}
     className='w-1/2 text-center font-bold px-10 border-x-2 flex items-center justify-center' />

    <button
     onClick={() => setCount(count + 1)}
     className='p-4 font-bold'>
     +
    </button>
   </div>
  </>
 )
}