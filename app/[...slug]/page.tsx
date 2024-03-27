import React from 'react'

type PageSearchParams = {
 id: string
}

type Props = {
 searchParams: PageSearchParams
}

export default function Category({ searchParams }: Props) {
 const search = searchParams.id

 return (
  <section className='bg-green-100'>
   <div className="wrapper">
    Category id: <span>{search}</span>
   </div>
  </section>
 )
}