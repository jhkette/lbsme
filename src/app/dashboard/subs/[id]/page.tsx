import SubscriptionDetail from "@/components/subscriptionDetailPage/SubscriptionDetail";
import React from "react";
import Image from "next/image";

interface Params {
  id: string;
}

export default async function page({ params }: { params: Promise<Params> }) {
  const finalParams = await params;

  const idToFetch = decodeURIComponent(finalParams?.id);

  return (
    <div className=" px-16 w-full mt-12 relative">
      <Image
        src="/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-2 z-0 right-40 "
      />

      <SubscriptionDetail idToFetch={idToFetch} />
    </div>
  );
}
