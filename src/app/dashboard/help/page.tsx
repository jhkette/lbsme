import { FAQ_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/lib/live";
import ContactForm from "@/components/faqs/ContactForm";
import styles from "@/styles/faqstyles.module.css"

import AccordionWrapper from "@/components/faqs/AccordionWrapper";

export default async function page() {
  
    const {data: faqs} = await sanityFetch({query: FAQ_QUERY});
    console.log(faqs)

  return (
    <div className={styles["faq-rich-text"] }>
    <div className="px-32 w-full mt-12 relative">
      <h1 className="text-lbgreen text-3xl font-bold my-12">Frequenly asked questions</h1>
     <AccordionWrapper faqs={faqs}/>
     <ContactForm/>

    </div>
    </div>
  );
}
