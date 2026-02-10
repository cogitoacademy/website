import { defineField, defineType } from "sanity";

export default defineType({
  name: "studentResource",
  title: "Student Resource",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Position Paper", value: "position-paper" },
          { title: "Resolution Bank", value: "resolution-bank" },
          { title: "Study Guide", value: "study-guide" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "file",
      title: "File (PDF)",
      type: "file",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
    },
    prepare({ title, category }) {
      const categories: Record<string, string> = {
        "position-paper": "Position Paper",
        "resolution-bank": "Resolution Bank",
        "study-guide": "Study Guide",
        other: "Other",
      };
      return {
        title: title,
        subtitle: categories[category] || category,
      };
    },
  },
});
