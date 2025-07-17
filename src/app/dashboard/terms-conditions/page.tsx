import React from 'react'
import { sanityFetch } from "@/sanity/lib/live"; // or wherever your fetch helper is
import { PortableText, PortableTextBlock } from "@portabletext/react"; 
import { TEXT_QUERY } from  "@/sanity/queries";



type SanityTextData = {
  title: string
  textContent: PortableTextBlock[]; 
};

export default async function page() {
  const data: { data: SanityTextData[] } = await sanityFetch({
    query: TEXT_QUERY,
    params: {
      title: "Terms & Conditions",
    },
  });
  const textContent = data.data[0]?.textContent;
  console.log(data)
  return (
    <div>
      <div>Terms and Conditions</div>
      <PortableText value={textContent} />
    </div>
  )
}
