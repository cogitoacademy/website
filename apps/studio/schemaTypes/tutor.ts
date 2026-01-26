import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "tutor",
  title: "Tutor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "profilePicture",
      title: "Profile Picture",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation",
      type: "internationalizedArrayString",
      description: "e.g., International Relations, Brawijaya University",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "competitionFields",
      title: "Competition Fields",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "competitionCategory" }],
        }),
      ],
    }),
    defineField({
      name: "locations",
      title: "Class Locations",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: [
              { title: "Online", value: "online" },
              { title: "Offline - Surabaya", value: "offline_surabaya" },
              { title: "Offline - Semarang", value: "offline_semarang" },
              { title: "Offline - Jakarta", value: "offline_jakarta" },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "achievements",
      title: "Achievements",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "achievementItem",
          fields: [
            defineField({
              name: "text",
              title: "Achievement",
              type: "internationalizedArrayString",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "experiences",
      title: "Experiences",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "experienceItem",
          fields: [
            defineField({
              name: "text",
              title: "Experience",
              type: "internationalizedArrayString",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "profilePicture",
      affiliation: "affiliation",
    },
    prepare(selection: any) {
      const { title, media, affiliation } = selection;
      return {
        title,
        subtitle: affiliation ? affiliation.find((item: any) => item._key === "id")?.value : "",
        media,
      };
    },
  },
});
