import React from 'react'
import { redirect } from "next/navigation";
import { getSession, logout } from "@/lib/auth";
import LoginForm from './_components/LoginForm';
import UpdateForm from './_components/UpdateForm';
import UpdateUserInformation from './_components/UpdateUserInformation';
import { getLocalOrder } from '../_actions/localOrder';

export const DEFAULT_USER = {
 id: "0000",
 email: "unregistered@mail.com",
 password: "unregistered"
}

export type SessionProps = {
 email: string,
 name?: string,
 address?: string,
 expires: string,
 iat: Date,
 exp: Date
}

export default async function User() {
 const session: SessionProps = await getSession();
 const order: any = await getLocalOrder();

 console.log(order);


 return (
  <section>
   <div className="wrapper pb-5">
    <h2>User</h2>

    {!session && <LoginForm />}

    {session &&
     <>
      <b className='block mt-4'>Email</b>
      <p>{session.email}</p>

      {session.name ? (
       <>
        <b className='block mt-4'>Name</b>
        <p>{session.name}</p>

        <b className='block mt-4'>Address</b>
        <p>{session.address}</p>

        <UpdateUserInformation email={session.email} />
       </>
      ) : <UpdateForm email={session.email} />}

      <form
       action={async () => {
        "use server";
        await logout();
        redirect("/");
       }}
       className='mt-7'
      >
       <button type="submit" className="mt-2 px-4 py-1.5 rounded-md bg-red-600 text-white">Logout</button>
      </form>
     </>
    }

    <pre className="mt-2">{JSON.stringify(session, null, 2)}</pre>
    <pre className="mt-2">{JSON.stringify(order, null, 2)}</pre>
   </div>
  </section >
 )
}