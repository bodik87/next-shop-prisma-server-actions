"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'
import { X } from 'lucide-react'
import { deleteProductFromOrder } from '@/app/_actions/cart'

type Props = { id: string }

export default function DeleteProduct({ id }: Props) {

 return (
  <form action={deleteProductFromOrder}>
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
   className='w-9 h-9 mr-2 bg-red-50 disabled:bg-gray-400 flex items-center justify-center rounded-lg active:scale-95'>
   <X />
  </button>
 )
}