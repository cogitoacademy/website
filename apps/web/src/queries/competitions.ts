import { defineQuery } from "next-sanity";

export const COMPETITIONS_QUERY = defineQuery(`
  *[_type == "competition"] | order(eventDate.startDate asc) {
    _id,
    title,
    description,
    categories[]->{
      _id,
      name,
      coreCategory
    },
    educationLevels,
    eventDate {
      startDate,
      endDate
    },
    scale,
    location,
    organizer,
    registrationDeadline,
    registrationLink,
    socialMediaLink
  }
`);
