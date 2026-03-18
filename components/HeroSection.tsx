import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import VideoBackground from "./VideoBackground";

// Hero-video: используем локальный файл (внешние CDN часто блокируют хотлинк/автоплей).
// Положите видео сюда: public/videos/hero-bugatti.mp4
const HERO_VIDEO = "/videos/hero-bugatti.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1743038051885-e33faab41b87?w=1920&h=1080&fit=crop";

export default function HeroSection() {
  return (
    <section className="relative bg-white dark:bg-black min-h-[620px] flex items-center border-b border-gray-200 dark:border-gray-800 overflow-hidden">
      <VideoBackground
        videoSrc={HERO_VIDEO}
        posterSrc={HERO_POSTER}
        opacity={0.35}
      />
      <div className="absolute inset-0 bg-white/25 dark:bg-black/35 z-5" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        <div className="text-center">
          {/* Бейдж */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-sm font-medium text-black dark:text-white mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <ShieldCheck className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb]" />
            <span>Гарантия до 6 месяцев · Полоцк и Новополоцк</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-black dark:text-white tracking-tight">
            <span className="inline-block animate-slide-left">
              Заправка и ремонт кондиционеров,
            </span>
            <span
              className="block text-2xl sm:text-3xl md:text-4xl mt-3 text-gray-800 dark:text-gray-200 animate-slide-left"
              style={{ animationDelay: "0.2s" }}
            >
              ремонт вебасто и систем охлаждения авто в Полоцке и Новополоцке
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-4 max-w-3xl mx-auto font-medium animate-slide-right leading-relaxed"
            style={{ animationDelay: "0.4s" }}
          >
            Профессиональный ремонт, диагностика и обслуживание систем
            охлаждения, кондиционеров и автономных отопителей.
          </p>
          <p
            className="text-base text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto animate-slide-right"
            style={{ animationDelay: "0.5s" }}
          >
            Работаем с легковыми и грузовыми авто. Цены в BYN, без скрытых доплат.
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-2 border-transparent shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Наши услуги
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#contacts"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent dark:from-black/35 dark:via-transparent dark:to-transparent pointer-events-none" />
    </section>
  );
}
