"use client";

import Image from "next/image";
import { Shield, Building2, Landmark } from "lucide-react";

// Массив платежных систем
const paymentSystems = [
  {
    id: "visa",
    name: "Visa",
    src: "/images/payments/visa.webp",
    alt: "Visa - международная платежная система",
    fit: "cover" as const,
  },
  {
    id: "mastercard",
    name: "MasterCard",
    src: "/images/payments/mastercard.webp",
    alt: "MasterCard - международная платежная система",
    fit: "cover" as const,
  },
  {
    id: "belkart",
    name: "Белкарт",
    src: "/images/payments/belkart.webp",
    alt: "Белкарт - национальная платежная система Беларуси",
    fit: "contain" as const, // 👈 Вписывается, не обрезается
  },
  {
    id: "mir",
    name: "МИР",
    src: "/images/payments/mir.webp",
    alt: "МИР - национальная платежная система России",
    fit: "contain" as const, // 👈 Вписывается, не обрезается
  },
];

export default function PaymentMethods() {
  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
      aria-labelledby="payment-title"
    >
      <div className="flex items-center gap-2 mb-3">
        <Shield size={14} className="text-green-600 dark:text-green-400" />
        <p
          id="payment-title"
          className="text-xs font-medium text-gray-600 dark:text-gray-400"
        >
          Принимаем к оплате:
        </p>
      </div>

      <div
        className="flex flex-wrap items-center gap-2"
        role="list"
        aria-label="Доступные способы оплаты"
      >
        {paymentSystems.map((system) => (
          <div
            key={system.id}
            className="w-16 h-10 rounded-md overflow-hidden shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white flex-shrink-0 bg-white dark:bg-gray-800"
            role="listitem"
          >
            <Image
              src={system.src}
              alt={system.alt}
              width={80}
              height={50}
              className={`w-full h-full object-${system.fit}`}
              loading="lazy"
              quality={90}
            />
          </div>
        ))}

        {/* Безналичный */}
        <div
          className="px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[10px] font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-105 hover:border-black dark:hover:border-white flex items-center gap-1.5 focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white flex-shrink-0"
          role="listitem"
        >
          <Landmark size={12} className="text-gray-500 dark:text-gray-400" />
          <span>Безналичный</span>
        </div>

        {/* Наличные */}
        <div
          className="px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[10px] font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-105 hover:border-black dark:hover:border-white flex items-center gap-1.5 focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white flex-shrink-0"
          role="listitem"
        >
          <Building2 size={12} className="text-gray-500 dark:text-gray-400" />
          <span>Наличные</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1">
          <span className="text-green-500">✓</span> Физ. лица
        </span>
        <span className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
        <span className="inline-flex items-center gap-1">
          <span className="text-green-500">✓</span> Юр. лица
        </span>
        <span className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
        <span className="inline-flex items-center gap-1">
          <span className="text-green-500">✓</span> Безналичный расчет
        </span>
      </p>
    </section>
  );
}
