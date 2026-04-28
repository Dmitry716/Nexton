# Local Category Images

This folder allows you to override category images without code changes.

The app first checks local files in `public/images/categories/`.
If a file exists, it is used. If not, the existing remote fallback URL is used.

## File naming

For full-size image:

- `avtokondicionery.webp`
- `otopiteli.webp`
- `radiatory.webp`
- `svarka.webp`
- `gruzovye.webp`
- `pnevmosistemy_legkovyh.webp`
- `plastik.webp`

For card thumbnail image:

- `avtokondicionery-thumb.webp`
- `otopiteli-thumb.webp`
- `radiatory-thumb.webp`
- `svarka-thumb.webp`
- `gruzovye-thumb.webp`
- `pnevmosistemy_legkovyh-thumb.webp`
- `plastik-thumb.webp`

## Placeholder files

This folder already contains minimal placeholder `.webp` files with correct names.
Replace them with your real images and keep the same filenames.
## Recommended formats

- Full image: `800x500` (WebP)
- Thumbnail: `600x400` (WebP)

## Quick workflow

1. Export images to WebP using names above.
2. Copy files into this folder.
3. Redeploy (or restart local dev server).
