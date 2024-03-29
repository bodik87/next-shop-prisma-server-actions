"use client"

import { Disclosure } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import React from 'react'

type Props = {
 description: string
}

export default function Description({ description }: Props) {
 return (
  <Disclosure>
   {({ open }) => (
    <>
     <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left font-medium hover:bg-gray-200 focus:outline-none">
      <span>Description</span>
      <ChevronDown className={`${open && "rotate-180"}`} />
     </Disclosure.Button>

     <Disclosure.Panel className="mt-2">
      {description}
     </Disclosure.Panel>
    </>
   )}
  </Disclosure>
 )
}