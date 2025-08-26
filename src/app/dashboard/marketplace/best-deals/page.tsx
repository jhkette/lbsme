"use client";
import React from "react";
import { useGetAllDealsQuery } from "@/graphql/getAllDeals.generated";
import Image from "next/image";
import { SuspenseDeals } from "@/components/suspense/SuspenseComponents";
import DealCategory from "@/components/deals/DealCategory";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Page() {
  const { loading, error, data, refetch } = useGetAllDealsQuery({
    errorPolicy: "all",

    fetchPolicy: "cache-and-network",
  });

  const finalData = data?.getAllDeals.map((deal) => {
    return deal.category;
  });

  const pathname = usePathname();

  const topNav = [
    { name: "Business Deals", link: "sme-deals" },
    { name: "Free Trials", link: "free-trials" },
    { name: "Best Deals", link: "best-deals" },
  ];

  return (
    <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Best Deals</h1>
      <nav className="flex flex-row justify-start gap-8 items-center relative top-8">
        {topNav.map((item, index) => {
          const isActive = pathname.includes(item.link); 
          return (
            <Link
              key={index}
              href={`/dashboard/marketplace/${item.link}`} 
              className={`rounded-md px-2 py-1 w-fit transition-colors duration-300 
          ${isActive ? "bg-lbgreen text-white" : "bg-lbblue2 text-lbtext hover:bg-lbgreen hover:text-white"}`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      <Image
        src="/images/main/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-14 z-0 right-40"
      />

      {loading ? (
        <SuspenseDeals />
      ) : (
        <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
          <div className="w-full bg-lbgray rounded-t-lg p-4">
            <h2 className="text-2xl font-semibold text-lbtext">Best Deals</h2>
          </div>
          <div className="overflow-x-auto flex flex-row py-4 px-12 rounded-b-lg  bg-white justify-start items-center w-full flex-wrap h-[455px] scrollbar-nice ">
            {finalData?.map((category: string) => {
              return <DealCategory key={category} category={category} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
}
