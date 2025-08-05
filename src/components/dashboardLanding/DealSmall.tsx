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
      <div className="bg-[url(/images/deals/dealbgsmall.png)] md:bg-[url(/images/deals/dealbg.png)] shadow-lg border-1 border-lbgray w-full mx-auto max-w-[230px] h-[145px]  md:h-[147px] md:max-w-[240px]  lg:h-[167px] lg:max-w-[260px] bg-center bg-no-repeat bg-cover rounded-lg my-2 py-6 md:py-8 hover:opacity-75">
        <p className="text-center text-2xl text-lbtext font-bold">
          {props.deal.name}
        </p>

        {props.deal.description}
      </div>
    </Link>
  );
}
