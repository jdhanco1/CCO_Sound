import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'author', type: 'text', required: true },
    { name: 'publishedDate', type: 'date', required: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
  ],
}
