import React from 'react'

interface Params {
  id: string;
}

export default async function page({
  params,
}: {
  params: Promise<Params>;
}) {
  const finalParams = await params;
  console.log("Params:", finalParams);
  const idtoshow =decodeURI(finalParams?.id)
    return (
        <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-lbtext">Subscription Details for ID {idtoshow} </h1>
        </div>
    );

}

