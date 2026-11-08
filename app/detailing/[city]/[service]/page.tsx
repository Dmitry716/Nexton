import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  detailingServices,
  detailingCitySlugs,
  getDetailingService,
} from "@/data/detailing";
import { cities } from "@/data/cities";
import WhyChooseUsDetailing from "@/components/WhyChooseUsDetailing";
import DetailingServicesLinks from "@/components/DetailingServicesLinks";
import DetailingServiceSteps from "@/components/DetailingServiceSteps";
import DetailingServiceReviews from "@/components/DetailingServiceReviews";
import DetailingServiceMistakes from "@/components/DetailingServiceMistakes";
import { Clock, MapPin, Phone, ShieldCheck } from "lucide-react";

interface PageProps {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const city of detailingCitySlugs) {
    for (const service of detailingServices) {
      params.push({ city, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city, service: serviceSlug } = await params;
  const cityData = cities.find((c) => c.slug === city);
  const service = getDetailingService(serviceSlug);
  if (!cityData || !service) return { title: "Страница не найдена" };

  const cityPrep = cityData.namePrepositional || cityData.name;
  const title = `${service.name} в ${cityPrep} — от ${service.priceFrom} ${cityData.currency} | Nexton`;
  const description = `${service.description} Цена от ${service.priceFrom} ${cityData.currency}. Гарантия до 5 лет. Звоните: +375297115091`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${cityData.name}`,
      `${service.name.toLowerCase()} ${cityPrep}`,
      `${service.name.toLowerCase()} цена ${cityData.name}`,
      ...service.keywords
        .filter(
          (k) => !/Витебск|Полоцк|Минск|Могилёв|Гомель|Брест|Гродно/i.test(k),
        )
        .map((k) => `${k} ${cityData.name}`),
    ],
    alternates: {
      canonical: `https://nexton.vip/detailing/${city}/${serviceSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://nexton.vip/detailing/${city}/${serviceSlug}`,
      siteName: "Nexton",
      images: [{ url: service.image, width: 1200, height: 630 }],
      locale: "ru_RU",
      type: "website",
    },
  };
}

