import type { CollectionConfig } from 'payload'

export const Ministries: CollectionConfig = {
  slug: 'ministries',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { description: 'URL-friendly identifier, e.g. "community-groups"' },
    },
    { name: 'summary', type: 'textarea', admin: { description: 'Short description shown on the Connect page card (1-2 sentences)' } },
    { name: 'description', type: 'richText', admin: { description: 'Full description shown on the ministry detail page' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'leader', type: 'text' },
    { name: 'contactEmail', type: 'email' },
    { name: 'meetingTime', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
