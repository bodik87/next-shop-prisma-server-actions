"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'

type Props = {}

export default function SubmitButton({ }: Props) {
  const { pending } = useFormStatus()
  return (
    <button
      type='submit'
      disabled={pending}
      className="mt-3 w-full bg-black disabled:bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded"
    >
      {pending ? "Loading..." : "Buy"}
    </button>
  )
}