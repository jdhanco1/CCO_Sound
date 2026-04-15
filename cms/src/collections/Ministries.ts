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
    {
      name: 'type',
      type: 'select',
      defaultValue: 'serve_area',
      options: [
        { label: 'Ministry Card (Get Involved grid)', value: 'ministry_card' },
        { label: 'Serve Area', value: 'serve_area' },
        { label: 'Community Group', value: 'community_group' },
      ],
      admin: { description: 'Controls which section of the Get Involved page this appears in.' },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Short subtitle shown on the card and in the modal (e.g. "Do life together")' },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: { description: 'If set, clicking the card opens this URL in a new tab instead of a modal (e.g. ChurchBuilder volunteer signup link).' },
    },
    {
      name: 'accentColor',
      type: 'select',
      defaultValue: 'accent',
      options: [
        { label: 'Gold (brand)', value: 'brand' },
        { label: 'Blue (accent)', value: 'accent' },
        { label: 'Sky Blue', value: 'sky' },
        { label: 'Purple', value: 'purple' },
        { label: 'Indigo', value: 'indigo' },
        { label: 'Amber', value: 'amber' },
        { label: 'Teal', value: 'teal' },
        { label: 'Rose', value: 'rose' },
      ],
      admin: { description: 'Accent color for the card top bar and modal.' },
    },
  ],
}
