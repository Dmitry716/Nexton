import { services } from "@/data/services";
import { cities } from "@/data/cities";
import type { MetadataRoute } from "next";

const BASE_URL = "https://nexton.vip";

/** Commercial priority for Polotsk/Novopolotsk twin market. */
const PRIORITY_SERVICE_SLUGS = new Set([
  "zapravka-kondicionera",
  "remont-kondicionera-utechki",
  "payka-trubok-kondicionera",
  "zamena-kompressora",
  "remont-otopiteley",
  "diagnostika-otopiteley",
  "remont-radiatora-ohlazhdeniya",
  "remont-radiatora-pechki",
  "promyvka-radiatorov",
  "diagnostika-podveski-vibrostend",
  "pokraska-kuzova",
  "remont-bampera",
  "bespokrasochnoe-udalenie-vmyatin",
  "vosstanovlenie-geometrii-kuzova",
]);

/** Antikor tiers → prefer landing hub; keep usluga indexable but lower. */
const ANTIKOR_TIER_SLUGS = new Set([
  "obrabotka-skrytyh-polostej",
  "antikor-dnishcha-arok",
  "antikorrozijnaya-obrabotka-kompleks",
]);

function cityPriority(slug: string): number {
  if (slug === "polotsk" || slug === "novopolotsk") return 0.95;
  if (slug === "vitebsk" || slug === "minsk") return 0.85;
  return 0.75;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/payment`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // /usluga/* только редирект — низкий приоритет, каноникал на /polotsk/usluga/*
  const serviceRedirectPages: MetadataRoute.Sitemap = services.map(
    (service) => ({
      url: `${BASE_URL}/usluga/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.2,
    }),
  );

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: cityPriority(city.slug),
  }));

  const landing = (
    path: string,
    priority = 0.9,
  ): MetadataRoute.Sitemap =>
    cities.map((city) => ({
      url: `${BASE_URL}/${city.slug}/${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority:
        city.slug === "polotsk" || city.slug === "novopolotsk"
          ? priority
          : priority - 0.1,
    }));

  const kuzovnyePages = landing("kuzovnoy-remont", 0.9);
  const kitayskiePages = landing("remont-kitayskih-avto", 0.88);
  const vebastoPages = landing("remont-vebasto", 0.92);
  const antikorPages = landing("antikorrozijnaya-obrabotka", 0.92);
  // Catalog page — city hub owns «автосервис» intent
  const avtoservisPages = landing("avtoservis", 0.45);

  const cityServicePages: MetadataRoute.Sitemap = [];
  for (const city of cities) {
    const base = cityPriority(city.slug);
    for (const service of services) {
      const boost = PRIORITY_SERVICE_SLUGS.has(service.slug)
        ? 0.05
        : ANTIKOR_TIER_SLUGS.has(service.slug)
          ? -0.15
          : 0;
      cityServicePages.push({
        url: `${BASE_URL}/${city.slug}/usluga/${service.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: Math.max(
          0.3,
          Math.min(0.95, base - 0.15 + boost),
        ),
      });
    }
  }

  return [
    ...staticPages,
    ...cityPages,
    ...kuzovnyePages,
    ...kitayskiePages,
    ...vebastoPages,
    ...antikorPages,
    ...avtoservisPages,
    ...cityServicePages,
    ...serviceRedirectPages,
  ];
}
