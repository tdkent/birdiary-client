import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
