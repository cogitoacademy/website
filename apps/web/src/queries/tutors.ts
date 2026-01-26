import { defineQuery } from "next-sanity";

export const TUTORS_QUERY = defineQuery(`
  *[_type == "tutor"] | order(name asc) {
    _id,
    name,
    profilePicture {
      asset->{
        _id,
        url,
        altText
      }
    },
    affiliation,
    competitionFields[]->{
      _id,
      name,
      coreCategory
    },
    locations,
    achievements,
    experiences
  }
`);

// Locations are now enum strings, no need for separate query
// Use LOCATIONS constant from @/lib/config/locations instead

export const COMPETITION_CATEGORIES_QUERY = defineQuery(`
  *[_type == "competitionCategory"] | order(name asc) {
    _id,
    name
  }
`);
