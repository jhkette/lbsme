"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SuspenseDeals } from "@/components/suspense/SuspenseComponents";
import FreeTrialItem from "@/components/deals/FreeTrialItem";
import { useApolloClient } from "@apollo/client";
import { fetchAllTrials } from "@/lib/freeTrialsQuery"; // adjust path
import { usePathname } from "next/navigation";
type Deal = {
  [key: string]: any;
};

export default function Page() {
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

  const pathname = usePathname();
  
  
    const topNav = [
    { name: "Business Deals", link: "sme-deals" },
    { name: "Free Trials", link: "free-trials" },
    { name: "Best Deals", link: "best-deals" },
  ];

  return (
      <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Free Trials</h1>
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
      {loading ? (
        <SuspenseDeals />
      ) : (
        <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
          <div className="w-full bg-lbgray rounded-t-lg p-4">
            <h2 className="text-2xl font-semibold text-lbtext">Free Trials</h2>
          </div>
          <div className="overflow-x-auto flex flex-row py-4 px-12 rounded-b-lg  bg-white justify-start items-center w-full flex-wrap h-[455px] scrollbar-nice ">
            {/* {subscriptionDeals
                    .filter((deal: Deal) => deal.featured === true)
                    .map((deal: Deal) => (
                      <DealItem key={deal._id} deal={deal} />
                    ))}
                    <DealSubscriptionMore /> */}

            {freeTrials?.map((deal: Deal) => {
              return <FreeTrialItem key={deal.name} deal={deal} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
}
