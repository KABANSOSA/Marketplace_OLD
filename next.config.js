/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@tanstack/react-query']
  }
}

module.exports = nextConfig 