"use client"

import { changeQuantityByInputInLocalOrder, incrementLocalOrder } from '@/app/_actions/cart'
import React, { ChangeEvent, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

type Props = { quantity: number }

export default function QuantityInput({ quantity }: Props) {
 const [state, formAction] = useFormState(changeQuantityByInputInLocalOrder, null)
 const { pending } = useFormStatus()
 const [value, setValue] = useState<number | string>(quantity)

 const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value.replace(/[^1-9]/g, '')
  if (value === '') {
   setValue(1);
  } else {
   setValue(value)
  }
 };

 return (
  <input
   type='number'
   value={value}
   min={1}
   step={1}
   onPaste={(e) => {
    e.preventDefault()
    return false
   }}
   onChange={handleChange}
   className='w-full text-center font-bold border-x-2 flex items-center justify-center' />
 )
}