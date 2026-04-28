import Image from "next/image";
import { services } from "@/data/services";
import { categoryImages, categoryImageThumbs } from "@/data/categoryImages";
import ServiceCard from "@/components/ServiceCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from 'next';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Генерация метаданных для каждой услуги
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Услуга не найдена | Nexton',
    };
  }

  const categoryNames: Record<string, string> = {
    avtokondicionery: "автокондиционеров",
    otopiteli: "автономных отопителей",
    radiatory: "радиаторов",
    svarka: "аргонной сварки",
    gruzovye: "грузовых автомобилей",
    pnevmosistemy_legkovyh: "пневмосистем легковых автомобилей",
    plastik: "автопластика"
  };

  const categoryText = categoryNames[service.category] || "ремонту";
  const absoluteOgImage =
    (categoryImages[service.category] || "").startsWith("http")
      ? (categoryImages[service.category] as string)
      : `https://nexton.vip${categoryImages[service.category] || "/og-image.jpg"}`;
  const ogTitle = `${service.name} в Полоцке и Новополоцке`;
  const ogDescription = `${service.description} Гарантия до 6 месяцев. Запись: +375 (29) 711-50-91.`;
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
    title: `${service.name} в Полоцке и Новополоцке`,
    description: `Профессиональный ${service.name.toLowerCase()} в Полоцке и Новополоцке. ${service.description}. Гарантия до 6 месяцев. Звоните: +375 (29) 711-50-91`,
    alternates: {
      canonical: `/usluga/${service.slug}`,
    },
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} Полоцк`,
      `${service.name.toLowerCase()} Новополоцк`,
      `ремонт ${categoryText} Полоцк`,
      `ремонт ${categoryText} Новополоцк`,
      "ремонт систем охлаждения Полоцк",
      "ремонт систем охлаждения Новополоцк",
      "заправка кондиционера Полоцк",
      "заправка кондиционера Новополоцк",
      "Webasto Полоцк",
      "Webasto Новополоцк",
      ...(service.category === "pnevmosistemy_legkovyh"
        ? pnevmoBrandsKeywords
        : []),
    ],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `https://nexton.vip/usluga/${service.slug}`,
      siteName: 'Nexton Полоцк — Новополоцк',
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [absoluteOgImage],
    },
  };
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const categoryNames: Record<string, string> = {
    avtokondicionery: "Заправка и ремонт кондиционеров",
    otopiteli: "Ремонт автономных отопителей",
    radiatory: "Ремонт радиаторов",
    svarka: "Сварка и пайка",
    gruzovye: "Ремонт систем охлаждения и топлывных баков грузовых авто",
    pnevmosistemy_legkovyh: "Ремонт и обслуживание пневмосистем легковых авто",
    plastik: "Ремонт автопластика"
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

  // Schema.org разметка
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "AutoRepair",
      "name": "Nexton",
      "url": "https://nexton.vip",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Строительная 21в/3, блок 9, бокс 3",
        "addressLocality": "Полоцк",
        "addressRegion": "Витебская область",
        "postalCode": "211400",
        "addressCountry": "BY"
      },
      "telephone": "+375297115091"
    },
    "areaServed": {
      "@type": "City",
      "name": "Полоцк"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />

      <div className="min-h-screen bg-white dark:bg-black pt-20">
        {/* Герой с изображением услуги */}
        {categoryImages[service.category] && (
          <div className="relative w-full h-56 sm:h-72 md:h-80 bg-gray-100 dark:bg-gray-900">
            <Image
              src={categoryImages[service.category]}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <p className="text-white/90 text-sm mb-1">{categoryNames[service.category]}</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {service.name} в Полоцке и Новополоцке
              </h1>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Хлебные крошки */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 flex-wrap">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Главная
            </Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-black dark:hover:text-white transition-colors">
              Услуги
            </Link>
            <span>/</span>
            <Link href={`/#${service.category}`} className="hover:text-black dark:hover:text-white transition-colors">
              {categoryNames[service.category]}
            </Link>
            <span>/</span>
            <span className="text-black dark:text-white">{service.name}</span>
          </div>

          <Link
            href="/#services"
            className="inline-flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors mb-8 group border-b border-gray-300 dark:border-gray-700 pb-1"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Назад к услугам
          </Link>

          <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-lg">
            <div className="p-6 sm:p-8 md:p-10">
              {!categoryImages[service.category] && (
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
                  {service.name} в Полоцке и Новополоцке
                </h1>
              )}
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {service.description}
            </p>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: service.detailedDescription }} />
            </div>

            {service.category === "pnevmosistemy_legkovyh" && (
              <div className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
                <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
                  Ремонт пневмы популярных марок
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Выполняем ремонт пневмы{" "}
                  <span className="font-semibold">в Полоцке и Новополоцке</span>{" "}
                  для следующих марок:
                </p>

                <ul className="flex flex-wrap gap-2">
                  {pnevmoBrands.map((brand) => (
                    <li
                      key={brand}
                      className="px-3 py-2 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-200"
                    >
                      <span className="font-semibold">{brand}</span>
                      {` — ремонт пневмы в Полоцке и Новополоцке`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Контактный блок */}
            <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                Записаться на {service.name.toLowerCase()} в Полоцке и Новополоцке
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Адрес:</strong> г. Полоцк, ул. Строительная 21в/3, блок 9, бокс 3
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Режим работы:</strong> Пн-Пт 10.00-18.00, Сб-Вс - выходной
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
                  <a
                    href="https://vk.com/club164841898"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-center"
                  >
                    Группа ВКонтакте
                  </a>
                  <a
                    href="https://www.instagram.com/nextonservice/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-center"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Похожие услуги */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
              Другие услуги в этой категории
            </h2>
            {services.filter((s) => s.category === service.category && s.id !== service.id)
              .slice(0, 6).length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter((s) => s.category === service.category && s.id !== service.id)
                  .slice(0, 6)
                  .map((relatedService) => (
                    <ServiceCard
                      key={relatedService.id}
                      service={relatedService}
                      imageUrl={categoryImageThumbs[service.category]}
                    />
                  ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  В категории <span className="font-semibold">{categoryNames[service.category]}</span> пока нет других услуг. 
                  Мы выполняем диагностику и ремонт по вашей проблеме, звоните или оставляйте заявку — подскажем по стоимости и срокам.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
