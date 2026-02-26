"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { Menu, X, Phone, Send } from "lucide-react";

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

  const menuItems = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "#services" },
    { name: "О нас", href: "#about" },
    { name: "Контакты", href: "#contacts" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md border-gray-200 dark:border-gray-800 py-3"
          : "bg-white dark:bg-black border-gray-200 dark:border-gray-800 py-5"
      }`}
      role="navigation"
      aria-label="Главное меню"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* ЛОГОТИП С БОЛЕЕ СВЕТЛЫМ СВЕЧЕНИЕМ */}
          <Link
            href="/"
            className="relative group outline-none focus:outline-none"
            aria-label="Nexton - главная страница"
          >
            {/* Свечение - теперь светлее и нежнее */}
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-300 to-gray-100 dark:from-gray-400 dark:to-gray-600 rounded-lg blur-xl opacity-0 group-hover:opacity-40 group-focus:opacity-40 transition-all duration-700 ease-in-out"></div>

            {/* Дополнительный эффект - тоже светлее */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 dark:to-transparent rounded-lg opacity-0 group-hover:opacity-20 scale-0 group-hover:scale-100 transition-all duration-500 ease-out"></div>

            {/* Сам логотип с анимацией */}
            <span className="relative text-2xl md:text-3xl font-bold text-black dark:text-white transition-all duration-500 ease-out transform group-hover:scale-110 group-focus:scale-110 inline-block">
              NEXTON
            </span>

            {/* Небольшая подпись для скринридера (невидимая) */}
            <span className="sr-only">Автосервис в Полоцке</span>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 font-medium relative group"
                aria-label={
                  item.name === "Главная"
                    ? "На главную"
                    : `Перейти к разделу ${item.name}`
                }
              >
                {item.name}
                {/* Подчеркивание при наведении */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* Контакты в шапке */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <a
                href="tel:+375297115091"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 group"
                aria-label="Позвонить: +375 (29) 711-50-91"
              >
                <Phone className="w-5 h-5 text-black dark:text-white transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </a>
              <a
                href="https://t.me/+375297115091"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 group"
                aria-label="Написать в Telegram (откроется в новом окне)"
              >
                <Send className="w-5 h-5 text-black dark:text-white transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </a>
            </div>

            <ThemeSwitcher />
          </div>

          {/* Мобильное меню кнопка */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Мобильные контакты */}
            <a
              href="tel:+375297115091"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110"
              aria-label="Позвонить"
            >
              <Phone className="w-5 h-5 text-black dark:text-white" />
            </a>
            <a
              href="https://t.me/+375297115091"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110"
              aria-label="Telegram"
            >
              <Send className="w-5 h-5 text-black dark:text-white" />
            </a>
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Мобильное меню (выпадающее) */}
        {isOpen && (
          <div
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 mt-4"
            role="menu"
            aria-label="Мобильное меню"
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 font-medium border-b border-gray-100 dark:border-gray-900 last:border-0 hover:pl-2"
                onClick={() => setIsOpen(false)}
                role="menuitem"
                aria-label={
                  item.name === "Главная"
                    ? "На главную"
                    : `Перейти к разделу ${item.name}`
                }
              >
                {item.name}
              </Link>
            ))}

            {/* Контакты в мобильном меню */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Свяжитесь с нами:
              </p>
              <div className="flex flex-col space-y-2">
                <a
                  href="tel:+375297115091"
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2"
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
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Написать в Telegram (откроется в новом окне)"
                >
                  <Send size={18} />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
