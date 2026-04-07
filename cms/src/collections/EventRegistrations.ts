import { CollectionConfig } from 'payload/types';

export const EventRegistrations: CollectionConfig = {
  slug: 'event-registrations',
  admin: {
    useAsTitle: 'name',
    group: 'Forms',
    defaultColumns: ['name', 'email', 'event', 'createdAt'],
    description: 'Event registration submissions from the website',
  },
  access: {
    read: () => true,
    create: () => true, // Allow anonymous form submissions
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
  ],
};
