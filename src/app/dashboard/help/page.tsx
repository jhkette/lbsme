

import { FAQ_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/lib/live";
import HelpAccordion from "@/components/faqs/HelpAccordion";
import AccordionWrapper from "@/components/faqs/AccordionWrapper";

export default async function page() {
  
    const {data: faqs} = await sanityFetch({query: FAQ_QUERY});
  return (
    <div className="px-32 mt-32 w-full mt-12 relative">
     <AccordionWrapper faqs={faqs}/>
    </div>
  );
}
