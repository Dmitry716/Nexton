import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import VideoBackground from "./VideoBackground";

interface HeroSectionProps {
  city?: string;
}

const HERO_VIDEO = "/videos/hero-bg.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1743038051885-e33faab41b87?w=1920&h=1080&fit=crop";

export default function HeroSection({
  city = "Полоцке и Новополоцке",
}: HeroSectionProps) {
  const cityText = city || "Полоцке и Новополоцке";
  const isHomeTwin = cityText === "Полоцке и Новополоцке";

  return (
    <section className="relative bg-white dark:bg-black min-h-[560px] sm:min-h-[620px] flex items-center border-b border-gray-200 dark:border-gray-800 overflow-hidden">
      <VideoBackground
        videoSrc={HERO_VIDEO}
        posterSrc={HERO_POSTER}
        opacity={0.35}
      />
      <div className="absolute inset-0 bg-white/30 dark:bg-black/40 z-[5]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 text-black dark:text-white tracking-tight animate-slide-left leading-[1.1]">
            Автосервис Nexton в {cityText}
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-right"
            style={{ animationDelay: "0.15s" }}
          >
            Климат, кузов и ходовая — в одном сервисе. С 2010 года, гарантия до
            6 месяцев.
          </p>

          <div
            className="flex flex-wrap gap-3 sm:gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            <Link
              href={isHomeTwin ? "/#services" : `#services`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg transition-all duration-300 font-semibold"
            >
              Смотреть услуги
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+375297115091"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-lg transition-all duration-300 font-semibold"
            >
              <Phone className="w-5 h-5" />
              +375 29 711-50-91
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent dark:from-black/40 pointer-events-none" />
    </section>
  );
}
