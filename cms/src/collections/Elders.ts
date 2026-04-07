import { CollectionConfig } from 'payload/types';

export const Elders: CollectionConfig = {
  slug: 'elders',
  admin: {
    useAsTitle: 'name',
    group: 'People',
    defaultColumns: ['name', 'title', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'title', type: 'text', defaultValue: 'Elder' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first' },
    },
  ],
};
