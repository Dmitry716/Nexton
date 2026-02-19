import Link from "next/link";
import { Service } from "@/data/services";
import { Thermometer } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="card p-6 hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Анимированная линия сверху */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      {/* Иконка с анимацией */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Thermometer className="w-5 h-5 text-blue-500 animate-pulse" />
      </div>

      {/* Контент */}
      <div className="relative">
        <h3 className="text-xl font-bold mb-3 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {service.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          {service.description}
        </p>
        <Link
          href={`/usluga/${service.slug}`}
          className="inline-block px-5 py-2.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm font-medium relative overflow-hidden group/btn"
        >
          <span className="relative z-10">ПОДРОБНО</span>
          <div className="absolute inset-0 bg-black dark:bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
      </div>
    </div>
  );
}