import type { NextConfig } from "next";

/** Кеш 24 часа для sitemap и robots (SEO-маршруты редко меняются) */
const SEO_CACHE = "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: SEO_CACHE }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: SEO_CACHE }],
      },
    ];
  },
};

export default nextConfig;
