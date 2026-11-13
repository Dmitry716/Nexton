import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { detailingServices, detailingCitySlugs } from "@/data/detailing";
import { cities } from "@/data/cities";
import WhyChooseUsDetailing from "@/components/WhyChooseUsDetailing";
import DetailingServicesLinks from "@/components/DetailingServicesLinks";
import DetailingContacts from "@/components/DetailingContacts";
import DetailingServiceCard from "@/components/DetailingServiceCard";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return detailingCitySlugs.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) return { title: "Страница не найдена" };

  const cityPrep = cityData.namePrepositional || cityData.name;

  return {
    title: `Детейлинг-студия Nexton в ${cityPrep} — оклейка, тонировка, химчистка`,
    description: `Детейлинг-студия Nexton в ${cityPrep}: оклейка авто защитной плёнкой от 660 BYN, тонировка по ГОСТ от 330 BYN, химчистка салона, полировка, керамика, антикор. Звоните: +375297115091`,
    keywords: [
      `детейлинг-студия ${cityData.name}`,
      `детейлинг студия ${cityPrep}`,
      `детейлинг ${cityData.name}`,
      `оклейка авто ${cityData.name}`,
      `тонировка авто ${cityData.name}`,
      `химчистка авто ${cityData.name}`,
      `полировка кузова ${cityData.name}`,
    ],
    alternates: {
      canonical: `https://nexton.vip/detailing/${city}`,
    },
    openGraph: {
      title: `Детейлинг-студия Nexton в ${cityPrep}`,
      description: `Оклейка, тонировка, химчистка, полировка, керамика, антикор в детейлинг-студии Nexton в ${cityPrep}.`,
      url: `https://nexton.vip/detailing/${city}`,
      siteName: "Nexton",
      images: [
        { url: "/detailing-hero-poster.jpg", width: 1920, height: 1080 },
      ],
      locale: "ru_RU",
      type: "website",
    },
  };
}

export default async function DetailingCityPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (
    !cityData ||
    !detailingCitySlugs.includes(city as (typeof detailingCitySlugs)[number])
  )
    notFound();

  const cityPrep = cityData.namePrepositional || cityData.name;

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDetailing",
            name: `Детейлинг-студия Nexton в ${cityData.name}`,
            alternateName: `Nexton Detailing ${cityData.name}`,
            description: `Детейлинг-студия Nexton в ${cityPrep}: оклейка, тонировка, химчистка, полировка, керамика, антикор.`,
            url: `https://nexton.vip/detailing/${city}`,
            telephone: "+375297115091",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: cityData.name,
              addressCountry: cityData.country,
            },
            areaServed: { "@type": "City", name: cityData.name },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Услуги детейлинг-студии",
              itemListElement: detailingServices.map((s) => ({
                "@type": "Offer",
                name: s.name,
                priceCurrency: cityData.currency,
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
          <Link
            href="/detailing"
            className="hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:underline"
          >
            Детейлинг-студия
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-black dark:text-white font-medium">
            {cityData.name}
          </span>
        </nav>
      </div>

      {/* HERO — на всю ширину */}
      <header className="relative w-full overflow-hidden mb-16">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32 text-center">
          <p className="text-sm sm:text-base font-semibold tracking-[0.2em] uppercase text-[#a8c4e8] mb-4 hero-fade-in">
            Nexton Detailing
          </p>
          <h1
            lang="ru"
            className="text-[2rem] sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-[1.05] tracking-tight text-balance hero-slide-in"
          >
            Детейлинг-студия в {cityPrep}
          </h1>
          <p
            lang="ru"
            className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed hero-fade-in"
            style={{ animationDelay: "80ms" }}
          >
            Оклейка защитной плёнкой, тонировка по ГОСТ, химчистка салона,
            полировка, керамика и антикор — услуги студии Nexton.
          </p>

          <div
            className="mt-10 flex flex-wrap justify-center gap-4 hero-fade-in"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="tel:+375297115091"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e3a5f] hover:bg-gray-100 font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
              aria-label={`Позвонить в детейлинг-студию в ${cityPrep}`}
            >
              <span aria-hidden="true">📞</span> Позвонить
            </a>
            <a
              href="https://t.me/+375297115091"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/80 text-white hover:bg-white hover:text-[#1e3a5f] font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
              aria-label={`Написать в Telegram детейлинг-студии в ${cityPrep}`}
            >
              <span aria-hidden="true">💬</span> Telegram
            </a>
          </div>
        </div>
      </header>

      {/* Услуги города — в контейнере */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="services-title" className="mb-16">
          <h2
            id="services-title"
            className="text-3xl font-bold text-black dark:text-white mb-8 text-center"
          >
            Услуги детейлинг-студии в {cityPrep}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailingServices.map((service) => (
              <DetailingServiceCard
                key={service.slug}
                service={service}
                href={`/detailing/${city}/${service.slug}`}
                currency={cityData.currency}
                ariaLabel={`${service.name} в ${cityPrep} — от ${service.priceFrom} ${cityData.currency}`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* WhyChooseUsDetailing — НА ВСЮ ШИРИНУ, как на главной */}
      <WhyChooseUsDetailing />

      {/* Остальное — в контейнере */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <DetailingServicesLinks
          city={city}
          title={`Все услуги детейлинга в ${cityPrep}`}
        />
      </div>

      {/* Контакты — без карты (карта только на hub) */}
      <DetailingContacts cityName={cityData.name} showMap={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center pb-16">
          <Link
            href="/detailing"
            className="inline-flex items-center gap-2 text-[#1e3a5f] dark:text-[#7a9bcb] hover:underline font-medium focus:outline-none focus-visible:underline"
          >
            ← Все города детейлинга
          </Link>
        </div>
      </div>
    </main>
  );
}
