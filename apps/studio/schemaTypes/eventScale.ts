export default {
  name: "eventScale",
  title: "Event Scale",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Scale",
      type: "string",
      options: {
        list: [
          { title: "International", value: "international" },
          { title: "National", value: "national" },
        ],
      },
    },
  ],
};
