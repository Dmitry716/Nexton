import Link from "next/link";
import Image from "next/image";
import { Service } from "@/data/services";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  imageUrl?: string | null;
}

export default function ServiceCard({ service, imageUrl }: ServiceCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-xl hover:shadow-[#1e3a5f]/10 dark:hover:shadow-[#7a9bcb]/10 transition-all duration-300 flex flex-col h-full focus-within:ring-2 focus-within:ring-[#1e3a5f] dark:focus-within:ring-[#7a9bcb] focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-black"
      aria-labelledby={`service-title-${service.id}`}
    >
      {/* Изображение услуги */}
      {imageUrl && (
        <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="relative flex-1 flex flex-col p-5 sm:p-6">
        <h3
          id={`service-title-${service.id}`}
          className="text-lg sm:text-xl font-bold mb-2 text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors"
        >
          {service.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-5">
          {service.description}
        </p>

        <Link
          href={`/usluga/${service.slug}`}
          className="inline-flex items-center gap-2 text-[#1e3a5f] dark:text-[#7a9bcb] font-semibold text-sm hover:gap-3 transition-all duration-300 focus:outline-none focus-visible:underline"
          aria-label={`Подробнее: ${service.name}`}
        >
          <span>Подробнее</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <span className="sr-only">
        {service.name} — {service.description}. Перейти на страницу услуги.
      </span>
    </article>
  );
}
