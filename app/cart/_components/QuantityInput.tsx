"use client"

import { changeQuantityByInputInLocalOrder, incrementLocalOrder } from '@/app/_actions/cart'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

type Props = { quantity: number, id: string }

export default function QuantityInput({ quantity, id }: Props) {
  const [state, formAction] = useFormState(changeQuantityByInputInLocalOrder, null)
  const { pending } = useFormStatus()
  const [value, setValue] = useState<number | string>(quantity)
  const [error, setError] = useState<null | string>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === '') {
      setValue(1);
    } else {
      setValue(value)
    }
  };

  useEffect(() => {
    setValue(quantity)
  }, [quantity])


  return (
    <>
      <input type="hidden" name="id" value={id} readOnly />
      <input
        type='number'
        value={value}
        min={1}
        step={1}
        onPaste={(e) => {
          e.preventDefault()
          return false
        }}
        // onBlur={() => {
        //   if (value === null || value === 0) {
        //     setError("Min 1")
        //     setValue(1)
        //   }
        //   if (Number(value) > 100) {
        //     setError("Max 100")
        //     setValue(100)
        //   }
        // }}
        onChange={handleChange}
        className='w-full text-center font-bold border-x-2 flex items-center justify-center' />
      <p className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold mt-2 text-center text-red-600'>{error}</p>
    </>
  )
}