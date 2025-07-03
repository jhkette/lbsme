"use client";
import { useState, useEffect } from "react";
import { useGetProvidersQuery } from "@/graphql/getProviders.generated";
import { Search } from "lucide-react";
import { ProviderResult } from "@/interfaces/ProviderResult";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

export default function OpenBankingProvider() {
  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState<ProviderResult[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const { loading, error, data, refetch } = useGetProvidersQuery({
    variables: { name: "" },
    errorPolicy: "all",

    fetchPolicy: "cache-first",
  });
  const router = useRouter();
  // set providers when data is fetched
  useEffect(() => {
    if (data?.getProviders) {
      setProviders(data.getProviders);
    }
  }, [data?.getProviders]);
  // filter providers based on search input
  useEffect(() => {
    if (data?.getProviders) {
      const filtered = data.getProviders.filter((provider) => {
        return (
          provider.displayName.toLowerCase().includes(search.toLowerCase()) ||
          provider.providerId.toLowerCase().includes(search.toLowerCase())
        );
      });
      setProviders(filtered);
    }
  }, [search, data?.getProviders]);
  console.log(selectedProvider);
  console.log(providers);
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg">
        <div className="relative w-96 ">
          {/* Search Icon */}
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          {/* Input */}
          <input
            type="text"
            placeholder="Type your bank name"
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded w-104 placeholder-gray-500"
          />
        </div>
        {/* Providers List */}
        {providers && providers.length > 0 && (
          <div className="max-h-96 overflow-y-auto ">
            {providers.map((provider) => {
              return (
                <div
                  key={provider.providerId}
                  className={clsx(
                    "p-4 hover:bg-gray-100 cursor-pointer flex flex-row items-center hover:bg-lbdarkblue hover:text-white",
                    selectedProvider === provider.providerId &&
                      "bg-lbdarkblue text-white"
                  )}
                  onClick={() => {
                    setSelectedProvider(provider.providerId);
                  }}
                >
                  <Image
                    src={provider.icon as string}
                    alt={provider.displayName}
                    width={30}
                    height={30}
                    className="inline-block mr-4"
                  />
                  <p>{provider.displayName}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button
        className="w-full mt-12 bg-lbdarkblue text-white py-2 cursor-pointer rounded-lg hover:bg-lbtextgrey"
        onClick={() => {
          if (selectedProvider) {
            router.push(`/open-banking/${selectedProvider}`);
          }
        }}
        disabled={!selectedProvider}
      >
        Select Provider
      </button>
    </div>
  );
}
