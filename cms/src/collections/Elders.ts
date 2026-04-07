import type { CollectionConfig } from 'payload'

export const Elders: CollectionConfig = {
  slug: 'elders',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'bio', type: 'textarea' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
