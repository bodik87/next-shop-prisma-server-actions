import React from 'react'
import { addOrderToDatabase } from '@/app/_actions/orders'
import { LocalOrderProps } from '@/lib/schema'
import SubmitButton from './SubmitButton'

type Props = { order: LocalOrderProps }

export default function AddToDatabase({ order }: Props) {
  async function action() {
    "use server"
    try {
      await addOrderToDatabase(order)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form action={action}>
      <SubmitButton />
    </form>
  )
}