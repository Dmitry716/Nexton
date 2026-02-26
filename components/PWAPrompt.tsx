"use client";

import { useState, useEffect } from "react";
import { Download, X, Share2, PlusCircle } from "lucide-react";

export default function PWAPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // ПРИНУДИТЕЛЬНО удаляем старые service workers
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (const registration of registrations) {
          registration.unregister();
          console.log("Старый service worker удален");
        }
      });
    }

    const checkStandalone = () => {
      const standalone = window.matchMedia(
        "(display-mode: standalone)",
      ).matches;
      setIsStandalone(standalone);
      return standalone;
    };

    const checkIOS = () => {
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
      setIsIOS(ios);
      return ios;
    };

    const standalone = checkStandalone();
    checkIOS();

    if (!standalone) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    const handleShowPrompt = () => {
      setShowPrompt(true);
    };

    window.addEventListener("show-pwa-prompt", handleShowPrompt);

    return () => {
      window.removeEventListener("show-pwa-prompt", handleShowPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (isIOS) {
      alert(
        'Для установки на iPhone:\n\n1. Нажмите на кнопку "Поделиться" (квадратик со стрелкой)\n2. Прокрутите вниз\n3. Нажмите "На экран \'Домой\'"',
      );
    } else {
      alert(
        "Для установки:\n\n1. Нажмите на меню браузера (⋮ или ⋯)\n2. Выберите 'Добавить на главный экран'",
      );
    }
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:right-6 md:left-auto md:max-w-sm z-[100] animate-slide-up">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1e3a5f] to-[#2b4c7c] rounded-2xl blur opacity-30 animate-pulse"></div>

        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <div className="w-10 h-10 bg-[#1e3a5f] dark:bg-[#7a9bcb] rounded-xl flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-base font-bold text-black dark:text-white mb-1">
                  Установите приложение
                </h3>

                {isIOS ? (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <span>1. Нажмите</span>
                      <span className="inline-flex items-center mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                        <Share2 size={12} className="mr-1" /> Поделиться
                      </span>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <span>2. Прокрутите вниз и нажмите</span>
                      <span className="inline-flex items-center mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                        <PlusCircle size={12} className="mr-1" /> На экран
                        &quot;Домой&quot;
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      1. Нажмите ⋮ (меню) в браузере
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      2. Выберите &quot;Добавить на главный экран&quot;
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={handleInstall}
                    className="flex-1 px-4 py-2.5 bg-[#1e3a5f] hover:bg-[#2b4c7c] dark:bg-[#7a9bcb] dark:hover:bg-[#5a7bb0] text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Установить
                  </button>

                  <button
                    onClick={() => setShowPrompt(false)}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl transition-all duration-300"
                  >
                    Позже
                  </button>

                  <button
                    onClick={() => setShowPrompt(false)}
                    className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300"
                    aria-label="Закрыть"
                  >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
