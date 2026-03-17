import { Shield, Cookie, FileText, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности и cookies | Nexton Полоцк — Новополоцк",
  description:
    "Политика обработки персональных данных и использования файлов cookie в автосервисе Nexton (Полоцк, Новополоцк).",
};

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-white dark:text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Автосервис Nexton • Полоцк и Новополоцк
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Обновлено: {currentDate}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Содержание:
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href="#cookies"
                className="text-black dark:text-white hover:underline"
              >
                🍪 Cookies
              </a>
              <a
                href="#personal-data"
                className="text-black dark:text-white hover:underline"
              >
                👤 Персональные данные
              </a>
              <a
                href="#rights"
                className="text-black dark:text-white hover:underline"
              >
                ⚖️ Ваши права
              </a>
              <a
                href="#contact"
                className="text-black dark:text-white hover:underline"
              >
                📞 Контакты
              </a>
            </div>
          </div>

          <div id="cookies" className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Cookie className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Использование файлов cookie
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                На сайте используются файлы cookie. Это небольшие текстовые
                файлы, которые сохраняются на вашем устройстве.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <h3 className="font-medium text-black dark:text-white mb-2">
                    Необходимые cookies
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Для работы сайта (навигация, безопасность).
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <h3 className="font-medium text-black dark:text-white mb-2">
                    Аналитические cookies
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Для статистики посещений и улучшения работы сайта.
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-500">
                Вы можете отключить cookies в настройках браузера.
              </p>
            </div>
          </div>

          <div id="personal-data" className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <FileText className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Персональные данные
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Собираем только необходимые данные: имя и телефон (для связи по
                записи).
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Данные не передаются третьим лицам, кроме случаев,
                предусмотренных законом.
              </p>
            </div>
          </div>

          <div id="rights" className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Shield className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Ваши права
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <h3 className="font-medium text-black dark:text-white mb-2">
                  Доступ к данным
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Можете запросить информацию о своих данных
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <h3 className="font-medium text-black dark:text-white mb-2">
                  Удаление данных
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Можете потребовать удалить ваши данные
                </p>
              </div>
            </div>
          </div>

          <div
            id="contact"
            className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
              Контакты для вопросов
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <a
                  href="tel:+375297115091"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  +375 (29) 711-50-91
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  г. Полоцк, ул. Строительная 21в/3
                </span>
              </div>

              <div className="pt-4">
                <Link
                  href="/"
                  className="text-black dark:text-white hover:underline"
                >
                  ← На главную
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
