"use client"

import React from 'react'
import { redirect } from 'next/navigation';
import { logout } from '@/app/_actions/user';
import SubmitButton from './SubmitButton';

export default function LogoutForm() {
 return (
  <form
   action={async () => {
    await logout();
    redirect("/");
   }}
   className='mt-8 max-w-xs'
  >
   <SubmitButton color='logout' label='Logout' />
  </form>
 )
}