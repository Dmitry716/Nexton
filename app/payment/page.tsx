import Link from "next/link";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import PaymentInfo from "@/components/PaymentInfo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Способы оплаты | Nexton Полоцк",
  description:
    "Способы оплаты в автосервисе Nexton: карты, безналичный расчёт, работа с юридическими лицами. Все документы предоставляются.",
  keywords:
    "оплата картой, безналичный расчёт, Visa, MasterCard, Белкарт, МИР, оплата автосервиса Полоцк",
};

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-4 sm:pt-6 md:pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          На главную
        </Link>

        <PaymentInfo />

        <div className="mt-8 p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-black dark:text-white mb-4 text-center">
            Остались вопросы по оплате?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-center">
            <a
              href="tel:+375297115091"
              className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              +375 (29) 711-50-91
            </a>
            <a
              href="mailto:info@nexton.vip"
              className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              info@nexton.vip
            </a>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-4">
            Ответим на все вопросы по оплате в ближайшее время
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/#contacts"
            className="text-[#1e3a5f] dark:text-[#7a9bcb] hover:underline font-medium inline-flex items-center gap-2"
          >
            ← Вернуться к контактам
          </Link>
        </div>
      </div>
    </div>
  );
}
