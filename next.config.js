/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.starbucks.fr',
      },
    ],
  },
}
module.exports = nextConfig

module.exports = {
  experimental: {
    serverActions: true,
  },
}
