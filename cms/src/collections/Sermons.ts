import type { CollectionConfig } from 'payload'

export const Sermons: CollectionConfig = {
  slug: 'sermons',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'preacher', type: 'text', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'series', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'scriptureReference', type: 'text' },
    { name: 'audioUrl', type: 'text' },
    { name: 'videoUrl', type: 'text' },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
  ],
}
