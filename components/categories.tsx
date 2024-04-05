"use client"

import { CATEGORIES } from '@/data'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { ChevronDown, LayoutList } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

export default function Categories() {
 const pathname = usePathname()
 let [isOpen, setIsOpen] = useState(false)

 function closeModal() {
  setIsOpen(false)
 }

 function openModal() {
  setIsOpen(true)
 }

 useEffect(() => {
  closeModal()
 }, [pathname])

 return (
  <>
   <button
    type="button"
    onClick={openModal}
    className="inline-flex gap-2 w-fit justify-center rounded-md bg-black px-3 py-2 font-medium text-white hover:bg-black/80 focus:outline-none"
   >
    <LayoutList />
    Categories
   </button>

   <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="fixed inset-0 wrapper z-10" onClose={closeModal}>
     <div className="relative max-w-xs mr-auto">
      <Transition.Child
       as={Fragment}
       enter="ease-out duration-300"
       enterFrom="opacity-0"
       enterTo="opacity-100"
       leave="ease-in duration-200"
       leaveFrom="opacity-100"
       leaveTo="opacity-0"
      >
       <div className="fixed inset-0 bg-black/20" />
      </Transition.Child>

      <div className="flex min-h-full items-center justify-center p-4 text-center">
       <Transition.Child
        as={Fragment}
        enter="ease-out duration-100"
        enterFrom="opacity-0 scale-95 -translate-y-2"
        enterTo="opacity-100 scale-100 translate-y-0"
        leave="ease-in duration-100"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 -translate-y-2"
       >
        <Dialog.Panel className="absolute top-28 left-0 w-full transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">

         <Link
          href={{
           pathname: CATEGORIES[0].slug,
           query: { id: CATEGORIES[0].id }
          }}
          className="flex w-full items-center p-4 whitespace-nowrap hover:bg-gray-50">
          {CATEGORIES[0].title}
         </Link>

         <Disclosure>
          {({ open }) => (
           <>
            <Disclosure.Button className="flex gap-2 w-full bg-gray-100 border-y p-4 text-left font-medium focus:outline-none">
             <LayoutList />
             <span>SubCat</span>
             <ChevronDown className={`ml-auto ${open && "rotate-180"}`} />
            </Disclosure.Button>
            <Disclosure.Panel>
             <Link
              href={{
               pathname: CATEGORIES[1].slug,
               query: { id: CATEGORIES[1].id }
              }}
              className="flex w-full items-center p-4 pl-8 whitespace-nowrap border-b hover:bg-gray-50">
              {CATEGORIES[1].title}
             </Link>
            </Disclosure.Panel>
           </>
          )}
         </Disclosure>

         <Link
          href={{
           pathname: CATEGORIES[2].slug,
           query: { id: CATEGORIES[2].id }
          }}
          className="flex w-full items-center p-4 hover:bg-gray-50">
          {CATEGORIES[2].title}
         </Link>

        </Dialog.Panel>
       </Transition.Child>
      </div>
     </div>
    </Dialog >
   </Transition >
  </>
 )
}
