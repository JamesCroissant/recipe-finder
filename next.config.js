/** @type {import(‘next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com', 'spoonacular.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma.client', 'bcryptjs'],
  },
}

  
module.exports = nextConfig