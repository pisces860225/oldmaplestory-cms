/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'cdn2.unrealengine.com',
      'ext.same-assets.com',
      'github.com',
      'raw.githubusercontent.com'
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil'
    })
    return config
  }
}

module.exports = nextConfig
