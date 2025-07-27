import { FAQ_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/lib/live";
import ContactForm from "@/components/faqs/ContactForm";


import AccordionWrapper from "@/components/faqs/AccordionWrapper";

export default async function page() {
  
    const {data: faqs} = await sanityFetch({query: FAQ_QUERY});
   

  return (
    
    <div className="px-32 w-full mt-20 relative">
      <h1 className="text-lbgreen text-3xl font-bold py-12">Frequenly asked questions</h1>
     <AccordionWrapper faqs={faqs}/>
     <ContactForm/>

    </div>
  
  );
}
