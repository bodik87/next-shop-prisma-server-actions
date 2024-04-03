import { createLocalOrder } from '@/app/_actions/localOrder';
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import SubmitButton from './SubmitButton';

type Props = {
 isAvailable: boolean
 userEmail: string
 productId: number
 info: string | undefined
 quantity: number
 price: number
}

export default async function Form({
 isAvailable,
 userEmail,
 productId,
 info,
 quantity,
 price,
}: Props) {
 async function action() {
  const product = { id: uuidv4(), productId, quantity, price }
  try {
   if (userEmail) {
    await createLocalOrder(userEmail, product, info)
   } else {
    await createLocalOrder("unregisteredUser@mail.com", product, undefined)
   }
  } catch (error) {
   console.log(error)
  }
 }
 return (
  <form action={action}>
   <SubmitButton isAvailable={isAvailable} />
  </form>
 )
}