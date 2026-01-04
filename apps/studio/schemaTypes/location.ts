export default {
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Location",
      type: "string",
      options: {
        list: [
          { title: "Online", value: "online" },
          { title: "Offline - Surabaya", value: "offline_surabaya" },
          { title: "Offline - Semarang", value: "offline_semarang" },
          { title: "Offline - Jakarta", value: "offline_jakarta" },
        ],
      },
    },
  ],
};
