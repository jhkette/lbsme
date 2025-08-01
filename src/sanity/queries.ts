import { defineQuery } from "next-sanity";




export const FAQ_QUERY = defineQuery(`*[_type == "FAQs"]| order(_createdAt asc){
  _id,
  faqQuestion,
  _createdAt,
  faqAnswer,
  tag
}`);


export const TEXT_QUERY = defineQuery(`*[_type == "textpage" && title == $title]{
  _id,
  title,
  textContent
}`);

export const PRIVACY_QUERY = defineQuery(`*[_type == "textpage" && title == "Privacy Policy"]{
  _id,
  title,
  textContent
}`);