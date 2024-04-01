"use client"

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { enter } from '../_actions/user'

type Props = {}

export default function LoginForm({ }: Props) {
 const [state, formAction] = useFormState(enter, null)
 const { pending } = useFormStatus()

 return (
  <form
   action={formAction}
   className='mt-4 max-w-sm mx-auto space-y-3'
  >
   <input
    type="email"
    name="email"
    placeholder="Email"
    required
    className='w-full pl-4 pr-10 py-4 rounded-xl border outline-none'
   />
   <input
    type="password"
    name="password"
    placeholder="Password"
    required
    className='w-full pl-4 pr-10 py-4 rounded-xl border outline-none'
   />
   <small className='font-bold text-red-500'>{state?.message}</small>

   <button
    type='submit'
    className="w-full bg-green-600 disabled:bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded-lg"
    disabled={pending}
   >
    Enter
   </button >
  </form>
 )
}