/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['glyphwiki.org'],
  },
}

module.exports = nextConfig
