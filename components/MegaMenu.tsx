"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Send } from "lucide-react";
import { detailingServices } from "@/data/detailing";
import { services } from "@/data/services";

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Берем первые 8 услуг автосервиса и 6 услуг детейлинга
  const mainServices = services.slice(0, 8);
  const detailing = detailingServices.slice(0, 6);

  // Плавное открытие (без задержки)
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  // Плавное закрытие (с задержкой 150мс), чтобы меню не пропадало, если мышка чуть соскользнула
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative py-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Кнопка "Услуги" в шапке */}
      <Link
        href="/#services"
        onClick={() => setIsOpen(false)}
        className="whitespace-nowrap text-[14px] xl:text-[15px] 2xl:text-base font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 relative flex items-center gap-1"
      >
        Услуги
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </Link>

      {/* 
        Выпадающее меню.
        top-[120px] — идеальная высота, чтобы меню выезжало ровно под шапкой и не перекрывало её.
        fixed + left-1/2 + -translate-x-1/2 = строго по центру экрана.
      */}
      <div
        className={`fixed top-[120px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1400px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out origin-top z-50 ${
          isOpen
            ? "opacity-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 -translate-y-2 invisible pointer-events-none"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Колонка 1: Автосервис */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              Автосервис
            </h3>
            <ul className="space-y-3">
              {mainServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/polotsk/usluga/${service.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-colors leading-snug"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#services"
                  onClick={() => setIsOpen(false)}
                  className="inline-block mt-4 text-base font-bold text-[#1e3a5f] dark:text-[#7a9bcb] hover:underline"
                >
                  Все услуги →
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 2: Детейлинг */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              Детейлинг
            </h3>
            <ul className="space-y-3">
              {detailing.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/detailing/polotsk/${service.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-colors leading-snug"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/detailing"
                  onClick={() => setIsOpen(false)}
                  className="inline-block mt-4 text-base font-bold text-[#1e3a5f] dark:text-[#7a9bcb] hover:underline"
                >
                  Весь детейлинг →
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Промо-блок */}
          <div className="md:col-span-4 bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                Нужна помощь с выбором?
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Не знаете, какая услуга нужна? Мы работаем по всей Беларуси.
                Позвоните или напишите — подскажем и рассчитаем стоимость.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="tel:+375297115091"
                className="inline-flex items-center justify-center px-5 py-3 bg-[#1e3a5f] text-white text-base font-semibold rounded-lg hover:bg-[#2b4c7c] transition-colors w-full"
              >
                +375 (29) 711-50-91
              </a>
              <a
                href="https://t.me/+375297115091"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-[#1e3a5f] dark:border-[#7a9bcb] text-[#1e3a5f] dark:text-[#7a9bcb] hover:bg-[#1e3a5f] dark:hover:bg-[#7a9bcb] hover:text-white dark:hover:text-black text-base font-semibold rounded-lg transition-colors w-full"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
