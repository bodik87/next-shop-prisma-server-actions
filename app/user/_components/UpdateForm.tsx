"use client"

import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { updateUser } from '../../_actions/user'

type Props = {
 email: string
}

export default function UpdateForm({ email }: Props) {
 const [state, formAction] = useFormState(updateUser, null)
 const { pending } = useFormStatus()
 // const [visible, setVisible] = useState(false)

 return (
  <>
   <b className='block mt-8'>Edit delivery info</b>

   <form
    action={formAction}
    className='mt-4 max-w-sm'
   >
    <input type="hidden" name="email" value={email} />

    <input
     type="text"
     name="info"
     placeholder="Name, address"
     required
     className='w-full pr-10 py-2 bg-transparent border-b-black border outline-none'
    />
    <small className='font-bold text-red-500'>{state?.message}</small>

    <button
     type='submit'
     disabled={pending}
     className="mt-4 w-fit bg-orange-600 disabled:bg-gray-400 text-white flex items-center justify-center px-4 py-1.5 rounded-md"
    >
     Update
    </button >
   </form>
  </>
 )
}