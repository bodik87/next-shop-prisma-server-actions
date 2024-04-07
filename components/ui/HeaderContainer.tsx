"use client";

import React, { useState } from 'react'
import { useMotionValueEvent, useScroll } from "framer-motion";

type Props = { children: React.ReactNode }

export default function HeaderContainer({ children }: Props) {
 const { scrollY }: any = useScroll();

 const [scrollUp, setScrollUp] = useState(true);
 const [show, setShow] = useState(false);

 useMotionValueEvent(scrollY, "change", (latest: any) => {
  const previousScrollY = scrollY.getPrevious();
  if (latest > previousScrollY && scrollY.current > 50) {
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
  <header className={`sticky top-0 ${show && !scrollUp && "-translate-y-[110%]"} ${show && "shadow-xl"} bg-gray-200 transition-all duration-300 z-20`}>
   {children}
  </header>
 )
}