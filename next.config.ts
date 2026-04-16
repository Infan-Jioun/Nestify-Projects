import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: 'lh3.googleusercontent.com',
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: 'avatars.githubusercontent.com',
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: 'images.unsplash.com',
        port: "",
        pathname: "/**"
      },


    ]

  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.ignoreWarnings = [
        { message: /Failed to parse source map/ },
        { message: /Invalid source map/ },
      ];
    }
    return config;
  },
};


export default nextConfig;
