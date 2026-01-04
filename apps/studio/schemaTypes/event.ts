import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "competitionCategory" }],
        }),
      ],
    }),
    defineField({
      name: "scale",
      title: "Scale",
      type: "reference",
      to: [{ type: "eventScale" }],
    }),
    defineField({
      name: "registrationDeadline",
      title: "Registration Deadline",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "eventDates",
      title: "Event Dates",
      type: "array",
      of: [
        defineArrayMember({
          name: "dateRange",
          type: "object",
          fields: [
            defineField({
              name: "startDate",
              title: "Start Date",
              type: "datetime",
            }),
            defineField({
              name: "endDate",
              title: "End Date",
              type: "datetime",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "socialMediaLink",
      title: "Social Media Link",
      type: "url",
    }),
    defineField({
      name: "registrationLink",
      title: "Registration Link",
      type: "url",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "organizer",
      title: "Organizer",
      type: "string",
    }),
    defineField({
      name: "educationLevels",
      title: "Jenjang",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "educationLevel" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      deadline: "registrationDeadline",
    },
    prepare(selection: any) {
      const { title, deadline } = selection;
      const date = new Date(deadline).toLocaleDateString("id-ID");
      return {
        title: title ? title.find((item: any) => item._key === "id")?.value : "",
        subtitle: `Deadline: ${date}`,
      };
    },
  },
});
