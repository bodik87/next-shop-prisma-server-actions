"use client"

import React, { useState } from 'react'
import Counter from './Counter';
import Form from './Form';

type Props = {
  isAvailable: boolean
  userEmail: string
  productId: number
  price: number
  inCart: boolean
  info: string | undefined
}

export default function AddToCart({
  isAvailable,
  userEmail,
  productId,
  price,
  inCart,
  info
}: Props) {

  const [quantity, setQuantity] = useState(1)
  const total = price * quantity

  return (
    <>
      <b>Price: {price} zl/szt</b>
      {!inCart ? (
        <Counter quantity={quantity} total={total} setQuantity={setQuantity}>
          <Form
            isAvailable={isAvailable}
            userEmail={userEmail}
            productId={productId}
            info={info}
            quantity={quantity}
            price={price} />
        </Counter>
      ) : (
        <div className="mt-4 w-full bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded-lg"
        >
          Already in cart
        </div>
      )}
    </>
  )
}