"use client"

import { deleteProductFromOrder } from '@/app/_actions/cart'
import { X } from 'lucide-react'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

type Props = {
 id: string
}

export default function DeleteProduct({ id }: Props) {
 const [state, formAction] = useFormState(deleteProductFromOrder, null)
 const { pending } = useFormStatus()
 return (
  <form
   action={formAction}
   className='mt-4 max-w-sm'
  >
   <input type="hidden" name="id" value={id} readOnly />

   <button
    type='submit'
    disabled={pending}
    className='w-9 h-9 bg-red-50 disabled:bg-gray-400 flex items-center justify-center rounded-lg active:scale-95'>
    <X />
   </button>
  </form>
 )
}