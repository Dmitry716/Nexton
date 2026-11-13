import type { Metadata } from "next";
import Link from "next/link";
import { detailingServices, detailingCitySlugs } from "@/data/detailing";
import { cities } from "@/data/cities";
import { ArrowRight, MapPin } from "lucide-react";
import DetailingContacts from "@/components/DetailingContacts";
import WhyChooseUsDetailing from "@/components/WhyChooseUsDetailing";
import DetailingServiceCard from "@/components/DetailingServiceCard";

export const metadata: Metadata = {
  title:
    "Детейлинг-студия Nexton — Полоцк, Витебск, Минск | оклейка, тонировка, химчистка",
  description:
    "Детейлинг-студия Nexton: оклейка защитной плёнкой от 660 BYN, тонировка по ГОСТ от 330 BYN, химчистка салона, полировка, керамика и антикор. Студия в Полоцке — работаем с клиентами из Витебска и Минска. +375297115091",
  keywords: [
    "детейлинг-студия",
    "детейлинг студия Nexton",
    "детейлинг Полоцк",
    "детейлинг Витебск",
    "детейлинг Минск",
    "оклейка авто",
    "тонировка авто",
    "химчистка авто",
    "полировка кузова",
    "керамика авто",
    "антикор",
  ],
  alternates: { canonical: "https://nexton.vip/detailing" },
  openGraph: {
    title: "Детейлинг-студия Nexton",
    description:
      "Студия детейлинга: оклейка, тонировка, химчистка, керамика, полировка, антикор.",
    url: "https://nexton.vip/detailing",
    siteName: "Nexton",
    images: [
      { url: "/detailing-hero-poster.jpg", width: 1920, height: 1080 },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function DetailingHubPage() {
  const detailingCities = cities.filter((c) =>
    detailingCitySlugs.includes(c.slug as (typeof detailingCitySlugs)[number]),
  );

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDetailing",
            name: "Детейлинг-студия Nexton",
            alternateName: "Nexton Detailing",
            description:
              "Детейлинг-студия Nexton: оклейка защитной плёнкой, тонировка по ГОСТ, химчистка салона, полировка, керамика и антикор.",
            url: "https://nexton.vip/detailing",
            telephone: "+375297115091",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Строительная 21в/3, блок 9, бокс 3",
              addressLocality: "Полоцк",
              addressRegion: "Витебская область",
              addressCountry: "BY",
            },
            areaServed: detailingCities.map((c) => ({
              "@type": "City",
              name: c.name,
            })),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Услуги детейлинг-студии Nexton",
              itemListElement: detailingServices.map((s) => ({
                "@type": "Offer",
                name: s.name,
                description: s.description,
                priceCurrency: "BYN",
                price: s.priceFrom,
              })),
            },
          }),
        }}
      />

      {/* Хлебные крошки — в контейнере */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <nav
          className="text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4"
          aria-label="Хлебные крошки"
        >
          <Link
            href="/"
            className="hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:underline"
          >
            Главная
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-black dark:text-white font-medium">
            Детейлинг-студия
          </span>
        </nav>
      </div>

      {/* HERO — студия */}
      <header className="relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/detailing-hero-poster.jpg?v=m5"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_70%] sm:object-center"
          aria-hidden="true"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#1e3a5f]/40 dark:bg-black/50"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-36 text-center">
          <p
            className="text-sm sm:text-base font-semibold tracking-[0.2em] uppercase text-[#a8c4e8] mb-4 hero-fade-in"
          >
            Nexton Detailing
          </p>
          <h1
            lang="ru"
            className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight text-balance hero-slide-in"
          >
            Детейлинг-студия Nexton
          </h1>
          <p
            lang="ru"
            className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed hero-fade-in"
            style={{ animationDelay: "80ms" }}
          >
            Защита, блеск и стиль автомобиля — оклейка, тонировка, химчистка,
            полировка, керамика и антикор в одной студии.
          </p>

          <div
            className="mt-10 flex flex-wrap justify-center gap-4 hero-fade-in"
            style={{ animationDelay: "160ms" }}
          >
            <a
              href="tel:+375297115091"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e3a5f] hover:bg-gray-100 font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
              aria-label="Позвонить в детейлинг-студию Nexton по номеру +375 29 711-50-91"
            >
              <span aria-hidden="true">📞</span> Записаться
            </a>
            <a
              href="https://t.me/+375297115091"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/80 text-white hover:bg-white hover:text-[#1e3a5f] font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
              aria-label="Написать в Telegram детейлинг-студии Nexton"
            >
              <span aria-hidden="true">💬</span> Telegram
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="services-title" className="my-20">
          <div className="text-center mb-10">
            <h2
              id="services-title"
              className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3"
            >
              Услуги студии
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Полный цикл детейлинга: от защиты кузова и стёкол до чистоты салона
              и моторного отсека. Цены — от указанных, точный расчёт после осмотра.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailingServices.map((service) => (
              <DetailingServiceCard
                key={service.slug}
                service={service}
                href={`/detailing/polotsk/${service.slug}`}
                ariaLabel={`${service.name} — от ${service.priceFrom} BYN, подробнее`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Почему выбирают — уже на всю ширину */}
      <div className="my-20">
        <WhyChooseUsDetailing />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="cities-title" className="mb-16">
          <div className="text-center mb-10">
            <h2
              id="cities-title"
              className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3"
            >
              Студия и города
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Основная детейлинг-студия Nexton — в Полоцке. Принимаем авто из
              Новополоцка, Витебска, Минска и области — запишитесь заранее.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {detailingCities.map((city) => (
              <Link
                key={city.slug}
                href={`/detailing/${city.slug}`}
                className="group relative flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] focus-visible:ring-offset-2"
                aria-label={`Детейлинг автомобилей в ${city.namePrepositional} — услуги и цены`}
              >
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#1e3a5f]/10 dark:bg-[#7a9bcb]/15 text-[#1e3a5f] dark:text-[#7a9bcb] shrink-0 group-hover:scale-110 transition-transform duration-300"
                >
                  <MapPin className="w-5 h-5" />
                </span>

                <span className="flex-1 min-w-0">
                  <span className="block text-lg font-bold text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
                    {city.name}
                  </span>
                  <span className="block text-sm text-gray-600 dark:text-gray-400">
                    {city.slug === "polotsk" || city.slug === "novopolotsk"
                      ? "Студия Nexton"
                      : "Запись в студию"}
                  </span>
                </span>

                <ArrowRight
                  className="w-5 h-5 text-[#1e3a5f] dark:text-[#7a9bcb] shrink-0 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <DetailingContacts />

      {/* CTA — на всю ширину */}

      <section className="bg-[#1e3a5f] dark:bg-[#1a2a3a] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Запишитесь в детейлинг-студию
          </h2>
          <p className="text-white/85 mb-6 max-w-xl mx-auto">
            Подберём услугу под ваш авто, рассчитаем стоимость и согласуем время
            визита в студию.
          </p>
          <a
            href="tel:+375297115091"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e3a5f] font-semibold rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
            aria-label="Позвонить в детейлинг-студию"
          >
            📞 +375 (29) 711-50-91
          </a>
        </div>
      </section>
    </main>
  );
}
