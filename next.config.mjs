import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      's.sprunkiincredibox.games'
    ]
  }
};

if (process.env.NODE_ENV === "development") {
  // await setupDevPlatform();
}

export default nextConfig;
