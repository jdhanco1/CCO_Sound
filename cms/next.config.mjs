import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // No standalone output — full node_modules are kept in the image so the
  // payload CLI can run migrations on startup.
}

export default withPayload(nextConfig)
