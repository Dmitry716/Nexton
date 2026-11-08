import type { Metadata } from "next";
import Link from "next/link";
import { detailingServices, detailingCitySlugs } from "@/data/detailing";
import { cities } from "@/data/cities";
import { ArrowRight, MapPin } from "lucide-react";
import DetailingContacts from "@/components/DetailingContacts";
import WhyChooseUsDetailing from "@/components/WhyChooseUsDetailing";

export const metadata: Metadata = {
  title:
    "Детейлинг в Полоцке, Витебске, Минске — оклейка, тонировка, химчистка | Nexton",
  description:
    "Профессиональный детейлинг: оклейка авто защитной плёнкой от 660 BYN, тонировка по ГОСТ от 330 BYN, химчистка салона от 708 BYN, керамика, полировка, антикор. Рассрочка до 5 месяцев. Звоните: +375297115091",
  keywords: [
    "детейлинг",
    "детейлинг Беларусь",
    "оклейка авто",
    "тонировка авто",
    "химчистка авто",
    "полировка кузова",
    "керамика авто",
    "антикор",
    "детейлинг Витебск",
    "детейлинг Минск",
  ],
  alternates: { canonical: "https://nexton.vip/detailing" },
  openGraph: {
    title: "Детейлинг — Nexton",
    description: "Оклейка, тонировка, химчистка, керамика, полировка, антикор.",
    url: "https://nexton.vip/detailing",
    siteName: "Nexton",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "ru_RU",
    type: "website",
  },
};

export default function DetailingHubPage() {
  const detailingCities = cities.filter((c) =>
    detailingCitySlugs.includes(c.slug as (typeof detailingCitySlugs)[number]),
  );

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-[124px] pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDetailing",
            name: "Nexton Detailing",
            description:
              "Детейлинг студия: оклейка, тонировка, химчистка, полировка, керамика, антикор.",
            url: "https://nexton.vip/detailing",
            telephone: "+375297115091",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Витебск",
              addressCountry: "BY",
            },
            areaServed: detailingCities.map((c) => ({
              "@type": "City",
              name: c.name,
            })),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Услуги детейлинга",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="text-sm text-gray-500 dark:text-gray-400 mb-6"
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
            Детейлинг
          </span>
        </nav>
      </div>

      {/* HERO — на всю ширину, как WhyChooseUsDetailing */}
      <header className="relative w-full overflow-hidden">
        {/* Видео-фон */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/detailing-hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/detailing-hero.mp4" type="video/mp4" />
        </video>

        {/* Оверлей для контраста (WCAG AA) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#1e3a5f]/70 dark:bg-black/75"
        />

        {/* Контент hero — в контейнере, но сам hero на всю ширину */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 text-center">
          <h1
            lang="ru"
            className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight text-balance hero-slide-in"
          >
            Детейлинг автомобилей
          </h1>
          <p
            className="mt-4 text-base sm:text-lg md:text-xl font-semibold text-[#a8c4e8] max-w-3xl mx-auto hero-fade-in"
            style={{ animationDelay: "80ms" }}
          >
            Услуги, цены и где заказать в Полоцке, Витебске, Минске
          </p>
          <p
            lang="ru"
            className="mt-6 text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed hero-fade-in"
            style={{ animationDelay: "160ms" }}
          >
            Оклейка защитной плёнкой, тонировка по ГОСТ, химчистка салона,
            полировка, керамика и антикор.
          </p>

          <div
            className="mt-10 flex flex-wrap justify-center gap-4 hero-fade-in"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="tel:+375297115091"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e3a5f] hover:bg-gray-100 font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
              aria-label="Позвонить в детейлинг-студию Nexton по номеру +375 29 711-50-91"
            >
              <span aria-hidden="true">📞</span> Позвонить
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

      {/* Дальше — контент в контейнере */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="services-title" className="my-20">
          <h2
            id="services-title"
            className="text-3xl font-bold text-black dark:text-white mb-8 text-center"
          >
            Услуги детейлинга
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailingServices.map((service) => (
              <Link
                key={service.slug}
                href={`/detailing/polotsk/${service.slug}`}
                className="group block rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden detailing-card hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] focus-visible:ring-offset-2"
                aria-label={`${service.name} — от ${service.priceFrom} BYN, подробнее`}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">
                      от {service.priceFrom} BYN
                    </p>
                    <ArrowRight
                      className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb] group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
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
              Где мы работаем
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Детейлинг-студии Nexton в Полоцке, Витебске и Минске — приезжайте
              или запишитесь онлайн.
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
                    Детейлинг-студия
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
            Готовы записаться на детейлинг?
          </h2>
          <p className="text-white/85 mb-6 max-w-xl mx-auto">
            Позвоните или напишите — подберём услугу и рассчитаем стоимость.
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
