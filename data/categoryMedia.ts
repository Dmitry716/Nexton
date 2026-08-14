/** Видео по разделам: услуги на сайте и статьи блога. */

/** Видео для карточек услуг и шапки страницы услуги (только тематические ролики). */
export const categoryVideos: Record<string, string> = {
  avtokondicionery: "/videos/blog/repair-ac.mp4",
  otopiteli: "/videos/blog/repair-webasto.mp4",
  radiatory: "/videos/blog/repair-radiator.mp4",
  kuzovnye: "/videos/blog/body-repair.mp4",
  kitayskie_avto: "/videos/blog/car-maintenance.mp4",
  diagnostika_podveski: "/videos/blog/car-maintenance.mp4",
};

export function getCategoryVideo(categoryId: string): string | null {
  return categoryVideos[categoryId] || null;
}

/** Видео в карточках блога на главной и на /blog. */
export const blogListVideos: Record<string, string> = {
  "Ремонт автокондиционеров": "/videos/blog/repair-ac.mp4",
  "Ремонт Webasto": "/videos/blog/repair-webasto.mp4",
  "Ремонт радиаторов": "/videos/blog/repair-radiator.mp4",
  "Советы автовладельцам": "/videos/blog/car-maintenance.mp4",
  "Кузовные работы": "/videos/blog/body-repair.mp4",
};

/** В открытой статье кузова — второй ролик, чтобы не повторять карточку. */
export const blogArticleVideos: Record<string, string> = {
  ...blogListVideos,
  "Кузовные работы": "/videos/blog/body-repair-1.mp4",
};

export function getBlogListVideo(category: string): string {
  return blogListVideos[category] || "/videos/blog/hero.mp4";
}

export function getBlogArticleVideo(category: string): string | null {
  return blogArticleVideos[category] || null;
}
