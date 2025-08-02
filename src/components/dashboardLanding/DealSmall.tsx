import React from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface SmallDealItem {
  deal: {
    name: string;
    description: React.ReactNode;
    link: string
  };
}

export default function SmallDealItem(props: SmallDealItem) {
  return (
    <div className="bg-[url(/images/deals/dealbg.png)] w-[190px] h-[140px] md:w-[225px] md:h-[145px] lg:w-[250px] lg:h-[160px] bg-center bg-no-repeat bg-cover rounded-lg my-4 lg:m-4 py-6 md:py-12 md:py-8 hover:opacity-75">
      <Link href={props.deal.link}>
        <p className="text-center text-2xl text-lbtext font-bold">
          {props.deal.name}
        </p>
        
          {props.deal.description}
         
        
       
      </Link>
    </div>
  );
}
