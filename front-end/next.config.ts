import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/chatbot',
        destination: 'http://20.246.142.181/chatbot',
      },
    ]
  },
}

export default nextConfig