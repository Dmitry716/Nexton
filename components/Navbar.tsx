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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      scrolled 
        ? "bg-white/95 dark:bg-black/95 backdrop-blur-md border-gray-200 dark:border-gray-800" 
        : "bg-white dark:bg-black border-gray-200 dark:border-gray-800"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Логотип */}
          <Link href="/" className="text-3xl font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            NEXTON
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Контакты в шапке */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <a 
                href="tel:+375297115091" 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
                title="Позвонить: +375 (29) 711-50-91"
              >
                <Phone className="w-5 h-5 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </a>
              <a 
                href="https://t.me/+375297115091" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
                title="Telegram: @+375297115091"
              >
                <Send className="w-5 h-5 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </a>
            </div>

            <ThemeSwitcher />
          </div>

          {/* Мобильное меню кнопка */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Мобильные контакты */}
            <a 
              href="tel:+375297115091" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Позвонить"
            >
              <Phone className="w-5 h-5 text-black dark:text-white" />
            </a>
            <a 
              href="https://t.me/+375297115091" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Telegram"
            >
              <Send className="w-5 h-5 text-black dark:text-white" />
            </a>
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-gray-200 dark:border-gray-800"
              aria-label="Меню"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Мобильное меню (выпадающее) */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium border-b border-gray-100 dark:border-gray-900 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Контакты в мобильном меню */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Свяжитесь с нами:</p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="tel:+375297115091" 
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone size={18} />
                  <span>+375 (29) 711-50-91</span>
                </a>
                <a 
                  href="https://t.me/+375297115091" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(false)}
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