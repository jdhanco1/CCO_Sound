import type { CollectionConfig } from 'payload'

export const MissionPartners: CollectionConfig = {
  slug: 'mission-partners',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { description: 'URL-friendly identifier, e.g. "partner-name"' },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'Short description shown on the Missions page card (1-2 sentences)' },
    },
    {
      name: 'description',
      type: 'richText',
      admin: { description: 'Full description shown in the modal when clicking a partner card' },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'partnerUrl',
      type: 'text',
      admin: { description: 'External link to the partner organization (e.g. their website)' },
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
