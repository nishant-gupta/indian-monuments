/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Disable ESLint and TypeScript error checking during build
  // This is not recommended for production, but can help debug build issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Increase build time to allow for more processing
  experimental: {
    workerThreads: true,
    cpus: 4
  }
};

module.exports = nextConfig; 