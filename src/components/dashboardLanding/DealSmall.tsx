import React from "react";


import Link from "next/link";

interface SmallDealItem {
  deal: {
    name: string;
    description: React.ReactNode;
    link: string;
  };
}

export default function SmallDealItem(props: SmallDealItem) {
  return (
    <Link href={props.deal.link}   className="hover:scale-105 transition-transform duration-300 hover: opacity-90 ease-in-out">
      <div className="bg-[url(/images/deals/dealbgsmall.png)] md:bg-[url(/images/deals/dealbg.png)] shadow-lg border-1 border-lbgray w-full mx-auto max-w-[218px] h-[140px]  md:h-[150px] md:max-w-[245px]  lg:h-[167px] lg:max-w-[260px] bg-center bg-no-repeat bg-cover rounded-lg my-2 py-6 md:py-8 ">
        <p className="text-center text-2xl text-lbtext font-bold">
          {props.deal.name}
        </p>

        {props.deal.description}
      </div>
    </Link>
  );
}
