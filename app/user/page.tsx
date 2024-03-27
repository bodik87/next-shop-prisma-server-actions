import React from 'react'

type PageSearchParams = {
 data: string
}

type Props = {
 searchParams: PageSearchParams
}

export default function User({ searchParams }: Props) {
 const data = JSON.parse(searchParams.data)
 return (
  <section className='bg-yellow-100'>
   <div className="wrapper">
    User {data.title}
   </div>
  </section>
 )
}