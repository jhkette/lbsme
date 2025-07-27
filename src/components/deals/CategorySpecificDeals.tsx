"use client"
import slugify from 'slugify';
import Image from "next/image";
import Link from "next/link";
import { useGetAllDealsQuery } from '@/graphql/getAllDeals.generated';
type DealProps = {

  category: string
  
};



export default function CategrorySpecificDeals({ category }: DealProps) {
 


 const { loading, error, data, refetch } = useGetAllDealsQuery({
      errorPolicy: "all",
     
      fetchPolicy: "cache-and-network",
    });
   const groupedData = data?.getAllDeals.find((deal) => {
          const slug = slugify(deal.category,  { lower: true });
        return slug === category
   })


  return (


   <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
                  <div className="w-full bg-lbgray rounded-t-lg p-2">
                    <h2 className="text-xl font-semibold text-lbtext">Best Deals</h2>
                  </div>
                  <div className="scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen overflow-x-auto flex flex-row py-4 pl-12 rounded-b-lg  bg-white justify-start items-end w-full flex-wrap max-h-[550px] ">
      {category && groupedData
  ? groupedData.deals.map((deal) => {
      const dealSlug = slugify(deal.name, { lower: true });

      return (
        <Link
          key={dealSlug} 
          href={`/dashboard/marketplace/bestdeals/${category}/${dealSlug}`}
        >
          <div className="relative bg-[url(/images/deals/dealbg.png)] min-w-[275px] min-h-[185px] max-w-[275px] max-h-[185px] bg-center bg-no-repeat bg-cover my-4 mx-4 py-8">
            <p className="text-center p-4 text-lg text-lbtext font-bold max-w-[180]">
              {deal.name}
            </p>
            <Image
              src={deal.logo}
              alt={category || ""}
              width={60}
              height={60}
              style={{ height: "auto" }}
              className="rounded absolute right-2 bottom-4"
            />
          </div>
        </Link>
      );
    })
  : null}
        </div>
    </section>

  );
}
