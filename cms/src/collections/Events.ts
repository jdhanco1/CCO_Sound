import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'richText' },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    { name: 'time', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'registrationRequired', type: 'checkbox', defaultValue: false },
    { name: 'maxAttendees', type: 'number' },
    {
      name: 'links',
      type: 'array',
      label: 'Buttons / Links',
      admin: { description: 'Optional buttons shown on the event card (e.g. Sign Up, Learn More, View Map).' },
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Button Label' },
        { name: 'url', type: 'text', required: true, label: 'URL (use /path for internal pages, or full https:// for external)' },
      ],
    },
  ],
}
