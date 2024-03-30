"use client"

import { Menu, Transition, Disclosure } from '@headlessui/react'
import { Fragment, JSX, SVGProps } from 'react'
import { LayoutList, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { CATEGORIES } from '@/data'

export default function CategoriesMenu() {
  return (
    <div className="z-20">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex gap-2 w-full justify-center rounded-md bg-black px-3 py-2 font-medium text-white hover:bg-black/80 focus:outline-none">
            <LayoutList />
            Categories
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-fit min-w-56 origin-top-left rounded-md bg-black text-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden">
            <Menu.Item>
              {({ close, active }) => (
                <Link onClick={close}
                  href={{
                    pathname: CATEGORIES[0].slug,
                    query: { id: CATEGORIES[0].id }
                  }}
                  className={`${active ? 'bg-gray-900' : ''
                    } group flex w-full items-center p-3 whitespace-nowrap`}>
                  {active ? (
                    <DuplicateActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <DuplicateInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  {CATEGORIES[0].title}
                </Link>
              )}
            </Menu.Item>

            <Disclosure defaultOpen>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full bg-green-700 p-3 text-left font-medium hover:bg-green-600 focus:outline-none">
                    <DuplicateActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>SubCat</span>
                    <ChevronDown className={`ml-auto ${open && "rotate-180"}`} />

                  </Disclosure.Button>
                  <Disclosure.Panel className="bg-green-900">
                    <Menu.Item>
                      {({ close, active }) => (
                        <Link onClick={close}
                          href={{
                            pathname: CATEGORIES[1].slug,
                            query: { id: CATEGORIES[1].id }
                          }}
                          className={`${active ? 'bg-green-800' : ''
                            } group flex w-full items-center p-3 whitespace-nowrap`}>
                          {active ? (
                            <DuplicateActiveIcon
                              className="ml-2 mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <DuplicateInactiveIcon
                              className="ml-2 mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                          {CATEGORIES[1].title}
                        </Link>
                      )}
                    </Menu.Item>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Menu.Item>
              {({ close, active }) => (
                <Link onClick={close}
                  href={{
                    pathname: CATEGORIES[2].slug,
                    query: { id: CATEGORIES[2].id }
                  }}
                  className={`${active ? 'bg-gray-900' : ''
                    } group flex w-full items-center p-3`}>
                  {active ? (
                    <DuplicateActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <DuplicateInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  {CATEGORIES[2].title}
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div >
  )
}

function DuplicateInactiveIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#fff"
        strokeWidth="2"
      />
    </svg>
  )
}

function DuplicateActiveIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#fff"
        stroke="#F87171"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#fff"
        stroke="#F87171"
        strokeWidth="2"
      />
    </svg>
  )
}