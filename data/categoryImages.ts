import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Тематические изображения для категорий услуг.
 * Lamborghini Huracan, Porsche 911, Bugatti Chiron. Источник: Unsplash.
 */
export const categoryImages: Record<string, string> = {
  avtokondicionery:
    "https://images.unsplash.com/photo-1742800074526-cc655bf036a4?w=800&h=500&fit=crop",
  otopiteli:
    "https://images.unsplash.com/photo-1626280473666-6e223e17058f?w=800&h=500&fit=crop",
  radiatory:
    "https://images.unsplash.com/photo-1743038051885-e33faab41b87?w=800&h=500&fit=crop",
  svarka:
    "https://images.unsplash.com/photo-1742800074526-cc655bf036a4?w=800&h=500&fit=crop",
  gruzovye:
    "/images/gruzovye.png",
  pnevmosistemy_legkovyh:
    "https://images.unsplash.com/photo-1626280473666-6e223e17058f?w=800&h=500&fit=crop",
  plastik:
    "https://images.unsplash.com/photo-1743038051885-e33faab41b87?w=800&h=500&fit=crop",
};

/** Уменьшенные версии для карточек (быстрая загрузка) */
export const categoryImageThumbs: Record<string, string> = {
  avtokondicionery:
    "https://images.unsplash.com/photo-1742800074526-cc655bf036a4?w=600&h=400&fit=crop",
  otopiteli:
    "https://images.unsplash.com/photo-1626280473666-6e223e17058f?w=600&h=400&fit=crop",
  radiatory:
    "https://images.unsplash.com/photo-1743038051885-e33faab41b87?w=600&h=400&fit=crop",
  svarka:
    "https://images.unsplash.com/photo-1742800074526-cc655bf036a4?w=600&h=400&fit=crop",
  gruzovye:
    "/images/gruzovye.png",
  pnevmosistemy_legkovyh:
    "https://images.unsplash.com/photo-1626280473666-6e223e17058f?w=600&h=400&fit=crop",
  plastik:
    "https://images.unsplash.com/photo-1743038051885-e33faab41b87?w=600&h=400&fit=crop",
};

function getLocalCategoryImagePath(categoryId: string, thumb = false) {
  const filename = thumb ? `${categoryId}-thumb.webp` : `${categoryId}.webp`;
  const absolutePath = join(process.cwd(), "public", "images", "categories", filename);
  if (!existsSync(absolutePath)) return null;
  // Защита от слишком маленьких заглушек/битых файлов.
  // Если файл меньше 1KB, используем remote fallback.
  if (statSync(absolutePath).size < 1024) return null;
  return `/images/categories/${filename}`;
}

/**
 * Возвращает изображение категории:
 * 1) локальный WebP из /public/images/categories (если существует),
 * 2) текущий URL из categoryImages.
 */
export function getCategoryImage(categoryId: string) {
  return getLocalCategoryImagePath(categoryId, false) || categoryImages[categoryId] || null;
}

/**
 * Возвращает превью категории:
 * 1) локальный WebP-thumb из /public/images/categories (если существует),
 * 2) URL из categoryImageThumbs.
 */
export function getCategoryImageThumb(categoryId: string) {
  return getLocalCategoryImagePath(categoryId, true) || categoryImageThumbs[categoryId] || null;
}
