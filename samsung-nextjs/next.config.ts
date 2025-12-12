import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.media-amazon.com'
      }
    ]
  }
}

export default bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig)
