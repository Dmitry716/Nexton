import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-white dark:bg-black py-28 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-black dark:text-white">
          Системы охлаждения
          <span className="block text-3xl md:text-4xl mt-3 text-gray-600 dark:text-gray-400">
            и автокондиционеры
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
          Профессиональный ремонт, диагностика и обслуживание систем охлаждения, 
          кондиционеров, автономных отопителей.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="#services"
            className="btn-primary"
          >
            Наши услуги
            <ArrowRight className="inline ml-2" size={20} />
          </Link>
          <Link
            href="#contacts"
            className="btn-outline"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </section>
  );
}