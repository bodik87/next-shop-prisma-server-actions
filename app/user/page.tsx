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
  <section>
   <div className="wrapper pb-5">
    <h2>User {data.title}</h2>
   </div>
  </section>
 )
}