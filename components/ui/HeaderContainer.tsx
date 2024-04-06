"use client";

import React, { useState } from 'react'
import { useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from 'next/navigation';

type Props = { children: React.ReactNode }

export default function HeaderContainer({ children }: Props) {
 const pathname = usePathname()
 const { scrollY }: any = useScroll();

 const [scrollUp, setScrollUp] = useState(true);
 const [show, setShow] = useState(false);

 useMotionValueEvent(scrollY, "change", (latest: any) => {
  const previousScrollY = scrollY.getPrevious();
  if (latest > previousScrollY && scrollY.current > 150) {
   setScrollUp(false);
  } else {
   setScrollUp(true);
  }

  if (scrollY.current > 32) {
   setShow(true);
  } else {
   setShow(false);
  }
 });

 return (
  <>
   {/* {pathname === "/" && <section className="bg-red-500 h-10 flex items-center text-white">
    <div className='text-center w-full'>
     Promo
    </div>
   </section>} */}

   <header className={`sticky top-0 ${show && !scrollUp && "-translate-y-[110%]"} ${show && "shadow-md"} bg-gray-200 transition-all duration-300 z-20`}>
    <div className='wrapper pb-4'>
     {children}
    </div>
   </header>
  </>
 )
}