/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'placehold.co',
              port: '',
          },
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              port: '',
          }
      ],
  },
};

export default nextConfig;
