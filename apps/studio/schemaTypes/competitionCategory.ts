export default {
  name: "competitionCategory",
  title: "Competition Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category Name",
      type: "string",
      options: {
        list: [
          { title: "Model United Nations", value: "mun" },
          { title: "Debate (EN)", value: "debate_en" },
          { title: "Speech (EN)", value: "speech_en" },
          { title: "World Scholar's Cup", value: "wsc" },
          { title: "KTI/Esai", value: "kti" },
          { title: "Debat (ID)", value: "debat_id" },
          { title: "Olimpiade IPS (SMP)", value: "olimpiade_ips" },
          { title: "Bisnis (BPC/BMC/BCC)", value: "bisnis" },
          { title: "Pidato/Orasi (ID)", value: "pidato_id" },
        ],
      },
    },
  ],
};
