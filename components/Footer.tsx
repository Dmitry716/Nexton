"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Send, ArrowUp, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "#services" },
    { name: "О нас", href: "#about" },
    { name: "Контакты", href: "#contacts" },
    { name: "Политика конфиденциальности", href: "/privacy" },
  ];

  const services = [
    { name: "Автокондиционеры", href: "#avtokondicionery" },
    { name: "Автономные отопители", href: "#otopiteli" },
    { name: "Ремонт радиаторов", href: "#radiatory" },
    {
      name: "Ремонт радиаторов и топливных баков для грузовиков",
      href: "#gruzovye",
    },
    {
      name: "Обслуживание и ремонт пневмосистем",
      href: "/usluga/obsluzhivanie-remont-pnevmosistem",
    },
    { name: "Ремонт автопластика", href: "#plastik" },
  ];

  return (
    <footer
      className="relative bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
      role="contentinfo"
      aria-label="Подвал сайта"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black dark:via-white to-transparent opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Основная сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Колонка 1: Логотип и информация */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:rounded-lg transition-all duration-500"
              aria-label="На главную"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-black to-gray-500 dark:from-white dark:to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                <span className="relative text-3xl font-bold text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-all duration-500 transform group-hover:scale-105 inline-block">
                  NEXTON
                </span>
              </div>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Профессиональный ремонт систем охлаждения и автокондиционеров в
              Полоцке и Новополоцке. Работаем с 2010 года, гарантия до 6 месяцев.
            </p>

            {/* Реквизиты ИП */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 space-y-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <span className="font-medium text-black dark:text-white">
                  ИП Корчако С.Л.
                </span>
                <br />
                УНП 391450537
                <br />
                Свидетельство N°0250616 выдано Полоцким ГИК от 28.06.2010г.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <span className="font-medium text-black dark:text-white">
                  Ориентир:
                </span>{" "}
                Северный рынок, г. Полоцк. Обслуживаем Полоцк и Новополоцк.
                <br />
                <span className="font-medium text-black dark:text-white">
                  Режим работы:
                </span>{" "}
                с 10:00 до 16:00
                <br />
                Суббота, воскресенье - выходной
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm text-black dark:text-white border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
              aria-label="Вернуться наверх"
            >
              <ArrowUp
                size={16}
                className="transition-transform duration-700 group-hover:-translate-y-1"
              />
              <span>Наверх</span>
            </button>
          </div>

          {/* Остальные колонки без изменений */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-black dark:text-white mb-4">
              Навигация
            </h3>
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 hover:translate-x-1 focus:outline-none focus-visible:underline"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-bold text-black dark:text-white mb-4">
              Наши услуги
            </h3>
            <nav className="space-y-3">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 hover:translate-x-1 focus:outline-none focus-visible:underline"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-bold text-black dark:text-white mb-4">
              Контакты
            </h3>
            <div className="space-y-4">
              {/* Контакты без изменений */}
              <a
                href="tel:+375297115091"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:rounded-lg"
              >
                <span className="p-2 bg-gray-100 dark:bg-gray-900 rounded-xl group-hover:bg-black dark:group-hover:bg-white transition-all duration-500">
                  <Phone
                    size={16}
                    className="text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500"
                  />
                </span>
                <span>+375 (29) 711-50-91</span>
              </a>

              <a
                href="mailto:info@nexton.vip"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:rounded-lg"
              >
                <span className="p-2 bg-gray-100 dark:bg-gray-900 rounded-xl group-hover:bg-black dark:group-hover:bg-white transition-all duration-500">
                  <Mail
                    size={16}
                    className="text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500"
                  />
                </span>
                <span>info@nexton.vip</span>
              </a>

              <a
                href="https://t.me/+375297115091"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:rounded-lg"
              >
                <span className="p-2 bg-gray-100 dark:bg-gray-900 rounded-xl group-hover:bg-black dark:group-hover:bg-white transition-all duration-500">
                  <Send
                    size={16}
                    className="text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500"
                  />
                </span>
                <span>Telegram</span>
                <ExternalLink
                  size={12}
                  className="text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                />
              </a>

              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <span className="p-2 bg-gray-100 dark:bg-gray-900 rounded-xl shrink-0">
                  <MapPin size={16} className="text-black dark:text-white" />
                </span>
                <span>
                  г. Полоцк, ул. Строительная 21в/3
                  <br />
                  блок 9, бокс 3
                  <br />
                  <span className="text-xs text-gray-500 dark:text-gray-500">Работаем в Полоцке и Новополоцке</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © {currentYear} Nexton. Все права защищены.
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-500">
                Разработка сайта:
              </span>
              <a
                href="https://www.apsod.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-500 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
                aria-label="Перейти на сайт разработчика APSOD (откроется в новом окне)"
              >
                <span>APSOD</span>
                <ExternalLink
                  size={14}
                  className="opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                />
              </a>
            </div>

            <Link
              href="/privacy"
              className="text-xs text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors duration-500"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
