import Image from "next/image";
import { getDetailingGallery } from "@/data/detailing";

type Props = {
  slug: string;
  serviceName: string;
};

const LABELS = ["До", "После", "Процесс", "Результат"] as const;

export default function DetailingGallery({ slug, serviceName }: Props) {
  const photos = getDetailingGallery(slug, 4);

  return (
    <section
      className="mb-16"
      aria-labelledby="detailing-gallery-title"
    >
      <h2
        id="detailing-gallery-title"
        className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 text-center"
      >
        Фото до / после — {serviceName}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {photos.map((src, i) => (
          <figure
            key={src}
            className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900"
          >
            <Image
              src={src}
              alt={`${LABELS[i] ?? `Фото ${i + 1}`}: ${serviceName}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <figcaption className="absolute left-3 bottom-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/65 text-white">
              {LABELS[i] ?? `Фото ${i + 1}`}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
