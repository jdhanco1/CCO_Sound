import { CollectionConfig } from 'payload/types';

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    group: 'Forms',
    defaultColumns: ['name', 'email', 'createdAt'],
    description: 'Contact form submissions from the website',
  },
  access: {
    read: () => true,
    create: () => true, // Allow anonymous form submissions
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea', required: true },
  ],
};
