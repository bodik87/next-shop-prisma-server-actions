"use client"

import { Disclosure } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import React from 'react'

type Props = {
 description: string
}

export default function Description({ description }: Props) {
 return (
  <Disclosure defaultOpen>
   {({ open }) => (
    <>
     <Disclosure.Button className="flex w-full justify-between rounded-lg pt-4 text-left font-medium focus:outline-none group">
      <b>Description</b>
      <ChevronDown className={`${open && "rotate-180"} group-hover:stroke-green-600`} />
     </Disclosure.Button>

     <Disclosure.Panel className="mt-2">
      {description}
     </Disclosure.Panel>
    </>
   )}
  </Disclosure>
 )
}