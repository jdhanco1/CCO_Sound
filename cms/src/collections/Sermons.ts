import { CollectionConfig } from 'payload/types';

export const Sermons: CollectionConfig = {
  slug: 'sermons',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'speaker', 'date', 'series'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'speaker', type: 'text' },
    { name: 'series', type: 'text' },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      admin: { description: 'YouTube or Vimeo link' },
    },
    {
      name: 'audioUrl',
      type: 'text',
      label: 'Audio URL',
      admin: { description: 'Direct MP3 link' },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};
