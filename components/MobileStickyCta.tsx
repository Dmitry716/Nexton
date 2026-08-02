"use client";

import { Phone, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MobileStickyCta() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Скрываем на странице блога и страницах статей
  const isBlogPage = pathname?.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Показываем кнопки когда скроллим вверх или в самом верху
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Прячем при скролле вниз (после 100px)
        setIsVisible(false);
      } else {
        // Показываем при скролле вверх
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Если страница блога - не показываем
  if (isBlogPage) return null;

  return (
    <div
      className={`md:hidden fixed left-4 right-4 z-40 transition-all duration-500 ease-in-out ${
        isVisible
          ? "bottom-6 opacity-100 translate-y-0"
          : "bottom-0 opacity-0 translate-y-12 pointer-events-none"
      }`}
    >
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-black/95 backdrop-blur px-3 py-3 shadow-2xl">
        <a
          href="tel:+375297115091"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white dark:bg-white dark:text-black px-4 py-3.5 text-sm font-semibold transition-transform active:scale-95"
          aria-label="Позвонить в Nexton"
        >
          <Phone size={16} />
          Позвонить
        </a>
        <a
          href="https://t.me/+375297115091"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 text-black dark:text-white px-4 py-3.5 text-sm font-semibold transition-transform active:scale-95"
          aria-label="Написать в Telegram"
        >
          <Send size={16} />
          Telegram
        </a>
      </div>
    </div>
  );
}
