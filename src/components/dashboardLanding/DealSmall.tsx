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
    <Link href={props.deal.link}>
      <div className="bg-[url(/images/deals/dealbg.png)] shadow-lg border-1 border-lbgray w-full max-w-[250px] h-[150px]  md:h-[160px] bg-center bg-no-repeat bg-cover rounded-lg my-4 py-6 md:py-8 hover:opacity-75">
        <p className="text-center text-2xl text-lbtext font-bold">
          {props.deal.name}
        </p>

        {props.deal.description}
      </div>
    </Link>
  );
}
