import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getCategoryImage } from "@/data/categoryImages";
import { getCategoryVideo } from "@/data/categoryMedia";
import CategoryCover from "@/components/CategoryCover";
import ServiceCard from "@/components/ServiceCard";
import PaymentInfo from "@/components/PaymentInfo"; // 👈 ДОБАВИТЬ ИМПОРТ
import {
  getExchangeRates,
  localizePricesInHtml,
  ratesDisclaimer,
} from "@/lib/nbrb-rates";
import {
  geoPhrase,
  replaceCityInText,
  serviceSeoForSlug,
} from "@/lib/seo-geo";
import {
  getCategoryPageHref,
  hasCategoryLandingPage,
} from "@/data/categories";

interface CityServicePageProps {
  params: Promise<{ city: string; slug: string }>;
}

export async function generateStaticParams() {
  const allCities = cities.map((city) => city.slug);
  const allServices = services.map((service) => service.slug);
  const params = [];
  for (const city of allCities) {
    for (const slug of allServices) {
      params.push({ city, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: CityServicePageProps): Promise<Metadata> {
  const { city, slug } = await params;
  const cityData = cities.find((c) => c.slug === city);
  const service = services.find((s) => s.slug === slug);

  if (!cityData || !service) return { title: "Страница не найдена" };

  const cityName = cityData.name;
  const cityPrep = cityData.namePrepositional || cityName;
  const geo = geoPhrase(city, cityPrep);
  const prioritySeo = serviceSeoForSlug(service.slug, geo, city, cityPrep);

  const categoryNames: Record<string, string> = {
    avtokondicionery: "автокондиционеров",
    otopiteli: "вебасто и автономных отопителей",
    radiatory: "радиаторов",
    svarka: "аргонной сварки",
    gruzovye: "грузовых автомобилей",
    pnevmosistemy_legkovyh: "пневмосистем легковых автомобилей",
    plastik: "автопластика",
    // kuzovnye: "кузовных работ",
    kuzovnye: "кузовному ремонту", // 👈 ДОБАВИТЬ
    antikor: "антикоррозийной обработке",
    diagnostika_podveski: "диагностике подвески",
    kitayskie_avto: "китайских автомобилей",
  };

  const categoryText = categoryNames[service.category] || "ремонту";
  const categoryImage = getCategoryImage(service.category) || "/og-image.jpg";
  const absoluteOgImage = categoryImage.startsWith("http")
    ? categoryImage
    : `https://nexton.vip${categoryImage}`;

  const ogTitle = prioritySeo?.title ?? `${service.name} в ${geo}`;

  const description = replaceCityInText(
    service.description,
    cityName,
    cityPrep,
    city,
  );
  const ogDescription =
    prioritySeo?.description ??
    `${description} Гарантия до 6 месяцев. Запись: +375 (29) 711-50-91.`;

  const pnevmoBrandsKeywords = [
    "bmw",
    "mercedes-benz",
    "audi",
    "volkswagen",
    "skoda",
    "toyota",
    "lexus",
    "honda",
    "hyundai",
    "kia",
    "ford",
    "mazda",
    "nissan",
    "subaru",
    "volvo",
    "land rover",
    "range rover",
    "renault",
    "peugeot",
    "citroen",
  ];

  const kitayskieBrandsKeywords = [
    "geely",
    "chery",
    "haval",
    "changan",
    "exeed",
    "omoda",
    "jaecoo",
    "tank",
    "great wall",
    "belgee",
  ];

  const coolingKeywordCategories = [
    "radiatory",
    "gruzovye",
    "avtokondicionery",
  ];

  const pageTitle = prioritySeo?.title ?? `${service.name} в ${geo}`;

  return {
    title: { absolute: `${pageTitle} | Nexton` },
    description:
      prioritySeo?.description ??
      `Профессиональный ${service.name.toLowerCase()} в ${geo} (${cityData.region}). ${description}. Гарантия до 6 месяцев. Звоните: +375 (29) 711-50-91`,
    alternates: {
      canonical: `https://nexton.vip/${city}/usluga/${service.slug}`,
    },
    keywords: [
      ...(prioritySeo?.keywords ?? []),
      ...service.keywords,
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} ${cityData.name}`,
      `${service.name.toLowerCase()} ${cityData.region}`,
      `ремонт ${categoryText} ${cityData.name}`,
      `ремонт ${categoryText} ${cityData.region}`,
      ...(coolingKeywordCategories.includes(service.category) && !prioritySeo
        ? ["ремонт систем охлаждения"]
        : []),
      ...(service.category === "pnevmosistemy_legkovyh"
        ? pnevmoBrandsKeywords
        : []),
      ...(service.category === "kitayskie_avto"
        ? kitayskieBrandsKeywords
        : []),
    ],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `https://nexton.vip/${city}/usluga/${service.slug}`,
      siteName: "Nexton",
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [absoluteOgImage],
    },
  };
}

export default async function CityServicePage({
  params,
}: CityServicePageProps) {
  const { city, slug } = await params;
  const cityData = cities.find((c) => c.slug === city);
  const service = services.find((s) => s.slug === slug);

  if (!cityData || !service) notFound();

  const cityName = cityData.name;
  const cityPrep = cityData.namePrepositional || cityName;
  const geo = geoPhrase(city, cityPrep);
  const prioritySeo = serviceSeoForSlug(service.slug, geo, city, cityPrep);
  const pageH1 = prioritySeo?.h1 ?? `${service.name} в ${geo}`;

  const categoryNames: Record<string, string> = {
    avtokondicionery: "Заправка и ремонт автокондиционеров",
    otopiteli: "Ремонт вебасто и автономных отопителей",
    radiatory: "Ремонт радиаторов",
    svarka: "Сварка и пайка",
    gruzovye: "Ремонт систем охлаждения и топливных баков грузовых авто",
    pnevmosistemy_legkovyh: "Ремонт и обслуживание пневмосистем легковых авто",
    plastik: "Ремонт автопластика",
    kuzovnye: "Кузовные работы",
    antikor: "Антикоррозийная обработка",
    diagnostika_podveski: "Диагностика подвески",
    kitayskie_avto: "Ремонт китайских автомобилей",
  };

  const pnevmoBrands = [
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Volkswagen",
    "Skoda",
    "Toyota",
    "Lexus",
    "Honda",
    "Hyundai",
    "Kia",
    "Ford",
    "Mazda",
    "Nissan",
    "Subaru",
    "Volvo",
    "Land Rover",
    "Range Rover",
    "Renault",
    "Peugeot",
    "Citroen",
  ];

  const kitayskieBrands = [
    "Geely",
    "Chery",
    "Haval",
    "Changan",
    "Exeed",
    "Omoda",
    "Jaecoo",
    "Tank",
    "Great Wall",
    "Belgee",
  ];

  const categoryImage = getCategoryImage(service.category);

  const rates = await getExchangeRates();
  const currency = cityData.currency;

  const descriptionWithCity = localizePricesInHtml(
    replaceCityInText(service.description, cityName, cityPrep, city),
    currency,
    rates,
  );

  const detailedDescriptionWithCity = localizePricesInHtml(
    replaceCityInText(service.detailedDescription, cityName, cityPrep, city),
    currency,
    rates,
  );

  const acFaq =
    service.slug === "zapravka-kondicionera"
      ? [
          {
            question: `Сколько стоит заправить автокондиционер в машине в ${geo}?`,
            answer:
              "Легковые — от 50 Br, внедорожники и минивэны — от 100 Br, грузовые — от 150 Br. В стоимость входят проверка, вакуумирование, фреон, масло и УФ-краситель.",
          },
          {
            question: "Какая цена и стоимость заправки автокондиционера?",
            answer:
              "Ориентир: от 50 Br для легкового. Точная сумма зависит от объёма системы и необходимости дозаправки масла. Смету называем до работ. Бытовые кондиционеры не обслуживаем — только автомобильные.",
          },
          {
            question: "Нужна ли диагностика перед заправкой?",
            answer:
              "Да. Если потеря фреона больше 15% в год — ищем утечку. Иначе заправка без ремонта не даст результата.",
          },
          {
            question: `Где заправить автокондиционер в ${geo}?`,
            answer:
              "В автосервисе Nexton: г. Полоцк, ул. Строительная 21в/3, блок 9, бокс 3. Обслуживаем Полоцк и Новополоцк. Работаем только с автокондиционерами автомобилей.",
          },
        ]
      : service.slug === "remont-kondicionera-utechki"
        ? [
            {
              question: `Сколько стоит ремонт автокондиционера в ${geo}?`,
              answer:
                "Диагностика — от 20 Br, замена уплотнителей — от 30 Br/шт, пайка трубки — от 30 Br, осушитель — от 50 Br + запчасть. Точная смета после поиска утечки.",
            },
            {
              question: "Как находите утечку фреона?",
              answer:
                "Электронным течеискателем, УФ-красителем и опрессовкой азотом — так локализуем даже микротрещины.",
            },
            {
              question: "Чем ремонт отличается от заправки?",
              answer:
                "Заправка восполняет хладагент. Ремонт устраняет причину потери фреона. Без ремонта повторная заправка обычно снова «уходит».",
            },
          ]
        : service.slug === "diagnostika-podveski-vibrostend"
          ? [
              {
                question: `Сколько стоит диагностика подвески на вибростенде в ${cityPrep}?`,
                answer:
                  "Легковые — 70 Br, кроссоверы и внедорожники — 90 Br, пневмоподвеска — от 90 Br. Результат и отчёт за 15–20 минут.",
              },
              {
                question: `Где пройти вибростенд для диагностики подвески (${cityName})?`,
                answer:
                  "В автосервисе Nexton: г. Полоцк, ул. Строительная 21в/3, блок 9, бокс 3. Принимаем клиентов из всех регионов Беларуси.",
              },
              {
                question: "Что показывает вибростенд?",
                answer:
                  "Состояние амортизаторов, пружин, сайлентблоков и элементов ходовой — без разборки. Выдаём отчёт с рекомендациями по ремонту.",
              },
              {
                question: "Нужна ли запись на вибростенд?",
                answer:
                  "Желательна. Звоните +375 (29) 711-50-91 — подскажем свободное окно.",
              },
            ]
          : null;

  const priceNote =
    currency === "BYN" ? null : ratesDisclaimer(rates, currency);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pageH1,
    description: descriptionWithCity,
    provider: {
      "@type": "AutoRepair",
      name: "Nexton",
      url: "https://nexton.vip",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Строительная 21в/3, блок 9, бокс 3",
        addressLocality: "Полоцк",
        addressRegion: "Витебская область",
        postalCode: "211400",
        addressCountry: "BY",
      },
      telephone: "+375297115091",
    },
    areaServed: {
      "@type": "City",
      name: cityData.name,
    },
  };

  const categoryHref = hasCategoryLandingPage(service.category)
    ? getCategoryPageHref(service.category, city)
    : `/${city}#services`;
  const categoryLabel =
    service.category === "kitayskie_avto"
      ? "Китайские авто"
      : service.category === "kuzovnye"
        ? "Кузовной ремонт"
        : service.category === "antikor"
          ? "Антикор"
          : service.category === "otopiteli"
            ? "Ремонт вебасто"
            : "Услуги";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://nexton.vip/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cityData.name,
        item: `https://nexton.vip/${city}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `https://nexton.vip${categoryHref}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: service.name,
        item: `https://nexton.vip/${city}/usluga/${service.slug}`,
      },
    ],
  };

  const pnevmoFaqSchema =
    service.category === "pnevmosistemy_legkovyh"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `Какие легковые автомобили с пневмоподвеской вы обслуживаете в ${cityData.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Обслуживаем популярные марки: BMW, Mercedes-Benz, Audi, Volkswagen, Land Rover, Volvo и другие легковые автомобили с пневмоподвеской в ${cityData.name} и ${cityData.region}.`,
              },
            },
            {
              "@type": "Question",
              name: `По каким признакам понять, что нужна диагностика пневмоподвески в ${cityData.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: "Основные признаки: просадка кузова после стоянки, ошибки подвески на панели, неравномерная высота автомобиля и посторонние шумы компрессора.",
              },
            },
            {
              "@type": "Question",
              name: `Сколько стоит ремонт пневмосистемы в ${cityData.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ориентировочные цены на странице услуги указаны в BYN. Точная стоимость зависит от результатов диагностики и объема работ.",
              },
            },
            {
              "@type": "Question",
              name: `Работаете ли вы в ${cityData.name} и ${cityData.region}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Да, выполняем диагностику и ремонт пневмосистем в ${cityData.name} и ${cityData.region} по предварительной записи.`,
              },
            },
          ],
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {pnevmoFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pnevmoFaqSchema),
          }}
        />
      )}

      <div className="min-h-screen bg-white dark:bg-black">
        {(getCategoryVideo(service.category) || categoryImage) && (
          <div className="relative w-full h-56 sm:h-72 md:h-80 bg-gray-100 dark:bg-gray-900">
            <CategoryCover
              categoryId={service.category}
              alt={`${service.name} в ${cityPrep}`}
              className="absolute inset-0 overflow-hidden"
              sizes="100vw"
              priority
              variant="full"
              allowVideo
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
              <p className="text-white/90 text-sm mb-1">
                {categoryNames[service.category]}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {pageH1}
              </h1>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 flex-wrap">
            <Link
              href="/"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Главная
            </Link>
            <span>/</span>
            <Link
              href={`/${city}`}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {cityName}
            </Link>
            <span>/</span>
            <Link
              href={categoryHref}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-black dark:text-white">{service.name}</span>
          </div>

          <Link
            href={categoryHref}
            className="inline-flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Назад к {categoryLabel.toLowerCase()} в {geo}
          </Link>

          <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-lg">
            <div className="p-6 sm:p-8 md:p-10">
              {!categoryImage && (
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
                  {pageH1}
                </h1>
              )}

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {descriptionWithCity}
              </p>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailedDescriptionWithCity,
                  }}
                />
              </div>

              {acFaq && (
                <section className="mt-10" aria-labelledby="ac-faq-title">
                  <h2
                    id="ac-faq-title"
                    className="text-2xl font-bold text-black dark:text-white mb-4"
                  >
                    Частые вопросы
                  </h2>
                  <div className="space-y-4">
                    {acFaq.map((item) => (
                      <div
                        key={item.question}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4"
                      >
                        <h3 className="font-semibold text-black dark:text-white mb-2">
                          {item.question}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: acFaq.map((item) => ({
                          "@type": "Question",
                          name: item.question,
                          acceptedAnswer: {
                            "@type": "Answer",
                            text: item.answer,
                          },
                        })),
                      }),
                    }}
                  />
                </section>
              )}

              {(service.slug === "zapravka-kondicionera" ||
                service.slug === "remont-kondicionera-utechki") && (
                <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                  Смотрите также:{" "}
                  {service.slug === "zapravka-kondicionera" ? (
                    <Link
                      href={`/${city}/usluga/remont-kondicionera-utechki`}
                      className="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                    >
                      ремонт автокондиционера и устранение утечек в {geo}
                    </Link>
                  ) : (
                    <Link
                      href={`/${city}/usluga/zapravka-kondicionera`}
                      className="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                    >
                      заправка автокондиционера в {geo}
                    </Link>
                  )}
                  .
                </p>
              )}

              {priceNote && (
                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4">
                  {priceNote}
                </p>
              )}

              {cityData.country !== "BY" && (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Работы выполняются в автосервисе Nexton в Полоцке (Беларусь).
                  Обслуживаем клиентов из {cityPrep}.
                </p>
              )}

              {service.category === "pnevmosistemy_legkovyh" && (
                <div className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
                  <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
                    Ремонт пневмы популярных марок
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Выполняем ремонт пневмы{" "}
                    <span className="font-semibold">в {cityPrep}</span> для
                    следующих марок:
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {pnevmoBrands.map((brand) => (
                      <li
                        key={brand}
                        className="px-3 py-2 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-200"
                      >
                        <span className="font-semibold">{brand}</span>
                        {` — ремонт пневмы в ${cityPrep}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.category === "kitayskie_avto" && (
                <div className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
                  <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
                    Ремонт китайских марок
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Принимаем бензиновые модели на диагностику и ремонт{" "}
                    <span className="font-semibold">в {cityPrep}</span>.
                    Электромобили не обслуживаем:
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {kitayskieBrands.map((brand) => (
                      <li
                        key={brand}
                        className="px-3 py-2 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-200"
                      >
                        <span className="font-semibold">{brand}</span>
                        {` — ремонт в ${cityPrep}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                  Записаться на {service.name.toLowerCase()} в {cityPrep}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Адрес:</strong> г. Полоцк, ул. Строительная 21в/3,
                      блок 9, бокс 3
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Обслуживаем:</strong> {cityName} и область
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a
                      href="tel:+375297115091"
                      className="btn-primary text-center"
                    >
                      Позвонить: +375 (29) 711-50-91
                    </a>
                    <a
                      href="https://t.me/+375297115091"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-center"
                    >
                      Написать в Telegram
                    </a>
                  </div>
                </div>
              </div>

              {/* 👇👇👇 СЮДА ВСТАВИТЬ PaymentInfo 👇👇👇 */}
              <div className="mt-12">
                <PaymentInfo />
              </div>
              {/* 👆👆👆 КОНЕЦ ВСТАВКИ 👆👆👆 */}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
              Другие услуги в этой категории
            </h2>
            {services
              .filter(
                (s) => s.category === service.category && s.id !== service.id,
              )
              .slice(0, 6).length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter(
                    (s) =>
                      s.category === service.category && s.id !== service.id,
                  )
                  .slice(0, 6)
                  .map((relatedService) => (
                    <ServiceCard
                      key={relatedService.id}
                      service={relatedService}
                      city={city}
                    />
                  ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  В категории{" "}
                  <span className="font-semibold">
                    {categoryNames[service.category]}
                  </span>{" "}
                  пока нет других услуг. Мы выполняем диагностику и ремонт по
                  вашей проблеме, звоните или оставляйте заявку — подскажем по
                  стоимости и срокам.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
