/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['glyphwiki.org'],
    // or will overuser the vercel API
    unoptimized: true,
  },
}

module.exports = nextConfig
