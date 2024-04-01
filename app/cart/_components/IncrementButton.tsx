"use client"

import { incrementLocalOrder } from '@/app/_actions/cart'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

type Props = { quantity: number }

export default function IncrementButton({ quantity }: Props) {
 const [state, formAction] = useFormState(incrementLocalOrder, null)
 const { pending } = useFormStatus()
 return (
  <form
   action={formAction}
  >
   <input type="hidden" name="quantity" value={quantity} readOnly />

   <button
    type='submit'
    disabled={pending}
    className='h-12 w-12 aspect-square font-bold disabled:bg-gray-400'>
    +
   </button>
  </form>
 )
}