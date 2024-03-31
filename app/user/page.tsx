import React from 'react'
import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/auth";

type PageSearchParams = {
 data: string
}

type Props = {
 searchParams: PageSearchParams
}

export default async function User({ searchParams }: Props) {
 const data = JSON.parse(searchParams.data)
 const session = await getSession();
 return (
  <section>
   <div className="wrapper pb-5">
    <h2>User {data.title}</h2>

    <>
     {!session &&
      <form
       action={async (formData) => {
        "use server";
        await login(formData);
        // redirect("/");
       }}
       className='max-w-sm mx-auto'
      >
       <input
        type="text"
        name="login"
        placeholder="Login"
        className='w-full pl-4 pr-10 py-2 rounded-xl border outline-none'
       />

       <button
        type="submit"
        className="mt-4 w-full bg-green-600 disabled:bg-gray-400 text-white font-bold text-lg flex items-center justify-center px-2 py-4 rounded-lg"
       >
        Login
       </button>
      </form>
     }

     {session &&
      <form
       action={async () => {
        "use server";
        await logout();
        redirect("/");
       }}
      >
       <button type="submit" className="mt-2 bg-red-600 text-white">Logout</button>
      </form>
     }

     <pre className="mt-2">{JSON.stringify(session, null, 2)}</pre>
    </>
   </div>


  </section>
 )
}