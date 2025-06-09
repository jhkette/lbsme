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

// export const SINGLE_PROJECT_QUERY = (id: string) => defineQuery(`*[_type == "project" && _id == $id][0]{
//   _id,
//   projectName,
//   techstack,
//   description,
//   projectImage,
//   category,
//   link { code, visit }
// }`);