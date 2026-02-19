import { services } from "@/data/services";
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
      title: 'Услуга не найдена | Nexton Полоцк',
    };
  }

  const categoryNames: Record<string, string> = {
    avtokondicionery: "автокондиционеров",
    otopiteli: "автономных отопителей",
    radiatory: "радиаторов",
    svarka: "аргонной сварки",
    gruzovye: "грузовых автомобилей",
    plastik: "автопластика"
  };

  const categoryText = categoryNames[service.category] || "ремонту";

  return {
    title: `${service.name} в Полоцке | Nexton`,
    description: `Профессиональный ${service.name.toLowerCase()} в Полоцке. ${service.description}. Гарантия до 6 месяцев. Звоните: +375297115091`,
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} Полоцк`,
      `ремонт ${categoryText} Полоцк`,
      "ремонт систем охлаждения Полоцк",
      "заправка кондиционера Полоцк",
      "Webasto Полоцк",
    ],
    openGraph: {
      title: `${service.name} в Полоцке`,
      description: service.description,
      url: `https://nexton.vip/usluga/${service.slug}`,
      siteName: 'Nexton Полоцк',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${service.name} в Полоцке - Nexton`,
        },
      ],
      locale: 'ru_RU',
      type: 'website',
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
    avtokondicionery: "Автокондиционеры",
    otopiteli: "Автономные отопители",
    radiatory: "Радиаторы",
    svarka: "Сварка и пайка",
    gruzovye: "Грузовые авто",
    plastik: "Автопластик"
  };

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

      <div className="min-h-screen bg-white dark:bg-black pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
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

          <div className="border-2 border-gray-200 dark:border-gray-800 p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              {service.name} в Полоцке
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {service.description}
            </p>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: service.detailedDescription }} />
            </div>

            {/* Контактный блок */}
            <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                Записаться на {service.name.toLowerCase()} в Полоцке
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Адрес:</strong> г. Полоцк, ул. Строительная 21в/3, блок 9, бокс 3
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Режим работы:</strong> Пн-Пт 09:00-19:00, Сб 10:00-16:00
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

          {/* Похожие услуги */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
              Другие услуги в этой категории
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services
                .filter(s => s.category === service.category && s.id !== service.id)
                .slice(0, 4)
                .map((relatedService) => (
                  <Link
                    key={relatedService.id}
                    href={`/usluga/${relatedService.slug}`}
                    className="card p-4 hover:translate-y-[-2px] transition-all duration-200"
                  >
                    <h3 className="font-semibold text-black dark:text-white mb-2">
                      {relatedService.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {relatedService.description}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}