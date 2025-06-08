import { defineQuery } from "next-sanity";


export const PROJECT_QUERY = defineQuery(`*[_type == "project"]{
    _id,
    projectName,
    techstack,
    description,
    projectImage,
    category,
    link { code, visit }
  }`);

export const PROJECT_BY_ID_QUERY = defineQuery(`*[_type == "project" && _id == $id][0]{
    _id,
    projectName,
    techstack,
    description,
    projectImage,
    category,
    link { code, visit }
  }`);