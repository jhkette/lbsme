import { defineQuery } from "next-sanity";


export const SUBSCRIPTION_DEAL_QUERY = defineQuery(`*[_type == "dealOffer" && dealType == "subscription deals"]{
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

  export const TRIALS_DEAL_QUERY = defineQuery(`*[_type == "dealOffer" && dealType == "free trials"]{
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

    export const SWITCH_DEAL_QUERY = defineQuery(`*[_type == "dealOffer" && dealType == "switch"]{
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



export const FAQ_QUERY = defineQuery(`*[_type == "FAQs"]| order(_createdAt asc){
  _id,
  faqQuestion,
  faqAnswer,
  tag
}`);