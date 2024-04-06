import React from 'react'
import { redirect } from "next/navigation";
import LoginForm from './_components/LoginForm';
import UpdateForm from './_components/UpdateForm';
import { getSession, getUserByEmail, logout } from '../_actions/user';
import { SessionProps } from '@/lib/schema';
import Orders from './_components/Orders';

export default async function User() {
 const session: SessionProps = await getSession();

 const { item }: any = await getUserByEmail(session?.email)

 return (
  <section>
   <div className="wrapper px-3 pb-5">
    <h2 className='mt-4'>User</h2>

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


     </>
    }

    {item?.orders.length > 0 && <Orders orders={item?.orders} />}

    {session &&
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
    }
   </div>
  </section >
 )
}