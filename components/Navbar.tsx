"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { Menu, X, Phone, Send } from "lucide-react";
import VkIcon from "@/components/icons/VkIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import YoutubeIcon from "@/components/icons/YoutubeIcon";
import WorkTimeStatus from "@/components/WorkTimeStatus";

type MenuItem = { name: string; href: string; shortName?: string };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Полные названия — в мобильном меню; shortName — в десктопной строке (без переносов)
  const menuItems: MenuItem[] = [
    { name: "Главная", href: "/", shortName: "Главная" },
    { name: "Услуги", href: "/#services" },
    { name: "Блог", href: "/blog" },
    {
      name: "Кузовной ремонт",
      href: "/polotsk/kuzovnoy-remont",
      shortName: "Кузов",
    },
    {
      name: "Ремонт вебасто",
      href: "/polotsk/remont-vebasto",
      shortName: "Вебасто",
    },
    {
      name: "Китайские авто",
      href: "/polotsk/remont-kitayskih-avto",
      shortName: "Китайские",
    },
    { name: "О нас", href: "/#about" },
    { name: "Контакты", href: "/#contacts" },
  ];

  // На десктопе «Главная» не нужна — есть логотип
  const desktopItems = menuItems.filter((item) => item.href !== "/");

  const linkClass =
    "shrink-0 whitespace-nowrap text-sm xl:text-base text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 font-medium relative group";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md border-gray-200 dark:border-gray-800 py-3"
          : "bg-white dark:bg-black border-gray-200 dark:border-gray-800 py-4"
      }`}
      role="navigation"
      aria-label="Главное меню"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          <Link
            href="/"
            className="relative group outline-none focus:outline-none shrink-0"
            aria-label="Автосервис Nexton — главная страница"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-300 to-gray-100 dark:from-gray-400 dark:to-gray-600 rounded-lg blur-xl opacity-0 group-hover:opacity-40 transition-all duration-700" />
            <span className="relative text-2xl lg:text-3xl font-bold text-black dark:text-white transition-all duration-500 transform group-hover:scale-105 inline-block">
              NEXTON
            </span>
            <span className="sr-only">Автосервис в Полоцке и Новополоцке</span>
          </Link>

          {/* Десктоп с xl: иначе длинное меню ломает строку */}
          <div className="hidden xl:flex items-center gap-5 min-w-0">
            {desktopItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={linkClass}
                title={item.name}
              >
                {item.shortName ?? item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <div className="flex items-center gap-1 ml-2 pl-4 border-l border-gray-200 dark:border-gray-700 shrink-0">
              <a
                href="https://t.me/+375297115091"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 text-black dark:text-white hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-colors duration-300" />
              </a>
              <a
                href="https://vk.com/club164841898"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Группа ВКонтакте"
              >
                <VkIcon className="w-5 h-5 text-black dark:text-white hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-colors duration-300" />
              </a>
              <a
                href="https://www.instagram.com/nextonservice/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5 text-black dark:text-white hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-colors duration-300" />
              </a>
              <a
                href="https://youtube.com/@nextonlife?si=cKMyhJcID9OWUFKQ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Наш YouTube канал"
              >
                <YoutubeIcon className="w-5 h-5 text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300" />
              </a>
            </div>

            <ThemeSwitcher />
          </div>

          {/* До xl — бургер (раньше был md, места не хватало) */}
          <div className="xl:hidden flex items-center space-x-2 shrink-0">
            <a
              href="https://vk.com/club164841898"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              aria-label="ВКонтакте"
            >
              <VkIcon className="w-5 h-5 text-black dark:text-white" />
            </a>
            <a
              href="https://www.instagram.com/nextonservice/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full hidden sm:inline-flex"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5 text-black dark:text-white" />
            </a>
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800"
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="xl:hidden py-4 border-t border-gray-200 dark:border-gray-800 mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium border-b border-gray-100 dark:border-gray-900 last:border-0 hover:pl-2 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Свяжитесь с нами:
              </p>
              <div className="flex flex-col space-y-2">
                <a
                  href="tel:+375297115091"
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-all duration-300 hover:pl-2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Позвонить по номеру +375 29 711-50-91"
                >
                  <Phone size={18} />
                  <span>+375 (29) 711-50-91</span>
                </a>
                <a
                  href="https://t.me/+375297115091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-all duration-300 hover:pl-2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Написать в Telegram"
                >
                  <Send size={18} />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://vk.com/club164841898"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-all duration-300 hover:pl-2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Группа ВКонтакте"
                >
                  <VkIcon width={18} height={18} />
                  <span>ВКонтакте</span>
                </a>
                <a
                  href="https://youtube.com/@nextonlife?si=cKMyhJcID9OWUFKQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-all duration-300 hover:pl-2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Наш YouTube канал"
                >
                  <YoutubeIcon size={18} />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://www.instagram.com/nextonservice/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-all duration-300 hover:pl-2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Instagram"
                >
                  <InstagramIcon width={18} height={18} />
                  <span>Instagram</span>
                </a>
              </div>
              <WorkTimeStatus className="mt-4" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
