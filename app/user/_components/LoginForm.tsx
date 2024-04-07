"use client"

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { enter } from '../../_actions/user'
import SubmitButton from './SubmitButton'

type Props = {}

export default function LoginForm({ }: Props) {
 const [state, formAction] = useFormState(enter, null)

 return (
  <form
   action={formAction}
   className='max-w-sm mx-auto space-y-3'
  >
   <input
    type="email"
    name="email"
    placeholder="Email"
    required
    className='w-full pl-4 pr-10 py-4 rounded border outline-none'
   />
   <input
    type="password"
    name="password"
    placeholder="Password"
    required
    className='w-full pl-4 pr-10 py-4 rounded border outline-none'
   />
   <small className='font-bold text-red-500'>{state?.message}</small>

   <SubmitButton color='submit' label='Enter' />
  </form>
 )
}