import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VideoBackground from "./VideoBackground";

export default function HeroSection() {
  return (
    <section className="relative bg-white dark:bg-black min-h-[600px] flex items-center border-b border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Видео фон - сделаем ярче на темной теме */}
      <VideoBackground videoSrc="/videos/hero-bg.mp4" opacity={0.35} />

      {/* Затемнение - убираем сильное затемнение */}
      <div className="absolute inset-0 bg-white/20 dark:bg-black/30 z-5" />

      {/* Контейнер для текста БЕЗ рамки, только легкая полупрозрачность */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <div className="text-center">
          {/* Заголовок с анимацией слева направо - ОБНОВЛЕН */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-black dark:text-white">
            <span className="inline-block animate-slide-left">
              Ремонт кондиционеров,
            </span>
            <span
              className="block text-3xl md:text-4xl mt-3 text-gray-800 dark:text-gray-200 animate-slide-left"
              style={{ animationDelay: "0.2s" }}
            >
              вебасто и системы охлаждения авто в Полоцке
            </span>
          </h1>

          {/* Описание с анимацией справа налево */}
          <p
            className="text-xl text-gray-800 dark:text-gray-200 mb-10 max-w-3xl mx-auto font-medium animate-slide-right"
            style={{ animationDelay: "0.4s" }}
          >
            Профессиональный ремонт, диагностика и обслуживание систем
            охлаждения, кондиционеров, автономных отопителей.
          </p>

          {/* Кнопки с анимацией появления */}
          <div
            className="flex flex-wrap gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Link
              href="#services"
              className="btn-primary bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-2 border-transparent shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Наши услуги
              <ArrowRight className="inline ml-2" size={20} />
            </Link>
            <Link
              href="#contacts"
              className="btn-outline border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>

      {/* Градиент для глубины */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent dark:from-black/30 dark:via-transparent dark:to-transparent pointer-events-none" />
    </section>
  );
}
