import type { GlobalConfig } from 'payload'

export const MissionPage: GlobalConfig = {
  slug: 'mission-page',
  access: { read: () => true },
  fields: [
    { name: 'heroTitle', type: 'text', required: true },
    { name: 'heroSubtitle', type: 'text' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'visionImages',
      type: 'group',
      label: 'Vision Section Images',
      fields: [
        { name: 'visionImage1', type: 'upload', relationTo: 'media', label: 'Vision Photo 1 (top, 4:3)' },
        { name: 'visionImage2', type: 'upload', relationTo: 'media', label: 'Vision Photo 2 (bottom, 16:9)' },
      ],
    },
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
