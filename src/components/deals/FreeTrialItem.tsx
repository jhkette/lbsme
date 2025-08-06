"use client";
import { useState } from "react";
import slugify from "slugify";
import Image from "next/image";
import Link from "next/link";

type Deal = {
  // Add other properties as needed based on your deal structure
  [key: string]: any;
};

export default function FreeTrialItem({ deal }: Deal) {
  const [imgSrc, setImgSrc] = useState(deal.icon);
  const [error, setError] = useState(false);
  console.log(deal);
  let id;
  if (deal.name) {
    id = slugify(deal.name, { lower: true });
  } else {
    id = slugify(deal.dealName, { lower: true });
  }

  return (
    <>
      {deal.name ? (
        <Link href={`/dashboard/marketplace/freetrials/${id}`}   className="hover:scale-105 transition-transform duration-300 hover: opacity-90 ease-in-out">
          <div className=" shadow-lg border-1 border-lbgray relative bg-[url(/images/deals/dealbg.png)] min-w-[275px] min-h-[185px] max-w-[275px] max-h-[185px] bg-center bg-no-repeat bg-cover my-4 mx-4 py-8">
            <p className="text-center p-4 text-lg text-lbtext font-bold max-w-[180]">
              {deal.name}
            </p>

            <Image
              src={
                deal.__typename === "GetFreeTrialsResult"
                  ? "/images/deals/Tag.svg"
                  : imgSrc
              }
              alt={deal.name || ""}
              width={60}
              height={60}
              style={{ height: "auto" }} 
              className="rounded absolute right-2 bottom-4" 
              onError={() => setError(true)}
            />
          </div>
        </Link>
      ) : null}
    </>
  );
}
