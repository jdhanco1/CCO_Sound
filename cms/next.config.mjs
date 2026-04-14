import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal self-contained bundle for Docker / Railway
  output: 'standalone',
}

export default withPayload(nextConfig)
