import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getCategoryImage, getCategoryImageThumb } from "@/data/categoryImages";
import ServiceCard from "@/components/ServiceCard";

interface CityServicePageProps {
  params: Promise<{ city: string; slug: string }>;
}

// Функция для замены города в тексте
function replaceCityInText(text: string, cityName: string, cityPrep: string) {
  return text
    .replace(/Полоцке и Новополоцке/g, cityPrep)
    .replace(/Полоцк и Новополоцк/g, cityName)
    .replace(/Полоцке/g, cityPrep)
    .replace(/Полоцк/g, cityName)
    .replace(/Новополоцке/g, cityPrep)
    .replace(/Новополоцк/g, cityName);
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

  const categoryNames: Record<string, string> = {
    avtokondicionery: "автокондиционеров",
    otopiteli: "автономных отопителей",
    radiatory: "радиаторов",
    svarka: "аргонной сварки",
    gruzovye: "грузовых автомобилей",
    pnevmosistemy_legkovyh: "пневмосистем легковых автомобилей",
    plastik: "автопластика",
    kuzovnye: "кузовных работ",
  };

  const categoryText = categoryNames[service.category] || "ремонту";
  const categoryImage = getCategoryImage(service.category) || "/og-image.jpg";
  const absoluteOgImage = categoryImage.startsWith("http")
    ? categoryImage
    : `https://nexton.vip${categoryImage}`;
  const ogTitle = `${service.name} в ${cityData.name}`;

  // Заменяем город в описании для SEO
  const description = replaceCityInText(
    service.description,
    cityName,
    cityPrep,
  );
  const ogDescription = `${description} Гарантия до 6 месяцев. Запись: +375 (29) 711-50-91.`;

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

  return {
    title: `${service.name} в ${cityData.name}`,
    description: `Профессиональный ${service.name.toLowerCase()} в ${cityData.name} (${cityData.region}). ${description}. Гарантия до 6 месяцев. Звоните: +375 (29) 711-50-91`,
    alternates: {
      canonical: `/${city}/usluga/${service.slug}`,
    },
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} ${cityData.name}`,
      `${service.name.toLowerCase()} ${cityData.region}`,
      `ремонт ${categoryText} ${cityData.name}`,
      `ремонт ${categoryText} ${cityData.region}`,
      "ремонт систем охлаждения",
      ...(service.category === "pnevmosistemy_legkovyh"
        ? pnevmoBrandsKeywords
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

  const categoryNames: Record<string, string> = {
    avtokondicionery: "Заправка и ремонт кондиционеров",
    otopiteli: "Ремонт автономных отопителей",
    radiatory: "Ремонт радиаторов",
    svarka: "Сварка и пайка",
    gruzovye: "Ремонт систем охлаждения и топливных баков грузовых авто",
    pnevmosistemy_legkovyh: "Ремонт и обслуживание пневмосистем легковых авто",
    plastik: "Ремонт автопластика",
    kuzovnye: "Кузовные работы",
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

  const categoryImage = getCategoryImage(service.category);

  // Заменяем город в описании услуги
  const descriptionWithCity = replaceCityInText(
    service.description,
    cityName,
    cityPrep,
  );

  const detailedDescriptionWithCity = replaceCityInText(
    service.detailedDescription,
    cityName,
    cityPrep,
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
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
        name: "Услуги",
        item: `https://nexton.vip/${city}#services`,
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

      <div className="min-h-screen bg-white dark:bg-black pt-20">
        {categoryImage && (
          <div className="relative w-full h-56 sm:h-72 md:h-80 bg-gray-100 dark:bg-gray-900">
            <Image
              src={categoryImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <p className="text-white/90 text-sm mb-1">
                {categoryNames[service.category]}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {service.name} в {cityPrep}
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
              href={`/${city}#services`}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Услуги
            </Link>
            <span>/</span>
            <span className="text-black dark:text-white">{service.name}</span>
          </div>

          <Link
            href={`/${city}#services`}
            className="inline-flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Назад к услугам в {cityPrep}
          </Link>

          <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-lg">
            <div className="p-6 sm:p-8 md:p-10">
              {!categoryImage && (
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
                  {service.name} в {cityPrep}
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
                      imageUrl={
                        getCategoryImageThumb(service.category) ?? undefined
                      }
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
