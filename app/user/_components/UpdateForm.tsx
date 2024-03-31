"use client"

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { updateUser } from '@/lib/auth'

type Props = {
 email: string
}

export default function UpdateForm({ email }: Props) {
 const [state, formAction] = useFormState(updateUser, null)
 const { pending } = useFormStatus()

 return (
  <>
   <b className='block mt-8'>Add name and adress for delivery</b>

   <form
    action={formAction}
    className='mt-4 max-w-sm space-y-3'
   >
    <input type="hidden" name="email" value={email} />

    <input
     type="text"
     name="name"
     placeholder="Name"
     required
     className='w-full pr-10 py-2 bg-transparent border-b-black border outline-none'
    />

    <input
     type="text"
     name="address"
     placeholder="Address"
     required
     className='w-full pr-10 py-2 bg-transparent border-b-black border outline-none'
    />
    <small className='font-bold text-red-500'>{state?.message}</small>

    <button
     type='submit'
     disabled={pending}
     className="w-fit bg-orange-600 disabled:bg-gray-400 text-white flex items-center justify-center px-4 py-1.5 rounded-md"
    >
     Update
    </button >
   </form>
  </>
 )
}