"use client";
import { useState, useEffect } from "react";
import { useGetSubscriptionsQuery } from "@/graphql/getMainSubData.generated";
import { Subscription } from "@/interfaces/Subscription";
import { Repeat } from "lucide-react";
import Image from "next/image";
import { set } from "date-fns";
export default function page() {
  const [groupedSubs, setGroupedSubs] = useState<Record<
    string,
    Subscription[]
  > | null>(null);

  const [search, setSearch] = useState("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { loading, error, data, refetch } = useGetSubscriptionsQuery({
    errorPolicy: "all",

    fetchPolicy: "cache-and-network",
  });
  // console.log(data?.getSubscriptions)

  useEffect(() => {
    if (data?.getSubscriptions?.subscriptions) {
      const result = groupByCategory(
        data.getSubscriptions.subscriptions as Subscription[]
      );
      setGroupedSubs(result);
      setSubscriptions(data.getSubscriptions.subscriptions as Subscription[]);
    }
  }, [data?.getSubscriptions?.subscriptions]);

  const groupByCategory = (subscriptions: Subscription[]) => {
    const grouped: Record<string, Subscription[]> = {};

    for (const subscription of subscriptions) {
      const key = subscription.category.category;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(subscription);
    }

    return grouped;
  };

    interface Filters {
      name: string;
      type: string;
    }

    interface HandleChangeEvent {
      target: {
        name: string;
        value: string;
      };
    }

    const handleChange = (value: string | HandleChangeEvent) => {
      console.log(value);
      if (typeof value === "string") {
        setSearch(value);
      
        let finalSubscriptions = subscriptions.filter((item) => {
          const q = value.toLowerCase();
          return (
            item.displayName.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q)
          );
        })
        setSubscriptions(finalSubscriptions);
        if(value === "") {
          setSubscriptions(data?.getSubscriptions?.subscriptions as Subscription[]);
        }
      } 

    };

  const filteredData = subscriptions.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.displayName.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    });

  console.log(data);

  return (
    <div className="px-16 w-full mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Subscriptions</h1>
      <input
        type="text"
        placeholder="Filter by name or type..."
        value={search}
        onChange={(e) => handleChange(e.target.value as string)}
        className="border p-2 rounded w-full md:w-1/2"
      />

      {groupedSubs !== null && subscriptions.length && (
        <ul>
          {["All", ...Object.keys(groupedSubs)].map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}

      {subscriptions.length && !loading ? (
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Frequency</th>
              <th className="py-2 px-4 text-left">Payment</th>
              <th className="py-2 px-4 text-left">Last Paid</th>
              <th className="py-2 px-4 text-left">Next Payment</th>
              <th className="py-2 px-4 text-left">Total Spend</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {subscriptions.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">
                  {item.merchant.icon != "unknown" ? (
                    <Image
                      src={item.merchant.icon as string}
                      alt={item.merchant.name}
                      width={50}
                      height={50}
                      className="inline-block mr-2"
                    />
                  ) : (
                    <Repeat
                      size={50}
                      className="inline-block mr-2 text-lbtextdark"
                    />
                  )}
                  {item.displayName}
                </td>
                <td className="py-2 px-4">{item.category?.category}</td>
                <td className="py-2 px-4">{item.type}</td>
                <td className="py-2 px-4">{item.paymentMethod}</td>
                <td className="py-2 px-4">{item.dates.lastPaymentDate}</td>
                <td className="py-2 px-4">{item.dates.renewalDate}</td>
                {/* <td className="py-2 px-4">{item.totalSpend}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}
