"use client";

import {
  CreditCard,
  Building,
  FileText,
  Shield,
  CheckCircle,
} from "lucide-react";

export default function PaymentInfo() {
  const paymentMethods = [
    {
      icon: CreditCard,
      title: "Оплата картой",
      description: "Visa, MasterCard, Белкарт",
      details: "Оплата по карте в сервисе или по ссылке",
    },
    {
      icon: Building,
      title: "Безналичный расчёт",
      description: "Для юридических лиц и ИП",
      details: "Счёт на оплату с НДС и без",
    },
    {
      icon: FileText,
      title: "Документы",
      description: "Чеки, акты, счета-фактуры",
      details: "Предоставляем все необходимые документы",
    },
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

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {paymentMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300 hover:shadow-lg text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:bg-[#1e3a5f] dark:group-hover:bg-[#7a9bcb] transition-colors duration-300">
                    <Icon className="w-8 h-8 text-black dark:text-white group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-2 group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
                  {method.title}
                </h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {method.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {method.details}
                </p>
              </div>
            );
          })}
        </div>

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
            Работаем с НДС и без НДС. Для юридических лиц — договор и
            закрывающие документы.
          </p>
        </div>
      </div>
    </div>
  );
}
