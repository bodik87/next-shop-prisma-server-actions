import React from 'react'
import { getSession, getUserByEmail } from '../_actions/user';
import { SessionProps } from '@/lib/schema';
import LoginForm from './_components/LoginForm';
import UpdateForm from './_components/UpdateForm';
import Orders from './_components/Orders';
import LogoutForm from './_components/LogoutForm';

export default async function User() {
 const session: SessionProps = await getSession();

 const { item }: any = await getUserByEmail(session?.email)

 return (
  <>
   <div className="wrapper">
    <h2>User</h2>

    {!session && <LoginForm />}

    {session &&
     <>
      <b className='block mt-4'>Email</b>
      <p>{session.email}</p>

      {session.info && (
       <>
        <b className='block mt-4'>Info</b>
        <p>{session.info}</p>
       </>
      )}

      <UpdateForm email={session.email} info={session.info} />
     </>
    }

    {item?.orders.length > 0 && <Orders orders={item?.orders} />}

    {session &&
     <LogoutForm />
    }
   </div>
  </ >
 )
}