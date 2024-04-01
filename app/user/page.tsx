import React from 'react'
import { redirect } from "next/navigation";
import LoginForm from './_components/LoginForm';
import UpdateForm from './_components/UpdateForm';
import { getLocalOrder } from '../[category]/[product]/_actions/localOrder';
import { getSession, logout } from './_actions/user';
import { LocalOrderProps, SessionProps } from '@/lib/schema';

export default async function User() {
 const session: SessionProps = await getSession();
 const localOrder: LocalOrderProps = await getLocalOrder();

 return (
  <section>
   <div className="wrapper pb-5">
    <h2>User</h2>

    {!session && <LoginForm />}

    {session &&
     <>
      <b className='block mt-4'>Email</b>
      <p>{session.email}</p>

      {session.info ? (
       <>
        <b className='block mt-4'>Info</b>
        <p>{session.info}</p>

        <UpdateForm email={session.email} />
       </>
      ) : <UpdateForm email={session.email} />}

      <form
       action={async () => {
        "use server";
        await logout();
        redirect("/");
       }}
       className='mt-8'
      >
       <button type="submit" className="mt-2 px-4 py-1.5 rounded-md bg-red-600 text-white">Logout</button>
      </form>
     </>
    }

    <pre className="mt-2">{JSON.stringify(session, null, 2)}</pre>
    <pre className="mt-2">{JSON.stringify(localOrder, null, 2)}</pre>
   </div>
  </section >
 )
}