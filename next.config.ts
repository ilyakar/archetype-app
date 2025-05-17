import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  webpack: (config: any) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/app/components'),
        '@redux': path.resolve(__dirname, 'src/redux'),
        '@styles': path.resolve(__dirname, 'src/styles')
      }
    }
    return config
  }
}

export default nextConfig
