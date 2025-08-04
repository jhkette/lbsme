import React from "react";

import SmallDealItem from "./DealSmall";


interface DealIntro {
  name: string;
  description: React.ReactNode;
  link: string
}

type Props = {
  deals: DealIntro[];
};


const DealsSummary: React.FC<Props> = ({ deals }) => {
 

  return (
    <div className="scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen w-1/2  py-4 rounded-2xl shadow-2xl bg-white border-1 border-gray-300 max-h-120 overflow-y-auto">
      <div className="flex flex-row items-center justify-between mx-8 pb-1 my-4 lg:my-2">
        <h2 className="text-2xl font-semibold">Featured Deals & Free Trials</h2>{" "}
      </div>

   <div className="grid grid-rows-2 grid-cols-[repeat(auto-fit,_minmax(215px,_1fr))] gap-2 justify-center mx-auto px-8">
  {deals?.map((deal) => {
    return <SmallDealItem deal={deal} key={deal.name} />;
  })}
</div>
      
    </div>
  );
}


export default DealsSummary