export default async function DetailingServicePage({ params }: PageProps) {
  const { city, service: serviceSlug } = await params;
  const cityData = cities.find((c) => c.slug === city);
  const service = getDetailingService(serviceSlug);
  if (
    !cityData ||
    !service ||
    !detailingCitySlugs.includes(city as (typeof detailingCitySlugs)[number])
  ) {
    notFound();
  }

  const cityPrep = cityData.namePrepositional || cityData.name;

  const faq = [
    {
      q: `Сколько стоит ${service.name.toLowerCase()} в ${cityPrep}?`,
      a: `Цена — от ${service.priceFrom} ${cityData.currency}. Итоговая стоимость зависит от класса автомобиля и выбранных материалов. Точную смету дадим после осмотра или по фото.`,
    },
    {
      q: `Сколько длится ${service.name.toLowerCase()}?`,
      a: `Время работ — ${service.duration}. Точный срок сообщим при записи, зависит от состояния авто.`,
    },
    {
      q: `Даёте ли гарантию на ${service.name.toLowerCase()}?`,
      a: `Да, на работу и материалы — до 5 лет. Договор и чек обязательны.`,
    },
    {
      q: `Где вы находитесь в ${cityPrep}?`,
      a: `Приезжайте по адресу студии — уточните при записи по телефону +375 29 711-50-91. `,
    },
  ];

  const averageRating =
    service.reviews.length > 0
      ? (
          service.reviews.reduce((sum, r) => sum + r.rating, 0) /
          service.reviews.length
        ).toFixed(1)
      : "5.0";

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-[56px] sm:pt-[72px] pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: `${service.name} в ${cityPrep}`,
              description: service.longDescription,
              provider: {
                "@type": "AutoDetailing",
                name: `Nexton Detailing ${cityData.name}`,
                url: `https://nexton.vip/detailing/${city}`,
                telephone: "+375297115091",
              },
              areaServed: { "@type": "City", name: cityData.name },
              offers: {
                "@type": "Offer",
                priceCurrency: cityData.currency,
                price: service.priceFrom,
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: averageRating,
                reviewCount: service.reviews.length,
                bestRating: "5",
              },
              review: service.reviews.map((r) => ({
                "@type": "Review",
                author: { "@type": "Person", name: r.name },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: r.rating,
                  bestRating: "5",
                },
                reviewBody: r.text,
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ]),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex flex-wrap items-center"
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
            Детейлинг
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link
            href={`/detailing/${city}`}
            className="hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:underline"
          >
            {cityData.name}
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-black dark:text-white font-medium">
            {service.name}
          </span>
        </nav>
      </div>

      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 hero-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 leading-tight">
          {service.name} в{" "}
          <span className="text-[#1e3a5f] dark:text-[#7a9bcb]">{cityPrep}</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-[#1e3a5f]/10 dark:bg-[#7a9bcb]/15 text-[#1e3a5f] dark:text-[#7a9bcb] font-medium">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            Гарантия до 5 лет
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-[#1e3a5f]/10 dark:bg-[#7a9bcb]/15 text-[#1e3a5f] dark:text-[#7a9bcb] font-medium">
            <Clock className="w-4 h-4" aria-hidden="true" />
            {service.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-[#1e3a5f]/10 dark:bg-[#7a9bcb]/15 text-[#1e3a5f] dark:text-[#7a9bcb] font-medium">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            {cityData.name}
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-baseline gap-3 mb-4">
            <p className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] dark:text-[#7a9bcb]">
              от {service.priceFrom} {cityData.currency}
            </p>
            {service.priceTo && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                до {service.priceTo} {cityData.currency}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+375297115091"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a5f] hover:bg-[#2b4c7c] text-white font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2"
              aria-label={`Позвонить и записаться на ${service.name} в ${cityPrep}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Позвонить
            </a>
            <a
              href="https://t.me/+375297115091"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1e3a5f] dark:border-[#7a9bcb] text-[#1e3a5f] dark:text-[#7a9bcb] hover:bg-[#1e3a5f] dark:hover:bg-[#7a9bcb] hover:text-white dark:hover:text-black font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] focus-visible:ring-offset-2"
              aria-label="Написать в Telegram"
            >
              Telegram
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <article className="lg:col-span-2 prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Что входит в услугу
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {service.longDescription}
            </p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8 mb-4">
              Кому подходит
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>Новый автомобиль</strong> — защита ЛКП с первых дней
              </li>
              <li>
                <strong>Авто после покупки с пробегом</strong> — восстановление
                внешнего вида
              </li>
              <li>
                <strong>Подготовка к продаже</strong> — повышение стоимости
              </li>
              <li>
                <strong>Регулярный уход</strong> — поддержание состояния
              </li>
            </ul>
          </article>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-32 space-y-4">
              <div className="bg-[#1e3a5f] dark:bg-[#1a2a3a] rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  Запишитесь на {service.name.toLowerCase()}
                </h3>
                <p className="text-sm text-white/85 mb-4">
                  Рассчитаем стоимость и подберём время. 
                </p>
                <a
                  href="tel:+375297115091"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#1e3a5f] font-semibold rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
                  aria-label="Позвонить в детейлинг-студию"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  +375 (29) 711-50-91
                </a>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-base font-bold text-black dark:text-white mb-3">
                  Почему Nexton
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <ShieldCheck
                      className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    Гарантия до 5 лет
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock
                      className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {service.duration}
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin
                      className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {cityData.name}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Как проходит услуга — 4 шага */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DetailingServiceSteps
          steps={service.steps}
          serviceName={service.name}
        />
      </div>

      {/* Почему выбирают — на всю ширину */}
      <div className="my-20">
        <WhyChooseUsDetailing />
      </div>

      {/* Отзывы с рейтингом */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DetailingServiceReviews
          reviews={service.reviews}
          serviceName={service.name}
        />

        <DetailingServiceMistakes
          mistakes={service.mistakes}
          serviceName={service.name}
        />
      </div>

      {/* FAQ */}
      <section
        aria-labelledby="faq-title"
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <h2
          id="faq-title"
          className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 text-center"
        >
          Вопросы и ответы
        </h2>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 open:shadow-md transition-shadow"
            >
              <summary className="cursor-pointer font-semibold text-black dark:text-white list-none flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] rounded-lg">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] text-xl group-open:rotate-45 transition-transform"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DetailingServicesLinks
          city={city}
          title="Другие услуги детейлинга"
          excludeSlug={service.slug}
        />

        <section aria-labelledby="other-cities-title" className="mb-16">
          <h2
            id="other-cities-title"
            className="text-2xl font-bold text-black dark:text-white mb-6 text-center"
          >
            {service.name} в других городах
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {detailingCitySlugs
              .filter((s) => s !== city)
              .map((slug) => {
                const c = cities.find((x) => x.slug === slug);
                if (!c) return null;
                return (
                  <Link
                    key={slug}
                    href={`/detailing/${slug}/${service.slug}`}
                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] focus-visible:ring-offset-2"
                    aria-label={`${service.name} в ${c.namePrepositional}`}
                  >
                    {c.namePrepositional}
                  </Link>
                );
              })}
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/detailing/${city}`}
            className="inline-flex items-center gap-2 text-[#1e3a5f] dark:text-[#7a9bcb] hover:underline font-medium focus:outline-none focus-visible:underline"
          >
            ← Все услуги детейлинга в {cityPrep}
          </Link>
          <Link
            href="/detailing"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:underline font-medium focus:outline-none focus-visible:underline"
          >
            ← Все города
          </Link>
        </div>
      </div>
    </main>
  );
}
