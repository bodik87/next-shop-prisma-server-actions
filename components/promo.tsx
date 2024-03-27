import React from 'react'
import Image from "next/image";
import { EmblaOptionsType } from 'embla-carousel'
import Carousel from './carousel';

type Props = {}

const OPTIONS: EmblaOptionsType = { loop: true }

export default function Promo({ }: Props) {
 return (
  <div className='flex flex-col md:flex-row gap-3'>
   <Carousel options={OPTIONS} />

   <div className='md:w-1/2 rounded-xl'>
    <Image
     src={"/2.png"}
     alt={"Img"}
     width={408}
     height={300}
     className="w-full rounded-lg"
     priority
     quality={100}
    />
   </div>
  </div>
 )
}