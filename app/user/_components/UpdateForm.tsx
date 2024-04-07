"use client"

import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { updateUser } from '../../_actions/user'
import SubmitButton from './SubmitButton'

type Props = { email: string, info?: string }

export default function UpdateForm({ email, info }: Props) {
  const [state, formAction] = useFormState(updateUser, null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
  }, [info])

  return (
    <>
      <button
        onClick={() => setVisible(!visible)}
        className='info'>
        {visible ? "Close" : "Edit delivery info"}
      </button>

      {visible &&
        <form
          action={formAction}
          className='mt-4 max-w-xs'
        >
          <input type="hidden" name="email" value={email} />

          <textarea
            name="info"
            placeholder="Name, phone, address"
            defaultValue={info}
            required
            className='w-full pr-10 pb-2 bg-transparent outline-none'
          />
          <small className='font-bold text-red-500'>{state?.message}</small>

          <SubmitButton color='submit' label='Update' />
        </form>}
    </>
  )
}