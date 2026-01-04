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
      name: "jurusan",
      title: "Jurusan/Title",
      type: "internationalizedArrayString",
      description: "e.g., Hubungan Internasional, Universitas Brawijaya",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "competitionFields",
      title: "Bidang Perlombaan",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "competitionCategory" }],
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "Lokasi Kelas",
      type: "reference",
      to: [{ type: "location" }],
    }),
    defineField({
      name: "achievements",
      title: "Pencapaian",
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
      title: "Pengalaman",
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
      jurusan: "jurusan",
    },
    prepare(selection: any) {
      const { title, media, jurusan } = selection;
      return {
        title,
        subtitle: jurusan ? jurusan.find((item: any) => item._key === "id")?.value : "",
        media,
      };
    },
  },
});
