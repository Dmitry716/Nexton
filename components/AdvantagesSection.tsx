"use client";

import { useEffect, useRef } from "react";
import { Award, Wrench, Shield, Clock, Zap, Star } from "lucide-react";

const advantages = [
  {
    title: "Опыт 15+ лет",
    description: "Более 15 лет успешной работы в Полоцке и области",
    icon: Award,
  },
  {
    title: "Профоборудование",
    description: "Современное диагностическое оборудование",
    icon: Wrench,
  },
  {
    title: "Гарантия 6 мес",
    description: "Гарантия на все виды работ до 6 месяцев",
    icon: Shield,
  },
  {
    title: "Бесплатная диагностика",
    description: "Диагностика бесплатно при ремонте",
    icon: Clock,
  },
  {
    title: "Оригинальные запчасти",
    description: "Только качественные материалы и запчасти",
    icon: Zap,
  },
  {
    title: "Лучший сервис",
    description: "Индивидуальный подход к каждому клиенту",
    icon: Star,
  },
];

export default function AdvantagesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-scale");
          }
        });
      },
      { threshold: 0.1 },
    );

    const cards = document.querySelectorAll(".advantage-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white dark:bg-black border-y border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium mb-4 border border-gray-200 dark:border-gray-700">
            Почему выбирают нас
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Наши <span className="gradient-text">преимущества</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Мы делаем всё, чтобы вы остались довольны качеством обслуживания
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className="advantage-card opacity-0 group p-8 border border-gray-200 dark:border-gray-800 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-500 hover:shadow-xl hover:shadow-[#1e3a5f]/10 dark:hover:shadow-[#7a9bcb]/10 hover:-translate-y-1 bg-white dark:bg-black"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#1e3a5f]/10 dark:bg-[#7a9bcb]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-black dark:bg-white rounded-xl flex items-center justify-center group-hover:bg-[#1e3a5f] dark:group-hover:bg-[#7a9bcb] transition-colors duration-500">
                    <Icon className="w-8 h-8 text-white dark:text-black group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors duration-300">
                  {advantage.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
