"use client";

import { Sparkles, Shield, Award, Clock } from "lucide-react";

const items = [
  {
    icon: Sparkles,
    title: "Индивидуальный подход",
    description:
      "Учитываем все пожелания клиента и создаём уникальный дизайн, который подчеркнёт индивидуальность вашего автомобиля.",
  },
  {
    icon: Award,
    title: "Эстетический результат",
    description:
      "Профессиональный подход и качественные материалы улучшат внешний вид автомобиля и придадут ему уникальный стиль.",
  },
  {
    icon: Shield,
    title: "Качественные материалы",
    description:
      "Только высококачественная плёнка, стойкая к внешним воздействиям и УФ-излучению. Гарантия на материал и работу.",
  },
  {
    icon: Clock,
    title: "Опыт с 2010 года",
    description:
      "Более 15 лет на рынке. Тысячи довольных клиентов в Беларуси и области. Сертифицированные мастера.",
  },
];

export default function WhyChooseUsDetailing() {
  return (
    <section
      className="relative py-20 bg-gradient-to-br from-[#1e3a5f] via-[#2b4c7c] to-[#1a2a3a] dark:from-[#0f1f33] dark:via-[#1a2a3a] dark:to-[#000000] overflow-hidden"
      aria-labelledby="why-choose-title"
    >
      {/* Декоративные градиентные круги */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#7a9bcb]/20 rounded-full blur-3xl animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5a7bb0]/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2
          id="why-choose-title"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4"
        >
          Почему выбирают{" "}
          <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            Nexton
          </span>
        </h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
          Мы делаем больше, чем просто ремонт — мы создаём настроение от
          вождения.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group relative bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-amber-300/60 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="relative mb-4">
                  <div
                    className="absolute inset-0 bg-amber-300/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-[#1e3a5f] shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
