"use client";
import { useState, useEffect } from "react";
import { useGetProvidersQuery } from "@/graphql/getProviders.generated";
import { Search } from "lucide-react";


export default function OpenBankingProvider() {
    const [search, setSearch] = useState("");
    const [providers, setProviders] = useState([]);
     const { loading, error, data, refetch } = useGetProvidersQuery({
        variables: { name: "" },
        errorPolicy: "all",
        fetchPolicy: "cache-and-network",
      });
    useEffect(() => {
        if (data?.getProviders) {
            setProviders(data.getProviders);

        }},[data?.getProviders]);
      console.log(data, "OPEN BANKING DATA");

      console.log(providers, "OPEN BANKING PROVIDERS");
  return (
       <div className="relative w-128 bg-white ">
  {/* Search Icon */}
  <Search
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
    size={20}
  />

  {/* Input */}
  <input
    type="text"
    placeholder="Filter by name or type..."
    onChange={(e) => setSearch(e.target.value)}
    className="pl-10 pr-4 py-2 border rounded w-full placeholder-gray-500"
  />
</div>
  )
}
