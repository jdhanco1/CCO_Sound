import type { CollectionConfig } from 'payload'

export const MerchItems: CollectionConfig = {
  slug: 'merch-items',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Short product description shown on the card' },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: { description: 'Display price in USD (e.g. 24.99)' },
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'purchaseUrl',
      type: 'text',
      required: true,
      admin: { description: 'External link where customers purchase this item' },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Apparel', value: 'apparel' },
        { label: 'Accessories', value: 'accessories' },
        { label: 'Drinkware', value: 'drinkware' },
        { label: 'Stickers & Decals', value: 'stickers' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'apparel',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show this item in the featured section at the top' },
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Uncheck to hide the item from the store page' },
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
