import type { CollectionConfig } from 'payload'

export const EventRegistrations: CollectionConfig = {
  slug: 'event-registrations',
  admin: { useAsTitle: 'name' },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    { name: 'event', type: 'relationship', relationTo: 'events', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'numberOfAttendees', type: 'number', defaultValue: 1 },
    { name: 'notes', type: 'textarea' },
  ],
}
