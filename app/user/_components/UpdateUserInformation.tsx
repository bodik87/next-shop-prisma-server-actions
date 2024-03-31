"use client"

import React, { useState } from 'react'
import UpdateForm from './UpdateForm'
import { cn } from '@/lib/utils'

type Props = { email: string }

export default function UpdateUserInformation({ email }: Props) {
  const [active, setActive] = useState(false)

  return (
    <div>
      {active && <UpdateForm email={email} />}

      <button
        type="button"
        className={cn("mt-2 px-4 py-1.5 rounded-md  text-white",
          active ? "bg-black" : "bg-orange-600")}
        onClick={() => setActive(!active)}
      >
        {active ? "Close" : "Update user information"}
      </button>
    </div>
  )
}