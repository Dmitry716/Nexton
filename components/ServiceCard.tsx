import Link from "next/link";
import { Service } from "@/data/services";
import { Thermometer } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className="card p-6 hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 group relative overflow-hidden focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white focus-within:ring-offset-2"
      aria-labelledby={`service-title-${service.id}`}
    >
      {/* Анимированная линия сверху */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Иконка с анимацией */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Thermometer
          className="w-5 h-5 text-blue-500 animate-pulse"
          aria-hidden="true"
        />
      </div>

      {/* Контент */}
      <div className="relative">
        <h3
          id={`service-title-${service.id}`}
          className="text-xl font-bold mb-3 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
        >
          {service.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* КНОПКА - СВЕТЛАЯ ОБВОДКА */}
        <Link
          href={`/usluga/${service.slug}`}
          className="inline-block px-5 py-2.5 border-2 border-gray-700 dark:border-gray-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black transition-all duration-300 text-sm font-medium relative overflow-hidden group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
          aria-label={`Подробнее об услуге: ${service.name}`}
        >
          <span className="relative z-10">ПОДРОБНО</span>
          <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
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
