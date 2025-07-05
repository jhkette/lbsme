"use client";
import { useState, useEffect } from "react";
import { useGetSubscriptionsQuery } from "@/graphql/getMainSubData.generated";
import { Subscription } from "@/interfaces/Subscription";
import { Repeat, Download } from "lucide-react";
import { Search } from "lucide-react";
import { formatDate } from "@/lib/time";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { capitalize } from "@/lib/utils";
import {SubscriptionsTable} from "@/components/suspense/SuspenseComponents";

export default function page() {
  const [groupedSubs, setGroupedSubs] = useState<Record<
    string,
    Subscription[]
  > | null>(null);
  const [activeTab, setActiveTab] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { loading, error, data, refetch } = useGetSubscriptionsQuery({
    errorPolicy: "all",

    fetchPolicy: "cache-and-network",
  });
 

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

  const handleChange = (value: string) => {
    console.log(value);
    if (typeof value === "string") {
      setSearch(value);

      let finalSubscriptions = subscriptions.filter((item) => {
        const q = value.toLowerCase();
        return (
          item.displayName.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
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


  
  console.log(data);

  return (
    <div className="px-16 w-full mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Subscriptions</h1>

      {groupedSubs !== null && (
        <ul className="flex flex-row gap-12">
          {["All Subscriptions", ...Object.keys(groupedSubs)].map((category) => (
            <li
              key={category}
              onClick={(e) => console.log(e)}
              className="text-lbgrey text-lg pb-2"
            >
              {category}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-row items-center justify-start gap-8 rounded-lg bg-white shadow p-4 mb-6">
        <div className="flex flex-row w-128 md:flex-row items-center justify-between ">
          <input
            type="text"
            placeholder="Filter by name or type..."
            value={search}
            onChange={(e) => handleChange(e.target.value as string)}
            className="border p-2 rounded w-128 "
          />
          <Search className="relative -left-10 " color="#787787" />
        </div>
        <div className="flex flex-row items-center justify-start">
          <button className="w-40 border-1 py-2 cursor-pointer rounded-l-md border-lbgray" onClick={()=>setActiveTab(true)}>Active</button>
          <button className="w-40 border-1 py-2 cursor-pointer rounded-r-md border-lbgray text-white bg-lbdarkblue" onClick={()=>setActiveTab(false)}>Inactive</button>
        </div>
        <div className="flex flex-row items-center justify-start bg-lbgray rounded-lg p-2">
        <Download color="#787787" size={24} />
        </div>
      </div>

      {!!subscriptions.length && !loading ? (
        <table className="min-w-full bg-white shadow rounded-lg border-1 border-lbgray">
          <thead className="bg-bggrey text-lg font-semibold text-lbtext py-4">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Frequency</th>
              <th className="py-2 px-4 text-left">Payment</th>
              <th className="py-2 px-4 text-left">Last Paid</th>
              <th className="py-2 px-4 text-left">Next Payment</th>
           
            </tr>
          </thead>
          <tbody className="bg-white">
            {subscriptions.map((item, idx) => (
              <tr key={idx} className="border-t cursor-pointer hover:bg-gray-50" onClick={() => console.log(item)}>
                <td className="py-4 px-4 flex flex-row items-center">
                  {item.merchant.icon != "unknown" ? (
                    <Image
                      src={item.merchant.icon as string}
                      alt={item.merchant.name}
                      width={45}
                      height={45}
                      className="inline-block mr-4"
                    />
                  ) : (
                    <div className="w-[45px] mx-2">
                      <Repeat
                        size={35}
                        color="#EDECEC"
                        className="inline-block mx-auto"
                      />
                    </div>
                  )}
                  {item.displayName.length > 45 ? (
                    <p className="text-sm ">{item.displayName}</p>
                  ) : (
                    <p className="text-lg">{item.displayName}</p>
                  )}
                </td>
                <td className="py-2 px-4">{item.category?.category}</td>
                <td className="py-2 px-4">{capitalize(item.type)}</td>
                <td className="py-2 px-4">{item.paymentMethod}</td>
                <td className="py-2 px-4">
                  {format(parseISO(item.dates.lastPaymentDate as string), "do MMM yyyy")}
                  
                </td>
                <td className="py-2 px-4">
                  {format(parseISO(item.dates.renewalDate as string), "do MMM yyyy")}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      ): <SubscriptionsTable/>}
    </div>
  );
}
