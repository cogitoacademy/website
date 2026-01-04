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
    jurusan,
    competitionFields[]->{
      _id,
      name
    },
    location->{
      _id,
      name
    },
    achievements,
    experiences
  }
`);

export const LOCATIONS_QUERY = defineQuery(`
  *[_type == "location"] | order(name asc) {
    _id,
    name
  }
`);

export const COMPETITION_CATEGORIES_QUERY = defineQuery(`
  *[_type == "competitionCategory"] | order(name asc) {
    _id,
    name
  }
`);
