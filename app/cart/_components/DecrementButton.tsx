"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'
import { decrementLocalOrder } from '@/app/_actions/cart'

type Props = { id: string }

export default function DecrementButton({ id }: Props) {
 return (
  <form action={decrementLocalOrder}>
   <input type="hidden" name="id" value={id} readOnly />
   <SubmitButton />
  </form>
 )
}

function SubmitButton() {
 const { pending } = useFormStatus()

 return (
  <button
   type='submit'
   disabled={pending}
   className="h-12 w-12 aspect-square font-bold disabled:bg-gray-100"
  >
   -
  </button>
 )
}