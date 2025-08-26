"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FIXED_DEALS } from "@/lib/smeDeals";

export default function Page() {
  const pathname = usePathname();

  const topNav = [
    { name: "Business Deals", link: "sme-deals" },
    { name: "Free Trials", link: "free-trials" },
    { name: "Best Deals", link: "best-deals" },
  ];

  return (
    <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Business Deals</h1>
      <nav className="flex flex-row justify-start gap-8 items-center relative top-8">
        {topNav.map((item, index) => {
          const isActive = pathname.includes(item.link); 

          return (
            <Link
              key={index}
              href={`/dashboard/marketplace/${item.link}`} 
              className={`rounded-md px-2 py-1 w-fit transition-colors duration-300 
          ${isActive ? "bg-lbgreen text-white" : "bg-lbblue2 text-lbtext hover:bg-lbgreen text-white"}`}
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

      <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
        <div className="w-full bg-lbgray rounded-t-lg p-4">
          <h2 className="text-2xl font-semibold text-lbtext">Business Deals</h2>
        </div>
        <div className="overflow-x-auto flex flex-row py-4 px-12 rounded-b-lg  bg-white justify-start items-center w-full flex-wrap h-[455px] scrollbar-nice ">
          {FIXED_DEALS.map((deal, index) => {
            return (
              <a
                key={index}
                href={deal.uri}
                target="_blank"
                rel="noreferrer"
                className="hover:scale-105 transition-transform duration-300 hover: opacity-90 ease-in-out"
              >
                <div className="relative bg-[url(/images/deals/dealbg.png)] min-w-[275px] min-h-[185px] max-w-[275px] max-h-[185px] bg-center bg-no-repeat bg-cover my-4 mx-4 py-8">
                  <p className="text-center p-4 text-lg text-lbtext font-bold max-w-[180]">
                    {deal.name}
                  </p>
                  <Image
                    src={deal.icon}
                    alt={deal.name || ""}
                    width={60}
                    height={60}
                    style={{ height: "auto" }}
                    className="rounded absolute right-2 bottom-4"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
