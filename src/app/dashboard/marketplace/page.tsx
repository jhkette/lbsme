import React from "react";
import Image from "next/image";
export default function Marketplace() {
  return (
    <div className="px-12 w-full my-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Marketplace</h1>
      <Image
        src="/lbgraphic.png"
        height={300}
        width={500}
        alt="graphic"
        className="absolute -top-3 z-0 right-40"
      />
      <div className="flex flex-col justify-between items-end w-full bg-gray-200 pt-12 mt-22 rounded-lg shadow-lg mb-8">
      <div className="flex flex-row justify-between items-end w-full ">
        <div className="flex flex-col text-lbtext justify-center shadow-lg bg-white rounded-lg mx-4 w-1/3 h-36 z-2"></div>
        <div className="flex flex-col text-lbtext justify-center shadow-lg bg-white rounded-lg mx-4 w-1/3 h-36 z-2"></div>
        <div className="flex flex-col text-lbtext justify-center shadow-lg bg-white rounded-lg mx-4 w-1/3 h-36 z-2"></div>
      </div>
      </div>
    </div>
  );
}
