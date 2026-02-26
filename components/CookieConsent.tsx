"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-timestamp", new Date().toISOString());
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-consent-timestamp", new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-50"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <div className="relative">
        {/* Эффект свечения */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <h2
                  id="cookie-title"
                  className="text-lg font-bold text-black dark:text-white flex items-center gap-2"
                >
                  <span className="text-2xl">🍪</span> Файлы cookie
                </h2>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Закрыть уведомление"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <p
                id="cookie-description"
                className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                Сайт использует файлы cookie для обеспечения удобства
                пользователей сайта, его улучшения, предоставления
                персонализированных рекомендаций.{" "}
                <Link
                  href="/privacy"
                  className="text-black dark:text-white underline hover:no-underline font-medium inline-block"
                  onClick={() => setIsVisible(false)}
                >
                  Подробнее
                </Link>
              </p>

              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <button
                  onClick={acceptCookies}
                  className="flex-1 px-4 py-2.5 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                  aria-label="Принять использование cookie"
                >
                  Принять
                </button>

                <button
                  onClick={rejectCookies}
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  aria-label="Отклонить использование cookie"
                >
                  Отклонить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
