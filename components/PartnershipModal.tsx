"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

const SEEN_KEY = "partnership-modal-seen";
const SHOWS_KEY = "partnership-shows";
const SESSION_START_KEY = "partnership-session-start";
const DAYS_3_MS = 3 * 24 * 60 * 60 * 1000;
const MAX_SHOWS = 3;
const AUTO_CLOSE_MS = 30_000;
const SHOW_DELAY_MS = 5_000; // 5 сек от первого захода в сессии
const SCROLL_TRIGGER_PERCENT = 15;

export default function PartnershipModal() {
  const [isVisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false);

  const close = useCallback(() => {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
    const current = Number(localStorage.getItem(SHOWS_KEY) || "0");
    localStorage.setItem(SHOWS_KEY, String(current + 1));
    setIsVisible(false);
  }, []);

  const shouldShow = useCallback(() => {
    if (typeof window === "undefined") return false;

    // Защита от надоедания: не более 3 показов ВСЕГО
    const shows = Number(localStorage.getItem(SHOWS_KEY) || "0");
    if (shows >= MAX_SHOWS) return false;

    // Не показывать, если видел 3 дня назад
    const seen = localStorage.getItem(SEEN_KEY);
    if (seen && Date.now() - Number(seen) < DAYS_3_MS) return false;

    return true;
  }, []);

  const tryShow = useCallback(() => {
    if (triggeredRef.current) return;
    if (!shouldShow()) return;
    triggeredRef.current = true;
    setIsVisible(true);
  }, [shouldShow]);

  // Триггер 1: клик по баннеру «Узнать подробнее» — всегда показываем
  useEffect(() => {
    const handleOpen = () => {
      triggeredRef.current = true;
      setIsVisible(true);
    };
    window.addEventListener("open-partnership-modal", handleOpen);
    return () =>
      window.removeEventListener("open-partnership-modal", handleOpen);
  }, []);

  // Триггер 2: авто-показ через 5 сек с момента ПЕРВОГО захода в сессию
  // (таймер НЕ сбрасывается при переходах между страницами)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldShow()) return;

    // Запоминаем время первого захода в сессии (живёт до закрытия вкладки)
    let sessionStart = Number(sessionStorage.getItem(SESSION_START_KEY) || "0");
    if (!sessionStart) {
      sessionStart = Date.now();
      sessionStorage.setItem(SESSION_START_KEY, String(sessionStart));
    }

    // Сколько уже прошло с начала сессии
    const elapsed = Date.now() - sessionStart;
    const remaining = Math.max(0, SHOW_DELAY_MS - elapsed);

    const timer = setTimeout(() => {
      tryShow();
    }, remaining);

    return () => clearTimeout(timer);
  }, [shouldShow, tryShow]);

  // Триггер 3: скролл 15%
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (triggeredRef.current) return;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrolled = (window.scrollY / docHeight) * 100;
      if (scrolled >= SCROLL_TRIGGER_PERCENT) {
        tryShow();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tryShow]);

  // Авто-закрытие + Escape + focus-trap
  useEffect(() => {
    if (!isVisible) return;

    const autoClose = setTimeout(() => close(), AUTO_CLOSE_MS);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    setTimeout(() => closeButtonRef.current?.focus(), 100);

    return () => {
      clearTimeout(autoClose);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isVisible, close]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={close}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="partnership-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-950 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 animate-fade-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Верхняя цветная полоса */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1e3a5f] via-[#2b4c7c] to-[#1e3a5f] dark:from-[#7a9bcb] dark:via-[#5a7bb0] dark:to-[#7a9bcb]"
          aria-hidden="true"
        />

        {/* Крестик */}
        <button
          ref={closeButtonRef}
          onClick={close}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb]"
          aria-label="Закрыть окно"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="p-6 sm:p-8 text-center">
          <h2
            id="partnership-title"
            className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-2 uppercase tracking-wide"
          >
            🤝 Сотрудничество
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            для автосервисов и частных мастеров
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
            Мы регулярно получаем заказы, которые превышают наши мощности.
            <br />
            <strong className="text-black dark:text-white">
              Давайте сотрудничать!
            </strong>
          </p>

          <div className="text-left space-y-3 mb-6 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <p className="flex items-start gap-3">
              <span className="text-xl shrink-0" aria-hidden="true">
                📦
              </span>
              <span>
                <strong className="text-black dark:text-white">
                  Передача заказов
                </strong>{" "}
                — отдаём то, что не успеваем взять
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl shrink-0" aria-hidden="true">
                🔧
              </span>
              <span>
                <strong className="text-black dark:text-white">
                  Приём ваших заказов
                </strong>{" "}
                — стапель, вибростенд, аргон, пайка
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl shrink-0" aria-hidden="true">
                🤝
              </span>
              <span>
                <strong className="text-black dark:text-white">
                  Обмен клиентами
                </strong>{" "}
                по территориальному принципу
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl shrink-0" aria-hidden="true">
                💰
              </span>
              <span>
                <strong className="text-black dark:text-white">
                  Прозрачные условия
                </strong>{" "}
                — оплата без задержек
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-xl shrink-0" aria-hidden="true">
                📍
              </span>
              <span>
                <strong className="text-black dark:text-white">
                  Работаем по всей Беларуси
                </strong>
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <a
              href="tel:+375297115091"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1e3a5f] hover:bg-[#2b4c7c] dark:bg-[#7a9bcb] dark:hover:bg-[#5a7bb0] text-white dark:text-black font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
              aria-label="Позвонить по номеру +375 29 711-50-91"
            >
              📞 Позвонить: +375 (29) 711-50-91
            </a>
            <a
              href="https://t.me/+375297115091"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#1e3a5f] dark:border-[#7a9bcb] text-[#1e3a5f] dark:text-[#7a9bcb] hover:bg-[#1e3a5f] dark:hover:bg-[#7a9bcb] hover:text-white dark:hover:text-black font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
              aria-label="Написать в Telegram (откроется в новом окне)"
            >
              💬 Написать в Telegram
            </a>
            <button
              onClick={close}
              className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:underline"
            >
              Ок, закрыть
            </button>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-5">
            ИП Корчако С.Л. · info@nexton.vip
          </p>
        </div>
      </div>
    </div>
  );
}
