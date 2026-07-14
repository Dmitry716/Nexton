"use client";

import Image from "next/image";
import {
  Shield,
  Landmark,
  Building,
  FileText,
  CheckCircle,
} from "lucide-react";

export default function PaymentInfo() {
  const paymentSystems = [
    { id: "visa", name: "Visa", src: "/images/payments/visa.webp" },
    {
      id: "mastercard",
      name: "MasterCard",
      src: "/images/payments/mastercard.webp",
    },
    { id: "belkart", name: "Белкарт", src: "/images/payments/belkart.webp" },
    { id: "mir", name: "МИР", src: "/images/payments/mir.webp" },
  ];

  return (
    <div className="mt-8">
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <h3 className="text-2xl font-bold text-black dark:text-white mb-4 text-center">
          Способы оплаты
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Работаем с физическими и юридическими лицами
        </p>

        {/* Карточки способов оплаты */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* 1. Банковские карты */}
          <div className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300 hover:shadow-lg text-center group">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:bg-[#1e3a5f] dark:group-hover:bg-[#7a9bcb] transition-colors duration-300">
                <Landmark className="w-8 h-8 text-black dark:text-white group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-black dark:text-white mb-2 group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
              Оплата картой
            </h4>

            {/* Иконки карт */}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {paymentSystems.map((system) => (
                <div
                  key={system.id}
                  className="w-12 h-8 rounded-md overflow-hidden shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <Image
                    src={system.src}
                    alt={system.name}
                    width={80}
                    height={50}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              Visa, MasterCard, Белкарт, МИР
            </p>
          </div>

          {/* 2. Безналичный расчет */}
          <div className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300 hover:shadow-lg text-center group">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:bg-[#1e3a5f] dark:group-hover:bg-[#7a9bcb] transition-colors duration-300">
                <Building className="w-8 h-8 text-black dark:text-white group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-black dark:text-white mb-2 group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
              Безналичный расчёт
            </h4>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Для юридических лиц и ИП
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Счёт на оплату без НДС
            </p>
          </div>

          {/* 3. Документы */}
          <div className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300 hover:shadow-lg text-center group">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:bg-[#1e3a5f] dark:group-hover:bg-[#7a9bcb] transition-colors duration-300">
                <FileText className="w-8 h-8 text-black dark:text-white group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-black dark:text-white mb-2 group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
              Документы
            </h4>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Чеки, акты, счета-фактуры
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Предоставляем все необходимые документы
            </p>
          </div>
        </div>

        {/* Нижняя информация */}
        <div className="mt-6 max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb]" />
              Безопасная оплата
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb]" />
              Все документы предоставляются
            </span>
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-3">
            Для юридических лиц — договор и закрывающие документы.
          </p>
        </div>
      </div>
    </div>
  );
}
