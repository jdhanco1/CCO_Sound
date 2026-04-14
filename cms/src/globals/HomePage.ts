import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: { read: () => true },
  fields: [
    { name: 'heroTitle', type: 'text', required: true, defaultValue: "WE'RE GLAD YOU'RE HERE" },
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
        { name: 'videoUrl', type: 'text', admin: { description: 'YouTube or Vimeo embed URL for the welcome section' } },
        {
          name: 'welcomeText',
          type: 'textarea',
          defaultValue: 'Whether you are looking for a church home, a place to visit while you\'re in the Oxford area, or a place to get plugged in while at Ole Miss, we hope you will consider Community Church Oxford.',
          admin: { description: 'Welcome paragraph shown beside the video' },
        },
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
