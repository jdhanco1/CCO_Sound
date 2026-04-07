import type { CollectionConfig } from 'payload'

export const Ministries: CollectionConfig = {
  slug: 'ministries',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'leader', type: 'text' },
    { name: 'meetingTime', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
