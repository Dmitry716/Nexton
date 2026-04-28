"use client";

import { Phone, Send } from "lucide-react";

export default function MobileStickyCta() {
  return (
    <div className="md:hidden fixed left-4 right-4 bottom-20 z-40">
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-black/95 backdrop-blur px-3 py-3 shadow-xl">
        <a
          href="tel:+375297115091"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white dark:bg-white dark:text-black px-4 py-3 text-sm font-semibold"
          aria-label="Позвонить в Nexton"
        >
          <Phone size={16} />
          Позвонить
        </a>
        <a
          href="https://t.me/+375297115091"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 text-black dark:text-white px-4 py-3 text-sm font-semibold"
          aria-label="Написать в Telegram"
        >
          <Send size={16} />
          Telegram
        </a>
      </div>
    </div>
  );
}

