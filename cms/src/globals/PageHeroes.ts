import type { GlobalConfig } from 'payload'

const heroFields = [
  { name: 'heroTitle', type: 'text' as const },
  { name: 'heroSubtitle', type: 'text' as const },
  { name: 'heroImage', type: 'upload' as const, relationTo: 'media' as const },
]

export const PageHeroes: GlobalConfig = {
  slug: 'page-heroes',
  label: 'Page Heroes',
  access: { read: () => true },
  fields: [
    { name: 'leadership', type: 'group', label: 'Leadership Page', fields: heroFields },
    { name: 'sermons', type: 'group', label: 'Sermons Page', fields: heroFields },
    { name: 'events', type: 'group', label: 'Events Page', fields: heroFields },
    { name: 'contact', type: 'group', label: 'Contact Page', fields: heroFields },
    { name: 'connect', type: 'group', label: 'Connect Page', fields: heroFields },
    { name: 'blog', type: 'group', label: 'Blog Page', fields: heroFields },
    { name: 'mission', type: 'group', label: 'Mission Page', fields: heroFields },
    { name: 'store', type: 'group', label: 'Store Page', fields: heroFields },
  ],
}
