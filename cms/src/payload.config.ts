import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

// Collections
import { Media } from './collections/Media';
import { StaffMembers } from './collections/StaffMembers';
import { Elders } from './collections/Elders';
import { Ministries } from './collections/Ministries';
import { Sermons } from './collections/Sermons';
import { BlogPosts } from './collections/BlogPosts';
import { Events } from './collections/Events';
import { ContactSubmissions } from './collections/ContactSubmissions';
import { EventRegistrations } from './collections/EventRegistrations';

// Globals
import { HomePage } from './globals/HomePage';
import { MissionPage } from './globals/MissionPage';

export default buildConfig({
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: ' — CCO Admin',
      favicon: '/favicon.ico',
    },
  },
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgres://payload:payload@localhost:5432/cco_cms',
    },
  }),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [
        { name: 'name', type: 'text' },
        { name: 'role', type: 'select', options: ['admin', 'editor'], defaultValue: 'editor' },
      ],
    },
    Media,
    StaffMembers,
    Elders,
    Ministries,
    Sermons,
    BlogPosts,
    Events,
    ContactSubmissions,
    EventRegistrations,
  ],
  globals: [HomePage, MissionPage],
  cors: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
  csrf: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  upload: {
    limits: { fileSize: 10_000_000 }, // 10 MB
  },
});
