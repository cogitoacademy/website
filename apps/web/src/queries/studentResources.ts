import { defineQuery } from "next-sanity";

export const STUDENT_RESOURCES_QUERY = defineQuery(`
  *[_type == "studentResource"] | order(title asc) {
    _id,
    title,
    description,
    category,
    "fileUrl": file.asset->url
  }
`);
