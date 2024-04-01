"use client"

import React from 'react'
import { decrementLocalOrder } from '@/app/_actions/cart'
import { useFormState, useFormStatus } from 'react-dom'

type Props = { id: string }

export default function DecrementButton({ id }: Props) {
 const [state, formAction] = useFormState(decrementLocalOrder, null)
 const { pending } = useFormStatus()
 return (
  <form
   action={formAction}
  >
   <input type="hidden" name="id" value={id} readOnly />

   <button
    type='submit'
    disabled={pending}
    className='h-12 w-12 aspect-square font-bold disabled:bg-gray-400'>
    -
   </button>
  </form>
 )
}