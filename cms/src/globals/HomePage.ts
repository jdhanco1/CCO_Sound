import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: { read: () => true },
  fields: [
    { name: 'heroTitle', type: 'text', required: true },
    { name: 'heroSubtitle', type: 'text' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroButtonText', type: 'text' },
    { name: 'heroButtonLink', type: 'text' },
    {
      name: 'welcomeSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'content', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'announcements',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'textarea' },
        { name: 'link', type: 'text' },
        { name: 'date', type: 'date' },
      ],
    },
    {
      name: 'servicesTimes',
      type: 'array',
      fields: [
        { name: 'day', type: 'text', required: true },
        { name: 'time', type: 'text', required: true },
        { name: 'description', type: 'text' },
      ],
    },
  ],
}
