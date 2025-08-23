"use client";
import React, {useEffect, useState} from "react";

import Image from "next/image";
import { useGetAllDealsQuery } from "@/graphql/getAllDeals.generated";
import DealCategory from "@/components/deals/DealCategory";
import FreeTrialItem from "@/components/deals/FreeTrialItem";
import {SuspenseDeals} from "@/components/suspense/SuspenseComponents";
import { useApolloClient } from "@apollo/client";
import { fetchAllTrials } from "@/lib/freeTrialsQuery"; 

// import Broadband from "/images/deal-icons/broadband.svg";
// import CarInsurance from "@/images/deal-icons/car-insurance.svg";
// import Energy from "@images/deal-icons/energy.svg";
// import HomeInsurance from "@/images/deal-icons/home-insurance.svg";
// import Mobile from "@/images/deal-icons/mobile.svg";
// import PetInsurance from "@/images/deal-icons/pet-insurance.svg";
// import TravelInsurance from "@/images/deal-icons/travel-insurance.svg";
// import { FixedDeals } from "@/interfaces/FixedDeals";
import {
  FD_LINK_BROADBAND,
  FD_LINK_MOBILE,
  FD_LINK_CAR_INS,
  FD_LINK_HOME_INS,
  FD_LINK_ENERGY,
  FD_LINK_PET_INS,
  FD_LINK_TRAVEL_INS,
} from "@/lib/consts";


type Deal = {
  // Add other properties as needed based on your deal structure
  [key: string]: any;
};
<div className="w-full bg-lbgray rounded-t-lg p-2"></div>;

export default function Page() {
  
  // stops odd scroll behavior on page change
  // this is a workaround for the issue where the page scrolls to the bottom on initial load
  // it locks the scroll position to the top of the page
  useEffect(() => {
  window.scrollTo(0, 0); // Lock to top
}, []);
  const client = useApolloClient();
    const [freeTrials, setFreeTrials] = useState<Deal[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      let isMounted = true;
  
      async function loadTrials() {
        try {
          const trials = await fetchAllTrials(client);
          if (isMounted) {
            setFreeTrials(trials);
          }
        } catch (err) {
          if (isMounted) {
            setError(err as Error);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
  
      loadTrials();
  
      return () => {
        isMounted = false;
      };
    }, [client]);



 
  const {
    loading: dealLoading,
    error: dealError,
    data: dealData,
  } = useGetAllDealsQuery({
    errorPolicy: "all",

    fetchPolicy: "cache-and-network",
  });



//  const FIXED_DEALS = [
//   { name: FixedDeals.Broadband, uri: FD_LINK_BROADBAND, icon: Broadband },
//   { name: FixedDeals.CarInsurance, uri: FD_LINK_CAR_INS, icon: CarInsurance },
//   { name: FixedDeals.Energy, uri: FD_LINK_ENERGY, icon: Energy },
//   { name: FixedDeals.HomeInsurance, uri: FD_LINK_HOME_INS, icon: HomeInsurance },
//   { name: FixedDeals.Mobile, uri: FD_LINK_MOBILE, icon: Mobile },
//   { name: FixedDeals.PetInsurance, uri: FD_LINK_PET_INS, icon: PetInsurance },
//   { name: FixedDeals.TravelInsurance, uri: FD_LINK_TRAVEL_INS, icon: TravelInsurance },
// ];



  const finalDealsData = dealData?.getAllDeals.map((deal) => {
    return deal.category;
  });

  return (
    <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Marketplace</h1>
      <Image
        src="/images/main/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-6 z-0 right-40"
      />
     {loading ? (<SuspenseDeals />) : (
      <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-4">
        <div className="w-full bg-lbgray rounded-t-lg p-4">
          <h2 className="text-2xl font-semibold text-lbtext">Free Trials</h2>
        </div>
        <div className="overflow-x-auto flex flex-row py-4 px-12 rounded-b-lg  bg-white justify-start items-center w-full flex-wrap h-[455px] scrollbar-nice "> 
        
          {freeTrials?.map((deal: Deal) => {
            return <FreeTrialItem key={deal.name} deal={deal} />;
          })}
        </div>
      </section>
        )}
   {dealLoading ? (<SuspenseDeals />) : (
      <section className=" flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
        <div className="w-full bg-lbgray rounded-t-lg p-4">
          <h1 className="text-2xl font-semibold text-lbtext">Best Deals</h1>
        </div>
        <div className="overflow-x-auto flex flex-row py-4 px-12 rounded-b-lg  bg-white justify-start items-center w-full flex-wrap h-[455px] scollbar-nice ">
          {finalDealsData?.map((category: string) => {
            return <DealCategory key={category} category={category} />;
          })}
        </div>
      </section>
   )}
    
    </div>
  );
}
