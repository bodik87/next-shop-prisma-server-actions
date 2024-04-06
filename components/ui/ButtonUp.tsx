
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const isBrowser = () => typeof window !== "undefined";
function scrollToTop() {
 if (!isBrowser()) return;
 window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function ButtonUp() {
 const [show, setShow] = useState(false);
 const { scrollY }: any = useScroll();

 useMotionValueEvent(scrollY, "change", () => {
  if (scrollY.current > 250) {
   setShow(true);
  } else {
   setShow(false);
  }
 });

 return (
  <>
   <AnimatePresence initial={false}>
    {show && (
     <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-9 h-9 fixed bottom-6 right-4 z-40 flex items-center justify-center bg-gray-400 rounded-full"
      onClick={scrollToTop}
     >
      <Arrow />
     </motion.button>
    )}
   </AnimatePresence>
  </>
 );
}

function Arrow() {
 return (
  <svg xmlns="http://www.w3.org/2000/svg" className="-rotate-90" viewBox="0 0 36 36"><path fill="white" d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path></svg>
 );
}
