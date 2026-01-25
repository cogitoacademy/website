import { defineQuery } from "next-sanity";

export const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(eventDate.startDate asc) {
    _id,
    title,
    description,
    categories[]->{
      _id,
      name,
      coreCategory
    },
    educationLevels[]->{
      _id,
      name
    },
    eventDate {
      startDate,
      endDate
    },
    scale->{
      name
    },
    location,
    organizer,
    registrationDeadline,
    registrationLink,
    socialMediaLink
  }
`);
