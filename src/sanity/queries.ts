import { defineQuery } from "next-sanity";


export const SUBSCRIPTION_DEAL_QUERY = defineQuery(`*[_type == "dealOffer" && (dealType == "subscription deals" || dealType == "free trials")]{
    _id,
    dealName,
    dealSnippet,
    dealType,
    dealGenre,
    description,
    dealImage,
  
  }`);



    export const SWITCH_DEAL_QUERY = defineQuery(`*[_type == "dealOffer" && dealType == "switch"]{
    _id,
    dealName,
    dealSnippet,
    dealType,
    dealGenre,
    description,
    dealImage,
    category,
   
  }`);



export const FAQ_QUERY = defineQuery(`*[_type == "FAQs"]| order(_createdAt asc){
  _id,
  faqQuestion,
  faqAnswer,
  tag
}`);