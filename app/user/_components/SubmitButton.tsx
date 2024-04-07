import React from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'

type Props = {
 label: string,
 color: "submit" | "logout"
}

export default function SubmitButton({ label, color }: Props) {
 const { pending } = useFormStatus()
 return (
  <button
   type="submit"
   disabled={pending}
   className={cn("w-full px-5 py-4 rounded disabled:opacity-80",
    color === 'submit' && "bg-green-600 text-white",
    color === 'logout' && "border border-red-600 text-red-600"
   )}>
   {label}
  </button>
 )
}