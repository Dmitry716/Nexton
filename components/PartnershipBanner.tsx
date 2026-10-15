"use client";

import { Sparkles } from "lucide-react";

const MESSAGE = (
  <>
    <Sparkles
      className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5 text-amber-300"
      aria-hidden="true"
    />
    <strong className="font-semibold">
      Приглашаем автосервисы к сотрудничеству
    </strong>
    <span className="mx-2 opacity-60" aria-hidden="true">
      •
    </span>
    Передача заказов, обмен клиентами, взаимозачёты
    <span className="mx-2 opacity-60" aria-hidden="true">
      •
    </span>
    <a
      href="tel:+375297115091"
      className="underline decoration-amber-300/60 hover:decoration-amber-300 transition-colors"
    >
      +375 (29) 711-50-91
    </a>
    <span className="mx-2 opacity-60" aria-hidden="true">
      •
    </span>
    <a
      href="#partnership"
      className="font-semibold text-amber-300 hover:text-amber-200 underline decoration-amber-300/60 hover:decoration-amber-200 transition-colors"
      onClick={(e) => {
        e.preventDefault();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-partnership-modal"));
        }
      }}
    >
      Узнать подробнее →
    </a>
  </>
);

export default function PartnershipBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] w-full bg-[#1e3a5f] dark:bg-[#0f1f33] text-white overflow-hidden border-b border-[#2b4c7c] dark:border-[#1a2a3a]"
      role="region"
      aria-label="Приглашение автосервисов к сотрудничеству"
    >
      {/* Градиенты по краям — для «растворения» текста */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1e3a5f] dark:from-[#0f1f33] to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1e3a5f] dark:from-[#0f1f33] to-transparent z-10"
        aria-hidden="true"
      />

      {/* Две копии одного текста — для бесшовной петли */}
      <div
        className="animate-infinite-scroll py-2 text-xs sm:text-sm whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        <div className="flex items-center gap-2 px-4" aria-hidden="false">
          {MESSAGE}
        </div>
        <div className="flex items-center gap-2 px-4" aria-hidden="true">
          {MESSAGE}
        </div>
      </div>
    </div>
  );
}
