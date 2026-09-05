import type { NextConfig } from "next";

/** Кеш 24 часа для sitemap и robots (SEO-маршруты редко меняются) */
const SEO_CACHE =
  "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400";

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
  async redirects() {
    return [
      // ===== РЕДИРЕКТЫ ДЛЯ ПНЕВМОСИСТЕМ (НА ГЛАВНУЮ) =====
      {
        source: "/:city/usluga/obsluzhivanie-remont-pnevmosistem",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:city/usluga/remont-pnevmoballonov",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:city/usluga/remont-pnevmostoek",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:city/usluga/remont-pnevmo-podushek",
        destination: "/",
        permanent: true,
      },
      // Без города
      {
        source: "/usluga/obsluzhivanie-remont-pnevmosistem",
        destination: "/",
        permanent: true,
      },
      {
        source: "/usluga/remont-pnevmoballonov",
        destination: "/",
        permanent: true,
      },
      {
        source: "/usluga/remont-pnevmostoek",
        destination: "/",
        permanent: true,
      },
      {
        source: "/usluga/remont-pnevmo-podushek",
        destination: "/",
        permanent: true,
      },
      // ===== РЕДИРЕКТ ДЛЯ КУЗОВНЫХ РАБОТ =====
      {
        source: "/:city/kuzovnye-remont",
        destination: "/:city/kuzovnoy-remont",
        permanent: true,
      },
    ];
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
