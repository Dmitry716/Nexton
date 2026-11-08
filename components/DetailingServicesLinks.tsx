import Link from "next/link";
import { detailingServices } from "@/data/detailing";

interface Props {
  /** Текущий город (slug) — ссылки будут на этот город */
  city: string;
  /** Заголовок секции */
  title?: string;
  /** Исключить текущую услугу (чтобы не было self-link) */
  excludeSlug?: string;
}

export default function DetailingServicesLinks({
  city,
  title = "Все услуги детейлинга",
  excludeSlug,
}: Props) {
  const services = detailingServices.filter((s) => s.slug !== excludeSlug);

  return (
    <section aria-labelledby="all-services-title" className="mb-16">
      <h2
        id="all-services-title"
        className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 text-center"
      >
        {title}
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/detailing/${city}/${service.slug}`}
            className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] focus-visible:ring-offset-2"
          >
            {service.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
