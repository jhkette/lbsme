import { defineQuery } from "next-sanity";


export const SUBSCRIPTION_DEAL_QUERY = defineQuery(`*[_type == "dealOffer" && (dealType == "subscription deals" || dealType == "free trials")]{
    _id,
    dealName,
    slug,
    dealSnippet,
    dealType,
    dealGenre,
    description,
    dealImage,
    featured,
    link
  
  }`);



    export const SWITCH_DEAL_QUERY = defineQuery(`*[_type == "dealOffer" && dealType == "switch"]{
    _id,
    dealName,
    slug,
    dealSnippet,
    dealType,
    dealGenre,
    description,
    dealImage,
    category,
    featured,
    link
  }`);

  export const DEAL_QUERY =defineQuery(
    ` *[_type == "dealOffer" && slug.current == $slug][0]{
     _id,
     slug,
    dealName,
    dealSnippet,
    dealType,
    dealGenre,
    description,
    dealImage,
    category,
    featured,
    link

    }
    `
  )


export const FAQ_QUERY = defineQuery(`*[_type == "FAQs"]| order(_createdAt asc){
  _id,
  faqQuestion,
  _createdAt,
  faqAnswer,
  tag
}`);