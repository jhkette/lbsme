import React from 'react'
import { sanityFetch } from "@/sanity/lib/live"; // or wherever your fetch helper is
import { PortableText, PortableTextBlock } from "@portabletext/react"; 
import { PRIVACY_QUERY  } from  "@/sanity/queries";
import styles from "@/styles/faqstyles.module.css"


type SanityTextData = {
  title: string
  textContent: PortableTextBlock[]; 
};

export default async function page() {
  const data: { data: SanityTextData[] } = await sanityFetch({
    query: PRIVACY_QUERY ,
    params: {
      title: "Privacy Policy",
    },
  });
  const textContent = data.data[0]?.textContent;

  return (
      <div className={styles["faq-rich-text"] }>
      <div className="px-32 w-full mt-20 relative">
        <h1 className='text-lbgreen text-3xl font-bold py-12'>Privacy Policy</h1>
      <PortableText value={textContent} />
    </div>
    </div>
  )
}
