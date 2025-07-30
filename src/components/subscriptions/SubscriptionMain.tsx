"use client";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { useGetSubscriptionsQuery } from "@/graphql/getMainSubData.generated";
import { Subscription } from "@/interfaces/Subscription";
import { Repeat, Download } from "lucide-react";
import { Search } from "lucide-react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { capitalize } from "@/lib/utils";
import { SubscriptionStatusEnum } from "@/graphql-types/generated/types";
import { SubscriptionsTable } from "@/components/suspense/SuspenseComponents";
import { useRouter } from "next/navigation";
import { mkConfig, generateCsv, download } from "export-to-csv";
import Circle from "@/components/lbcoreui/Circle";

export default function SubscriptionMain() {
  // State variables to manage subscriptions, grouped subscriptions, and search
  // and category selection
  const [groupedSubs, setGroupedSubs] = useState<Record<
    string,
    Subscription[]
  > | null>(null);
  const [subStatus, setSubStatus] = useState<SubscriptionStatusEnum>(
    SubscriptionStatusEnum.Active
  );
  
  const [selectedCategory, setSelectedCategory] = useState("All Subscriptions");
  const [search, setSearch] = useState("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  // Configuration for CSV export
  const csvConfig = mkConfig({ useKeysAsHeaders: true });
  // fetch subscriptions based on the selected status
  const { loading, error, data, refetch } = useGetSubscriptionsQuery({
    errorPolicy: "all",
    variables: {
      status: subStatus, // Pass the reactive value // Use the correct enum or union value as defined in your GraphQL schema
    },
    fetchPolicy: "cache-and-network",
  });
 

  const router = useRouter();
  useEffect(() => {
    if (data?.getSubscriptions?.subscriptions) {
      const result = groupByCategory(
        data.getSubscriptions.subscriptions as Subscription[]
      );
      setGroupedSubs(result);
      setSubscriptions(data.getSubscriptions.subscriptions as Subscription[]);
      console.log("ran", data.getSubscriptions.subscriptions);
    }
  }, [data?.getSubscriptions?.subscriptions]);

  const groupByCategory = (subs: Subscription[]) => {
    const grouped: Record<string, Subscription[]> = {};

    for (const subscription of subs) {
      const key = subscription.category.category;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(subscription);
    }

    return grouped;
  };
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category); 
    console.log(groupedSubs) 
    if (category === "All Subscriptions") {
      setSubscriptions(data?.getSubscriptions?.subscriptions as Subscription[]);
    } else {
      const filteredSubs = groupedSubs?.[category] || [];
      setSubscriptions(filteredSubs);
    }
  }

  const handleChange = (value: string) => {
    if (typeof value === "string") {
      setSearch(value);

      const finalSubscriptions = subscriptions.filter((item) => {
        const q = value.toLowerCase();
        return (
          item.merchant.name.toLowerCase().includes(q) ||
          item.displayName.toLowerCase().includes(q)
          
        );
      });
      setSubscriptions(finalSubscriptions);
      if (value === "") {
        setSubscriptions(
          data?.getSubscriptions?.subscriptions as Subscription[]
        );
      }
    }
  };

  const handleRowClick = (id: string) => {
    const finalId = encodeURIComponent(id);
    router.push(`subs/${finalId}`);
  };

    const exportDataToCSV = () => {
      if(data?.getSubscriptions?.subscriptions) {
      const plainSubs = data?.getSubscriptions?.subscriptions.map((sub) => ({
        displayName: sub.displayName,
        monthlyCost: sub.monthlyCost.toFixed(2),
        renewalDate: sub.dates.renewalDate,
        lastPayment: sub.dates.lastPaymentDate,
        paymentMethod: sub.paymentMethod,
        merchantName: sub.merchant?.name,
      }));
      const csv = generateCsv(csvConfig)(plainSubs);
      download(csvConfig)(csv);
    }
    };


  return (
    <div className="my-13">
      {groupedSubs !== null && (
        <ul className="flex flex-row gap-12 list-none">
          {["All Subscriptions", ...Object.keys(groupedSubs)].map(
            (category) => (
              <li
                key={category}
                onClick={(e) => handleCategoryClick((e.target as HTMLElement)?.textContent as string)}
                className={clsx("block z-200 text-lbgrey text-lg list-none pb-1 mb-2 ease-in-out cursor-pointer", selectedCategory === category ? "border-b-2 border-lbtext text-lbtext font-semibold " : "hover:text-lbtext")}
              >
                {category}
              </li>
            )
          )}
        </ul>
      )}
      <div className="flex flex-row items-center justify-start gap-8 rounded-lg bg-white shadow p-4 mb-6">
        <div className="flex flex-row w-128 md:flex-row items-center justify-between ">
          <input
            type="text"
            placeholder="Filter by subscription type..."
            value={search}
            onChange={(e) => handleChange(e.target.value as string)}
            className="border p-2 rounded w-128 "
          />
          <Search className="relative -left-10 " color="#787787" />
        </div>
        <div className="flex flex-row items-center justify-start">
          <button
            className={clsx(
              "w-40 border-1 py-2 cursor-pointer rounded-l-md ",
              subStatus === SubscriptionStatusEnum.Active
                ? "border-lbgreen text-white bg-lbgreen"
                : "border-lbgray text-lbtext bg-white"
            )}
            onClick={() => setSubStatus(SubscriptionStatusEnum.Active)}
          >
            Active
          </button>
          <button
            className={clsx(
              "w-40 border-1 py-2 cursor-pointer rounded-r-md ",
              subStatus === SubscriptionStatusEnum.Deactive
                ? "border-lbgreen text-white bg-lbgreen"
                : "border-lbgray text-lbtext bg-white"
            )}
            onClick={() => setSubStatus(SubscriptionStatusEnum.Deactive)}
          >
            Inactive
          </button>
        </div>
        <div className="bg-lbgray rounded-lg p-2 block w-fit justify-start bg-lbgray rounded-lg mr-2 hover:bg-lbgreen text-lbtextgrey hover:text-white cursor-pointer ease-in-out" onClick={exportDataToCSV}>
         
          <Download  size={24} />
        
        </div>
      </div>

      {!!subscriptions && !loading ? (
        <div className="max-h-[550px] rounded-lg overflow-y-auto shadow-2xl  scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen border-1 border-gray-300">
        <table className="min-w-full bg-white  border-1 border-lbgray h-fit">
          <thead className="text-base lg:text-lg font-semibold text-lbtext  ">
                <tr className="bg-bggrey">
              <th className="py-2 lg:py-4 px-4 text-left">Name</th>
              <th className="py-2 lg:py-4 px-4 text-left">Type</th>
              <th className="py-2 lg:py-4 px-4 text-left">Frequency</th>
              <th className="py-2 lg:py-4 px-4 text-left">Payment</th>
                <th className="py-2 lg:py-4 px-4 text-left">Monthly Cost</th>
              <th className="py-2 lg:py-4 px-4 text-left">Last Paid</th>
              <th className="py-2 lg:py-4 px-4 text-left">Next Payment</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {subscriptions.map((item, idx) => {
             
              return (
                 <tr
          key={idx}
          className="border-t cursor-pointer hover:bg-gray-50" 
          onClick={() => handleRowClick(item.subscriptionId)}
        >
                <td className="py-4 px-4 flex flex-row items-center">
                  {item.merchant.icon !== "unknown" &&
                  item.merchant.icon !== null ? (
                    <Image
                      src={item.merchant.icon as string}
                      alt={item.merchant.name}
                      width={50}
                      height={50}
                      className="inline-block mr-4"
                    />
                  ) : (
                     <div className="mr-4">
                      <Circle />
                      </div>
                   
                  )}
                  {item.displayName.length > 0 ? (
                    item.displayName.length > 45 ? (
                      <p className="text-sm ">{item.displayName}</p>
                    ) : (
                      <p className="text-lg">{item.displayName}</p>
                    )
                  ) : (
                    <p className="text-lg">{item.merchant.name}</p>
                  )}
                </td>
                <td className="py-2 px-4">{item.category?.category}</td>
                <td className="py-2 px-4"><p className="mx-auto w-fit bg-lbbgblue text-white px-3 py-1 rounded-lg text-xs">{capitalize(item.type)}</p></td>
                <td className="py-2 px-4" >
                  {item.paymentMethod && (
     
                  <p className="mx-auto w-fit bg-lbbgblue text-white px-3 py-1 rounded-lg text-xs">{item.paymentMethod}</p>
                  )}</td>
                <td className="py-2 px-4">
                
                      {`£${item.monthlyCost.toFixed(2)}`}</td>
                <td className="py-2 px-4">
              
                  {format(
                    parseISO(item.dates.lastPaymentDate as string),
                    "do MMM yyyy"
                  )}
                </td>
                <td className="py-2 px-4">
                  {subStatus === SubscriptionStatusEnum.Active && (
                    <>
                     
                      {format(
                        parseISO(item.dates.renewalDate as string),
                        "do MMM yyyy"
                      )}
                    </>
                  )}
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        </div>
      ) : (
        <SubscriptionsTable />
      )}
    </div>
  );
}
