import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { StaffMembers } from './collections/StaffMembers'
import { Elders } from './collections/Elders'
import { Ministries } from './collections/Ministries'
import { Sermons } from './collections/Sermons'
import { BlogPosts } from './collections/BlogPosts'
import { Events } from './collections/Events'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { EventRegistrations } from './collections/EventRegistrations'
import { HomePage } from './globals/HomePage'
import { MissionPage } from './globals/MissionPage'
import { PageHeroes } from './globals/PageHeroes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
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
  globals: [HomePage, MissionPage, PageHeroes],
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
})
