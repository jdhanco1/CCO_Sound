import { GlobalConfig } from 'payload/types';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Hero Tagline',
      defaultValue: 'Come & be part of the Community',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Hero Subtitle',
    },
  ],
};
