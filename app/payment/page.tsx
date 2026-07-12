import { CreditCard, Building, FileText, Phone, Mail } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Способы оплаты | Nexton Полоцк",
  description:
    "Способы оплаты в автосервисе Nexton: карты, безналичный расчёт, работа с юридическими лицами. Все документы предоставляются.",
  keywords:
    "оплата картой, безналичный расчёт, Visa, MasterCard, Белкарт, оплата автосервиса Полоцк",
};

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-8 text-center">
          Способы <span className="gradient-text">оплаты</span>
        </h1>

        <div className="space-y-8">
          {/* Карты */}
          <div className="border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <CreditCard className="w-8 h-8 text-[#1e3a5f] dark:text-[#7a9bcb]" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Оплата картой
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Принимаем к оплате банковские карты:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-1">
              <li>Visa</li>
              <li>MasterCard</li>
              <li>Белкарт</li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              Оплата производится в сервисе или по ссылке для дистанционной
              оплаты.
            </p>
          </div>

          {/* Безналичный расчёт */}
          <div className="border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <Building className="w-8 h-8 text-[#1e3a5f] dark:text-[#7a9bcb]" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Безналичный расчёт
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Для юридических лиц и индивидуальных предпринимателей:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-1">
              <li>Выставляем счёт на оплату</li>
              <li>Работаем с НДС и без НДС</li>
              <li>Заключаем договор</li>
              <li>Предоставляем все закрывающие документы</li>
            </ul>
          </div>

          {/* Документы */}
          <div className="border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <FileText className="w-8 h-8 text-[#1e3a5f] dark:text-[#7a9bcb]" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Документы
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              После оплаты вы получаете:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-1">
              <li>Кассовый чек</li>
              <li>Акт выполненных работ</li>
              <li>Счёт-фактуру (для юридических лиц)</li>
            </ul>
          </div>
        </div>

        {/* Контакты для вопросов */}
        <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-black dark:text-white mb-4 text-center">
            Остались вопросы по оплате?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-center">
            <a
              href="tel:+375297115091"
              className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Позвонить по вопросам оплаты"
            >
              <Phone className="w-5 h-5" />
              +375 (29) 711-50-91
            </a>
            <a
              href="mailto:info@nexton.vip"
              className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Написать по вопросам оплаты"
            >
              <Mail className="w-5 h-5" />
              info@nexton.vip
            </a>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-4">
            Ответим на все вопросы по оплате в ближайшее время
          </p>
        </div>

        <div className="mt-8 text-center">
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
