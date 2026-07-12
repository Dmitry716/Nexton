// import { services } from "@/data/services";
// import { cities } from "@/data/cities";
// import type { MetadataRoute } from "next";
// import { statSync } from "node:fs";
// import { join } from "node:path";

// const BASE_URL = "https://nexton.vip";

// function getLastModified(): Date {
//   try {
//     const servicesPath = join(process.cwd(), "data", "services.ts");
//     return statSync(servicesPath).mtime;
//   } catch {
//     return new Date();
//   }
// }

// export default function sitemap(): MetadataRoute.Sitemap {
//   const lastModified = getLastModified();

//   // Статические страницы
//   const staticPages: MetadataRoute.Sitemap = [
//     {
//       url: BASE_URL,
//       lastModified,
//       changeFrequency: "daily",
//       priority: 1.0,
//     },
//     {
//       url: `${BASE_URL}/privacy`,
//       lastModified,
//       changeFrequency: "monthly",
//       priority: 0.3,
//     },
//   ];

//   // Страницы городов (9 городов)
//   const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
//     url: `${BASE_URL}/${city.slug}`,
//     lastModified,
//     changeFrequency: "weekly",
//     priority: 0.9,
//   }));

//   // Страницы услуг для каждого города (9 городов × все услуги)
//   const cityServicePages: MetadataRoute.Sitemap = [];
//   for (const city of cities) {
//     for (const service of services) {
//       cityServicePages.push({
//         url: `${BASE_URL}/${city.slug}/usluga/${service.slug}`,
//         lastModified,
//         changeFrequency: "weekly",
//         priority: 0.8,
//       });
//     }
//   }

//   return [...staticPages, ...cityPages, ...cityServicePages];
// }

import { services } from "@/data/services";
import { cities } from "@/data/cities";
import type { MetadataRoute } from "next";

const BASE_URL = "https://nexton.vip";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Статические страницы
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
  ];

  // Страницы услуг (без города)
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/usluga/${service.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Страницы городов
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Страницы услуг для каждого города
  const cityServicePages: MetadataRoute.Sitemap = [];
  for (const city of cities) {
    for (const service of services) {
      cityServicePages.push({
        url: `${BASE_URL}/${city.slug}/usluga/${service.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...servicePages, ...cityPages, ...cityServicePages];
}
