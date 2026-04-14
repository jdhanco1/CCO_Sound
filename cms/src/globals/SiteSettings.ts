import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'Global site configuration including email notification recipients.',
  },
  fields: [
    {
      name: 'contactNotificationEmails',
      type: 'array',
      label: 'Contact Form Notification Emails',
      admin: {
        description:
          'Everyone listed here will receive an email whenever someone submits the Contact Us form.',
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email Address',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (optional)',
          admin: { description: 'e.g. "Pastor", "Office"' },
        },
      ],
    },
  ],
}
