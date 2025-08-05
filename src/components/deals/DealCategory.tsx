
import slugify from 'slugify';
import Image from "next/image";
import Link from "next/link";

type DealProps = {

  category: string
  
};

export default function DealItem({ category }: DealProps) {
 
let categoryId;
if(category){
  categoryId = slugify(category, { lower: true }); 
}

  return (
    <>
      {category ? (
         <Link href={`/dashboard/marketplace/bestdeals/${categoryId}`}>
        <div className="shadow-lg border-1 border-lbgray relative bg-[url(/images/deals/dealbg.png)] min-w-[275px] min-h-[185px] max-w-[275px] max-h-[185px] bg-center bg-no-repeat bg-cover my-4 mx-4 py-8">
         
            <p className="text-center p-4 text-lg text-lbtext font-bold max-w-[180]">
              {category}
            </p>
            {/* <p className="text-lg text-gray-500 font-semibold text-center">
              {deal.dea}
            </p> */}
            <Image
              src={"/images/deals/Tag.svg"}
              alt={category || ""}
              width={60}
              height={60} 
              style={{ height: "auto" }} // Maintain proportions
              className="rounded absolute right-2 bottom-4" // Optional styling
           
            />
         
        </div>
         </Link>
      ) : null}
    </>
  );
}
