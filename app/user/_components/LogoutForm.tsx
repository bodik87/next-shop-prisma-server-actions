"use client"

import React from 'react'
import { useFormStatus } from 'react-dom';
import { redirect } from 'next/navigation';
import { logout } from '@/app/_actions/user';

export default function LogoutForm() {
 return (
  <form
   action={async () => {
    await logout();
    redirect("/");
   }}
   className='mt-8'
  >
   <SubmitButton />
  </form>
 )
}

function SubmitButton() {
 const { pending } = useFormStatus()

 return (
  <button
   type='submit'
   disabled={pending}
   className="mt-2 px-4 py-1.5 rounded bg-red-600 disabled:bg-red-400 text-white"
  >
   Logout
  </button>
 )
}