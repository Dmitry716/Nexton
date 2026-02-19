import { services } from '@/data/services';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexton.vip';
  
  // Основные страницы
  const routes = [
    '',
    '/#services',
    '/#about',
    '/#contacts',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  // Страницы услуг
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/usluga/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...serviceRoutes];
}