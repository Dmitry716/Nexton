import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop`;

/**
 * Удалённые фото на случай, если локального файла нет.
 * У каждой категории свой кадр — без повторов.
 */
export const categoryImages: Record<string, string> = {
  avtokondicionery: unsplash("photo-1601362840469-51e4d8d58785", 800, 500),
  otopiteli: unsplash("photo-1541888946425-d81bb19240f5", 800, 500),
  radiatory: unsplash("photo-1486262715619-67b85e0b08d3", 800, 500),
  svarka: unsplash("photo-1504328345606-18bbc8c9d7d1", 800, 500),
  gruzovye: "/images/gruzovye.png",
  pnevmosistemy_legkovyh: unsplash("photo-1617531653332-bd46c24f2068", 800, 500),
  plastik: unsplash("photo-1552519507-da3b142c6e3d", 800, 500),
  kuzovnye: unsplash("photo-1607860108855-64acf2078ed9", 800, 500),
  diagnostika_podveski: unsplash("photo-1487754180451-c456f719a1fc", 800, 500),
};

export const categoryImageThumbs: Record<string, string> = {
  avtokondicionery: unsplash("photo-1601362840469-51e4d8d58785", 600, 400),
  otopiteli: unsplash("photo-1541888946425-d81bb19240f5", 600, 400),
  radiatory: unsplash("photo-1486262715619-67b85e0b08d3", 600, 400),
  svarka: unsplash("photo-1504328345606-18bbc8c9d7d1", 600, 400),
  gruzovye: "/images/gruzovye.png",
  pnevmosistemy_legkovyh: unsplash("photo-1617531653332-bd46c24f2068", 600, 400),
  plastik: unsplash("photo-1552519507-da3b142c6e3d", 600, 400),
  kuzovnye: unsplash("photo-1607860108855-64acf2078ed9", 600, 400),
  diagnostika_podveski: unsplash("photo-1487754180451-c456f719a1fc", 600, 400),
};

function getLocalCategoryImagePath(categoryId: string, thumb = false) {
  const base = thumb ? `${categoryId}-thumb` : categoryId;
  const dir = join(process.cwd(), "public", "images", "categories");
  for (const ext of ["webp", "jpg", "jpeg", "png"] as const) {
    const filename = `${base}.${ext}`;
    const absolutePath = join(dir, filename);
    if (!existsSync(absolutePath)) continue;
    if (statSync(absolutePath).size < 1024) continue;
    return `/images/categories/${filename}`;
  }
  return null;
}

/**
 * Возвращает изображение категории:
 * 1) локальный WebP из /public/images/categories (если существует),
 * 2) текущий URL из categoryImages.
 */
export function getCategoryImage(categoryId: string) {
  return (
    getLocalCategoryImagePath(categoryId, false) ||
    categoryImages[categoryId] ||
    null
  );
}

/**
 * Возвращает превью категории:
 * 1) локальный WebP-thumb из /public/images/categories (если существует),
 * 2) URL из categoryImageThumbs.
 */
export function getCategoryImageThumb(categoryId: string) {
  return (
    getLocalCategoryImagePath(categoryId, true) ||
    getLocalCategoryImagePath(categoryId, false) ||
    categoryImageThumbs[categoryId] ||
    null
  );
}
