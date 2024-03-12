/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
    },
  },
  images: {
    domains : [
      "lh3.googleusercontent.com"
    ]
  }
};

export default nextConfig;
