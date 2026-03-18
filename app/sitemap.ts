import { services } from "@/data/services";
import type { MetadataRoute } from "next";
import { statSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = "https://nexton.vip";

function getLastModified(): Date {
  try {
    const servicesPath = join(process.cwd(), "data", "services.ts");
    return statSync(servicesPath).mtime;
  } catch {
    return new Date();
  }
}

/**
 * Sitemap содержит только реальные страницы (URL без hash).
 * Якоря (#avtokondicionery, #services и т.д.) — это секции главной страницы,
 * они не являются отдельными страницами для поисковиков.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = getLastModified();

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
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/usluga/${service.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}

