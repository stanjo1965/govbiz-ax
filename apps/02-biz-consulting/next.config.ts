import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@govbiz/krds-ui', '@govbiz/ai-sdk', '@govbiz/chat-ui', '@govbiz/auth'],
};

export default nextConfig;
