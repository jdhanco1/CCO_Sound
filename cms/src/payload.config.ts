import { buildConfig } from 'payload'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
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
import { SiteSettings } from './globals/SiteSettings'

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
  globals: [HomePage, MissionPage, PageHeroes, SiteSettings],
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  // Only initialise the email adapter when SMTP credentials are present.
  // Without this guard, Nodemailer logs a connection-timeout error on every
  // boot when the vars aren't set yet, even though email is non-critical.
  ...(process.env.SMTP_PASS ? {
    email: nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM || 'noreply@communityoxford.org',
      defaultFromName: process.env.SMTP_FROM_NAME || 'Community Church Oxford',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
  } : {}),
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
