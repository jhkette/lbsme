import React from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface SmallDealItem {
  deal: {
    name: string;
    icon: string;
  };
}

export default function SmallDealItem(props: SmallDealItem) {
  return (
    <div className="bg-[url(/images/deals/dealbg.png)] w-[250px] h-[160px] bg-center bg-no-repeat bg-cover my-4 mx-4 py-8 hover:opacity-75">
      <Link href={`/dashboard/marketplace/`}>
        <p className="text-center text-2xl text-lbtext font-bold">
          {props.deal.name}
        </p>

        <Image
          src={props.deal.icon}
          alt={props.deal.name || ""}
          width={45}
          height={45}
          style={{ height: "auto" }}
          className="rounded ml-auto mt-2 mr-2"
        />
      </Link>
    </div>
  );
}
