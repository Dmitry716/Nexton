import { notFound } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import AdvantagesSection from "@/components/AdvantagesSection";
import ReviewsSection from "@/components/ReviewsSection";
import { services } from "@/data/services";
import type { Metadata } from "next";

// Все города Беларуси
const cities = [
  { slug: "polotsk", name: "Полоцк", region: "Витебская область" },
  { slug: "novopolotsk", name: "Новополоцк", region: "Витебская область" },
  { slug: "vitebsk", name: "Витебск", region: "Витебская область" },
  { slug: "orsha", name: "Орша", region: "Витебская область" },
  { slug: "mogilev", name: "Могилёв", region: "Могилёвская область" },
  { slug: "gomel", name: "Гомель", region: "Гомельская область" },
  { slug: "brest", name: "Брест", region: "Брестская область" },
  { slug: "grodno", name: "Гродно", region: "Гродненская область" },
  { slug: "minsk", name: "Минск", region: "Минская область" },
];

// Категории
const categories = [
  { id: "avtokondicionery", name: "Автокондиционеры" },
  { id: "otopiteli", name: "Автономные отопители" },
  { id: "radiatory", name: "Ремонт радиаторов" },
  { id: "svarka", name: "Аргонная сварка" },
  {
    id: "gruzovye",
    name: "Ремонт радиаторов и топливных баков для грузовиков",
  },
  { id: "plastik", name: "Ремонт автопластика" },
  { id: "kuzovnye", name: "Кузовные работы" },
];

// Генерация всех страниц городов
export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

// Метаданные для каждого города
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) return { title: "Страница не найдена" };

  return {
    title: `Ремонт кондиционеров и систем охлаждения в ${cityData.name} | Nexton`,
    description: `Профессиональный ремонт автокондиционеров, вебасто и систем охлаждения в ${cityData.name} (${cityData.region}). Гарантия 6 месяцев. Звоните: +375297115091`,
    openGraph: {
      title: `Ремонт систем охлаждения в ${cityData.name} | Nexton`,
      description: `Профессиональный ремонт кондиционеров и систем охлаждения в ${cityData.name}.`,
      url: `https://nexton.vip/${city}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    alternates: { canonical: `https://nexton.vip/${city}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) notFound();

  const cityName = cityData.name;

  // Фильтруем услуги по категориям
  const categoriesWithServices = categories.map((cat) => ({
    ...cat,
    services: services.filter((s) => s.category === cat.id),
  }));

  return (
    <>
      {/* Schema.org разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            name: `Nexton в ${cityName}`,
            url: `https://nexton.vip/${city}`,
            telephone: "+375297115091",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Строительная 21в/3, блок 9, бокс 3",
              addressLocality: cityName,
              addressRegion: cityData.region,
              addressCountry: "BY",
            },
          }),
        }}
      />

      <HeroSection city={cityName} />

      <section
        id="services"
        className="py-20 bg-white dark:bg-black border-y border-gray-200 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-black dark:text-white">
            Услуги по ремонту систем охлаждения в {cityName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Профессиональный ремонт и обслуживание систем охлаждения,
            кондиционеров и автономных отопителей в {cityName}
          </p>

          {/* Категории */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categoriesWithServices.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="card p-6 block hover:translate-y-[-2px] transition-all duration-200"
              >
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Услуги в {cityName}
                </p>
              </a>
            ))}
          </div>

          {/* Услуги по категориям */}
          {categoriesWithServices.map((category) => {
            if (category.services.length === 0) return null;

            return (
              <div
                key={category.id}
                id={category.id}
                className="mb-20 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <h2 className="text-2xl font-bold text-black dark:text-white">
                    {category.name} в {cityName}
                  </h2>
                  <span className="text-sm text-gray-500 ml-auto">
                    {category.services.length} услуг
                  </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AdvantagesSection />
      <ReviewsSection />
    </>
  );
}
