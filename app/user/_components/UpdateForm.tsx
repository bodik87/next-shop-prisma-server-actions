"use client"

import React, { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { updateUser } from '../../_actions/user'

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
        className='mt-2 w-fit disabled:bg-gray-400 border border-black flex items-center justify-center px-3 py-1.5 rounded text-sm'>
        {visible ? "Close" : "Edit delivery info"}
      </button>

      {visible &&
        <form
          action={formAction}
          className='mt-4 max-w-sm'
        >
          <input type="hidden" name="email" value={email} />

          <input
            type="text"
            name="info"
            placeholder="Name, phone, address"
            defaultValue={info}
            required
            className='w-full pr-10 py-2 bg-transparent border-b-black border outline-none'
          />
          <small className='font-bold text-red-500'>{state?.message}</small>

          <SubmitButton />
        </form>}
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      disabled={pending}
      className="mt-4 w-fit bg-orange-600 disabled:bg-orange-400 text-white flex items-center justify-center px-4 py-1.5 rounded"
    >
      Update
    </button>
  )
}