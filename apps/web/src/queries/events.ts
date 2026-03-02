import { defineQuery } from 'next-sanity';

export const EVENTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "event" && category == $category] | order(date desc) {
    _id,
    title,
    slug,
    category,
    "imageUrl": image.asset->url,
    description,
    date,
    time,
    place,
    summary,
    registrationLink
  }
`);
