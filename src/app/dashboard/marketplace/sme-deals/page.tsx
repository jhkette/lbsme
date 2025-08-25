"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FixedDeals } from "@/interfaces/FixedDeals";
import {
  FD_LINK_BROADBAND,
  FD_LINK_MOBILE,
  FD_LINK_CAR_INS,
  FD_LINK_HOME_INS,
  FD_LINK_ENERGY,
  FD_LINK_PET_INS,
  FD_LINK_TRAVEL_INS,
} from "@/lib/consts";


type DealProps = {
  category: string;
};

const FIXED_DEALS = [
  {
    name: FixedDeals.Broadband,
    uri: FD_LINK_BROADBAND,
    icon: "/images/deal-icons/broadband.svg",
  },
  {
    name: FixedDeals.CarInsurance,
    uri: FD_LINK_CAR_INS,
    icon: "/images/deal-icons/car-insurance.svg",
  },
  {
    name: FixedDeals.Energy,
    uri: FD_LINK_ENERGY,
    icon: "/images/deal-icons/energy.svg",
  },
  {
    name: FixedDeals.HomeInsurance,
    uri: FD_LINK_HOME_INS,
    icon: "/images/deal-icons/home-insurance.svg",
  },
  {
    name: FixedDeals.Mobile,
    uri: FD_LINK_MOBILE,
    icon: "/images/deal-icons/mobile.svg",
  },
  {
    name: FixedDeals.PetInsurance,
    uri: FD_LINK_PET_INS,
    icon: "/images/deal-icons/pet-insurance.svg",
  },
  {
    name: FixedDeals.TravelInsurance,
    uri: FD_LINK_TRAVEL_INS,
    icon: "/images/deal-icons/travel-insurance.svg",
  },
];

export default function Page() {
  const pathname = usePathname();


  const topNav = [
    { name: "SME Deals", link: "sme-deals" },
    { name: "Free Trials", link: "free-trials" },
    { name: "Best Deals", link: "best-deals" },
  ];

  return (
    <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Best Deals</h1>
     <nav className="flex flex-row justify-start gap-8 items-center relative top-8">
  {topNav.map((item, index) => {
    const isActive = pathname.includes(item.link); // check if current path matches

    return (
      <Link
        key={index}
        href={`/dashboard/marketplace/${item.link}`} // add link if needed
        className={`rounded-md px-2 py-1 w-fit transition-colors duration-300 
          ${isActive ? "bg-lbgreen text-white" : "bg-lbblue2 text-lbtext"}`}
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
          <h2 className="text-2xl font-semibold text-lbtext">SME Deals</h2>
        </div>
        <div className="overflow-x-auto flex flex-row py-4 px-12 rounded-b-lg  bg-white justify-start items-center w-full flex-wrap h-[455px] scrollbar-nice ">
          {FIXED_DEALS.map((deal, index) => {
           

            return (
              <a
                key={index}
                href={deal.uri}
                target="_blank" rel="noreferrer"
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
