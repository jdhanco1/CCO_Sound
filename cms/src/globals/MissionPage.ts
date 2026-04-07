import { GlobalConfig } from 'payload/types';

export const MissionPage: GlobalConfig = {
  slug: 'mission-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introduction Text',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Mission Sections',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        {
          name: 'scriptures',
          type: 'array',
          label: 'Scripture References',
          fields: [
            { name: 'reference', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
};
