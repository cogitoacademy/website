export default {
  name: 'educationLevel',
  title: 'Education Level',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'SD', value: 'sd' },
          { title: 'SMP', value: 'smp' },
          { title: 'SMA', value: 'sma' },
          { title: 'Mahasiswa', value: 'mahasiswa' },
        ],
      },
    },
  ],
};
