/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['moralis.io', 'cdn.sanity.io'],
  },
}

module.exports = nextConfig
