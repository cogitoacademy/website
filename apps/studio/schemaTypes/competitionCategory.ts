export default {
  name: 'competitionCategory',
  title: 'Competition Category',
  type: 'document',
  fields: [
    {
      name: 'coreCategory',
      title: 'Core Category',
      type: 'string',
      description: 'Select the main category type',
      options: {
        list: [
          { title: 'Model United Nations', value: 'mun' },
          { title: 'Olimpiade', value: 'olimpiade' },
          { title: "World Scholar's Cup", value: 'wsc' },
          { title: 'KTI dan Esai', value: 'kti' },
          { title: 'Debat', value: 'debat' },
          { title: 'Business Plan', value: 'business' },
          { title: 'Pidato', value: 'pidato' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Specific Category Name',
      type: 'string',
      description: "e.g., 'Olimpiade Matematika SMP' or 'Business Case Competition'",
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      name: 'name',
      core: 'coreCategory',
    },
    prepare(selection: any) {
      const { name, core } = selection;
      return {
        title: name,
        subtitle: core ? `Core: ${core}` : '',
      };
    },
  },
};
