import { defineQuery } from "next-sanity";


export const DEAL_QUERY = defineQuery(`*[_type == "dealOffer"]{
    _id,
    dealName,
    dealSnippet,
    dealType,
    dealGenre,
    description,
    dealImage,
    category,
    link { code, visit }
  }`);



export const FAQ_QUERY = defineQuery(`*[_type == "FAQs"]| order(_createdAt desc){
  _id,
  faqQuestion,
  faqAnswer,
  tag
}`);