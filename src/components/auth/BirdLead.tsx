import React from 'react'
import Image from 'next/image';
export default function BirdLead() {
  return (
    <div className="flex flex-col  bg-lbblue items-center justify-center h-screen w-1/2 pt-28">
         
         

          <div className="text-center">
            <Image
              src="/images/home/Bird.svg"
              alt="Bird"
              width={410}
              height={410}
              className="mx-12 w-[275px] md:w-[310px] h-auto object-contain"
            />
          </div>
           <h1 className="text-4xl/12 font-bold text-lbtext mb-4 px-12  text-center w-[85%] ">
            Subscriptions managed, Money Saved, Life Simplified
          </h1>

            <h2 className="text-xl/8 font-bold text-lbtextgrey opacity-90 mb-4 px-12  text-center w-[70%]"> 
          View, Analyse, Switch or Cancel all your business  subscriptions  in one place saving 
            you time and money</h2>
         
        </div>
  )
}
