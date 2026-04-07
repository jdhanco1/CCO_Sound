import type { GlobalConfig } from 'payload'

export const MissionPage: GlobalConfig = {
  slug: 'mission-page',
  access: { read: () => true },
  fields: [
    { name: 'heroTitle', type: 'text', required: true },
    { name: 'heroSubtitle', type: 'text' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'missionStatement', type: 'richText' },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'content', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'scriptureReference',
          type: 'group',
          fields: [
            { name: 'text', type: 'textarea' },
            { name: 'reference', type: 'text' },
          ],
        },
      ],
    },
  ],
}
