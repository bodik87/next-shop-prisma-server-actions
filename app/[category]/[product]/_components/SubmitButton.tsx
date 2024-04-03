"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'

type Props = { isAvailable: boolean }

export default function SubmitButton({ isAvailable }: Props) {
  const { pending } = useFormStatus()
  return (
    <button
      type='submit'
      disabled={pending || !isAvailable}
      className={cn("w-full bg-green-600 disabled:bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded-lg",
        isAvailable && "mt-4")}
    >
      {pending ? "Loading..." : "Add to cart"}
    </button>
  )
}