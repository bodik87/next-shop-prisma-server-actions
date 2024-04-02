"use client"

import { addOrderToDatabase } from '@/app/_actions/orders'
import { LocalOrderProps } from '@/lib/schema'
import { cn } from '@/lib/utils'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

type Props = {
  order: LocalOrderProps
}

export default function AddToDatabase({ order }: Props) {
  const [state, formAction] = useFormState(addOrderToDatabase, null)
  const { pending } = useFormStatus()

  async function action() {
    try {
      formAction(order)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form action={action}>

      <button
        disabled={pending}
        type='submit'
        className={cn("w-full bg-black disabled:bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded-lg",
          true && "mt-4")}
      >
        Buy
      </button>
    </form>
  )
}