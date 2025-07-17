
import React from "react";

import Link from "next/link";
import { ArrowLeft} from "lucide-react";
import FreeTrialsDetail from "@/components/deals/FreeTrialsDetail";
import "@/styles/dealsslug.css";
import { Params } from "next/dist/server/request/params";
import CategrorySpecificDeals from "@/components/deals/CategorySpecificDeals";

export default async function page({
  params,
}: {
  params: Promise<Params>;
}) {
  const finalParams = await params;

  console.log(finalParams)


  // if (!dealItem) {
  //   return <h1 className="text-xl text-lbtext">Offer not found</h1>;
  // }
 

  
  return (
    <section className="px-16 w-full flex flex-col mt-12 relative">
      <Link
        href="/dashboard/marketplace"
        className="flex flex-row items-center hover-bg-blue-200 rounded-md w-fit px-4 py-2 hover:bg-blue-100"
      >
        <ArrowLeft size={18} color="#29235C" />{" "}
        <p className="text-lg pl-2 text-lbtext">Go back to best offers</p>
      </Link>
      
      <CategrorySpecificDeals category={finalParams.category as string}/>
      {/* <FreeTrialsDetail freeItem={finalParams.slug as string} /> */}
     
    </section>
  );
}
