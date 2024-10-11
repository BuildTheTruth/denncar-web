/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: ''
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/cars',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
