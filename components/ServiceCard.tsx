import Link from "next/link";
import { Service } from "@/data/services";
import { Thermometer } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className="card p-4 sm:p-6 hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 group relative overflow-hidden focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white focus-within:ring-offset-2 h-full flex flex-col"
      aria-labelledby={`service-title-${service.id}`}
    >
      {/* Анимированная линия сверху - с синим акцентом */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1e3a5f] to-[#2b4c7c] dark:from-[#7a9bcb] dark:to-[#5a7bb0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Иконка с анимацией */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Thermometer
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#1e3a5f] dark:text-[#7a9bcb] animate-pulse"
          aria-hidden="true"
        />
      </div>

      {/* Контент с flex-1 для равномерной высоты */}
      <div className="relative flex-1 flex flex-col">
        <h3
          id={`service-title-${service.id}`}
          className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors break-words pr-8"
        >
          {service.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-5 leading-relaxed break-words flex-1">
          {service.description}
        </p>

        {/* Кнопка */}
        <Link
          href={`/usluga/${service.slug}`}
          className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-[#1e3a5f] dark:border-[#7a9bcb] rounded-lg text-[#1e3a5f] dark:text-[#7a9bcb] hover:bg-[#1e3a5f] hover:text-white dark:hover:bg-[#7a9bcb] dark:hover:text-black transition-all duration-300 text-xs sm:text-sm font-medium relative overflow-hidden group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] focus-visible:ring-offset-2 w-fit"
          aria-label={`Подробнее об услуге: ${service.name}`}
        >
          <span className="relative z-10">ПОДРОБНО</span>
          <div className="absolute inset-0 bg-[#1e3a5f] dark:bg-[#7a9bcb] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left opacity-20" />
        </Link>
      </div>

      {/* Скрытое описание для скринридеров */}
      <span className="sr-only">
        {service.name} - {service.description}. Нажмите для перехода на страницу
        с подробной информацией об услуге.
      </span>
    </article>
  );
}
