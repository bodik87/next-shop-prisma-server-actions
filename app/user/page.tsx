import React from 'react'
import { redirect } from "next/navigation";
import LoginForm from './_components/LoginForm';
import UpdateForm from './_components/UpdateForm';
import { getLocalOrder } from '../_actions/localOrder';
import { getSession, getUserById, logout } from '../_actions/user';
import { LocalOrderProps, SessionProps } from '@/lib/schema';
import Orders from './_components/Orders';

export default async function User() {
 const session: SessionProps = await getSession();
 const localOrder: LocalOrderProps = await getLocalOrder();

 const { item }: any = await getUserById("c9e34d0f-075c-4cc7-927d-5e410b7836a5")

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

        <UpdateForm email={session.email} info={session.info} />
       </>
      ) : <UpdateForm email={session.email} info={session.info} />}

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

    {item?.orders && <Orders orders={item?.orders} />}

    <pre className="mt-2 text-sm">{JSON.stringify(session, null, 2)}</pre>
    <pre className="mt-2 text-sm">{JSON.stringify(localOrder, null, 2)}</pre>
   </div>
  </section >
 )
}