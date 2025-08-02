import SubscriptionDetail from "@/components/subscriptionDetailPage/SubscriptionDetail";
import React from "react";


interface Params {
  id: string;
}

export default async function page({ params }: { params: Promise<Params> }) {
  const finalParams = await params;

  const idToFetch = decodeURIComponent(finalParams?.id);

  return (
    <div className=" px-16 w-full mt-12 relative">
    
    

      <SubscriptionDetail idToFetch={idToFetch} />
    </div>
  );
}
