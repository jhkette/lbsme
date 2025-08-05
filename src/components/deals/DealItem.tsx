"use client"
import {useState}from "react";
import slugify from 'slugify';
import Image from "next/image";
import Link from "next/link";

type Deal = {

  // Add other properties as needed based on your deal structure
  [key: string]: any;
};

export default function DealItem({ deal }: Deal) {
   const [imgSrc, setImgSrc] = useState(deal.icon);
  const [error, setError] = useState(false);

  let id;
   if(deal.name){
   id = slugify(deal.name, { lower: true }); 
   }else{
      id = slugify(deal.dealName, { lower: true }); 
   }

  return (
    <>
      {deal.name ? (
         <Link href={`/dashboard/marketplace/freetrials/${id}`} className="shadow-lg border-1 border-lbgray">
        <div className=" relative bg-[url(/images/deals/dealbg.png)] min-w-[275px] min-h-[185px] max-w-[275px] max-h-[185px] bg-center bg-no-repeat bg-cover my-4 mx-4 py-8">
         
            <p className="text-center p-4 text-lg text-lbtext font-bold max-w-[180]">
              {deal.name}
            </p>
            {/* <p className="text-lg text-gray-500 font-semibold text-center">
              {deal.dea}
            </p> */}
            <Image
              src={deal.__typename === "GetFreeTrialsResult" ? "/images/deals/Tag.svg" : imgSrc}
              alt={deal.name || ""}
              width={60}
              height={60} 
              style={{ height: "auto" }} // Maintain proportions
              className="rounded absolute right-2 bottom-4" // Optional styling
              onError={() => setError(true)}
            />
         
        </div>
         </Link>
      ) : null}
    </>
  );
}
