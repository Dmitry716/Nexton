"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

export default function PWAPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Проверяем, не в standalone режиме уже
    const checkStandalone = () => {
      const standalone = window.matchMedia(
        "(display-mode: standalone)",
      ).matches;
      setIsStandalone(standalone);
      return standalone;
    };

    // Проверяем iOS
    const checkIOS = () => {
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
      setIsIOS(ios);
      return ios;
    };

    // Выполняем проверки
    const standalone = checkStandalone();
    checkIOS();

    // Показываем промпт, если не в standalone
    if (!standalone) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showPrompt || isStandalone) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:bottom-6 md:right-6 md:left-auto md:max-w-sm z-50 animate-slide-up"
      role="alert"
      aria-label="Установка приложения"
    >
      <div className="relative">
        {/* Эффект свечения */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>

        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                  <Download className="w-5 h-5 text-white dark:text-black" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-base font-bold text-black dark:text-white mb-1">
                  Установите приложение
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {isIOS
                    ? "Нажмите 'Поделиться' → 'На экран 'Домой'"
                    : "Добавьте на главный экран для быстрого доступа"}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPrompt(false)}
                    className="flex-1 px-3 py-1.5 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black text-xs font-medium rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
                  >
                    Понятно
                  </button>

                  {isIOS && (
                    <button
                      onClick={() =>
                        window.open(
                          "https://support.apple.com/guide/iphone/bookmark-favorite-websites-iph42ab2f3a7/ios",
                          "_blank",
                        )
                      }
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg transition-all duration-300"
                    >
                      Как установить
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowPrompt(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 hover:rotate-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
                aria-label="Закрыть уведомление"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
