import React from 'react'
import Image from "next/image";
import { EmblaOptionsType } from 'embla-carousel'
import Carousel from './carousel';


const OPTIONS: EmblaOptionsType = { loop: true }

export default function Promo() {
 return (
  <div className='wrapper mt-4 flex flex-col md:flex-row gap-3'>
   <Carousel options={OPTIONS} />

   <div className='md:w-1/2 rounded'>
    <Image
     src={"/2.png"}
     alt={"Img"}
     width={408}
     height={100}
     className="w-full h-full rounded"
     priority
     quality={100}
    />
   </div>
  </div>
 )
}