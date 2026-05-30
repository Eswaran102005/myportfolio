/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/myportfolio',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
