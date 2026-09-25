// app/[city]/avtoservis/page.tsx
import { notFound } from "next/navigation";
import { cities } from "@/data/cities";
import Link from "next/link";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import {
  Wrench,
  Car,
  Wind,
  Flame,
  Thermometer,
  Zap,
  Truck,
  Hammer,
  ScanSearch,
} from "lucide-react";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) return { title: "Страница не найдена" };

  const cityPrep = cityData.namePrepositional || cityData.name;

  return {
    title: `Автосервис в ${cityPrep} — Nexton: ремонт и обслуживание автомобилей`,
    description: `Автосервис Nexton в ${cityPrep} (${cityData.region}). Полный спектр услуг: кузовной ремонт, автокондиционеры, китайские авто, диагностика подвески, ремонт отопителей, аргонная сварка. Работаем с 2010 года. Гарантия до 12 месяцев. Звоните: +375297115091`,
    keywords: [
      `автосервис ${cityData.name}`,
      `автосервис ${cityPrep}`,
      `СТО ${cityData.name}`,
      `ремонт авто ${cityData.name}`,
      `автосервис ${cityData.region}`,
    ],
    openGraph: {
      title: `Автосервис в ${cityPrep} — Nexton`,
      description: `Полный спектр услуг в ${cityPrep}. Работаем с 2010 года.`,
      url: `https://nexton.vip/${city}/avtoservis`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://nexton.vip/${city}/avtoservis`,
    },
  };
}

export default async function AvtoservisPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) notFound();

  const cityPrep = cityData.namePrepositional || cityData.name;
  const cityName = cityData.name;

  const categories = [
    {
      id: "kuzovnye",
      name: "Кузовной ремонт",
      icon: Hammer,
      href: `${city}/kuzovnoy-remont`,
      aria: `Кузовной ремонт в ${cityPrep}`,
    },
    { id: "avtokondicionery", name: "Автокондиционеры", icon: Wind },
    {
      id: "otopiteli",
      name: "Автономные отопители",
      icon: Flame,
      href: `${city}/remont-vebasto`,
      aria: `Ремонт вебасто в ${cityPrep}`,
    },
    { id: "radiatory", name: "Ремонт радиаторов", icon: Thermometer },
    { id: "svarka", name: "Аргонная сварка", icon: Zap },
    { id: "gruzovye", name: "Ремонт для грузовиков", icon: Truck },
    { id: "plastik", name: "Ремонт автопластика", icon: Wrench },
    {
      id: "kitayskie_avto",
      name: "Ремонт китайских авто",
      icon: Car,
      href: `${city}/remont-kitayskih-avto`,
      aria: `Ремонт китайских автомобилей в ${cityPrep}`,
    },
    {
      id: "diagnostika_podveski",
      name: "Диагностика подвески",
      icon: ScanSearch,
    },
  ];

  // Преимущества
  const advantages = [
    {
      title: "Опыт с 2010 года",
      text: "Тысячи отремонтированных автомобилей за 15 лет работы",
    },
    {
      title: "Гарантия до 12 мес",
      text: "На все виды работ, бесплатное устранение недостатков",
    },
    {
      title: "Современное оборудование",
      text: "Стапель, вибростенд, аргонная сварка, пайка",
    },
    {
      title: "Цены в BYN",
      text: "Смета до начала работ, без скрытых доплат",
    },
  ];

  return (
    <main
      className="min-h-screen bg-white dark:bg-black pt-16"
      role="main"
      aria-label={`Автосервис Nexton в ${cityPrep}`}
    >
      {/* JSON-LD Schema для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            name: `Автосервис Nexton в ${cityName}`,
            description: `Автосервис в ${cityPrep}. Полный спектр услуг по ремонту автомобилей. Работаем с 2010 года.`,
            url: `https://nexton.vip/${city}/avtoservis`,
            telephone: "+375297115091",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Строительная 21в/3, блок 9, бокс 3",
              addressLocality: "Полоцк",
              addressRegion: cityData.region,
              addressCountry: "BY",
            },
            areaServed: {
              "@type": "City",
              name: cityName,
            },
            openingHours: "Mo-Fr 10:00-18:00",
            image: "https://nexton.vip/og-image.jpg",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Услуги автосервиса",
              itemListElement: categories.map((cat) => ({
                "@type": "Offer",
                name: cat.name,
                description: `${cat.name} в ${cityPrep}`,
              })),
            },
          }),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Хлебные крошки */}
        <nav
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6"
          aria-label="Хлебные крошки"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <span
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href="/"
              className="hover:text-black dark:hover:text-white transition-colors"
              itemProp="item"
              aria-label="Главная страница"
            >
              <span itemProp="name">Главная</span>
            </Link>
            <meta itemProp="position" content="1" />
          </span>
          <span aria-hidden="true">/</span>
          <span
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href={`/${city}`}
              className="hover:text-black dark:hover:text-white transition-colors"
              itemProp="item"
              aria-label={`${cityName}`}
            >
              <span itemProp="name">{cityName}</span>
            </Link>
            <meta itemProp="position" content="2" />
          </span>
          <span aria-hidden="true">/</span>
          <span
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span
              className="text-black dark:text-white font-medium"
              itemProp="name"
            >
              Автосервис
            </span>
            <meta itemProp="position" content="3" />
          </span>
        </nav>

        {/* H1 */}
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-4">
            Автосервис в {cityPrep} — Nexton
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Полный спектр услуг по ремонту и обслуживанию автомобилей. Работаем
            в {cityPrep} с 2010 года. Гарантия до 12 месяцев на все виды работ.
          </p>
        </header>

        {/* Видео-блок */}
        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 border border-gray-200 dark:border-gray-800 bg-gray-900"
          role="img"
          aria-label="Видео об автосервисе Nexton в Полоцке"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/videos/about-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <span
                className="text-5xl sm:text-6xl block mb-3"
                aria-hidden="true"
              >
                🔧
              </span>
              <p className="text-2xl sm:text-3xl font-bold">
                Ваш надёжный автосервис
              </p>
              <p className="text-lg text-white/80">
                Диагностика, ремонт, кузов — всё в одном месте
              </p>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <article
          className="prose prose-lg max-w-none dark:prose-invert mb-12"
          itemScope
          itemType="https://schema.org/Article"
        >
          <h2>Автосервис Nexton в {cityPrep} — полный спектр услуг</h2>
          <p>
            В {cityPrep} работает автосервис Nexton — ваш надёжный партнёр по
            ремонту и обслуживанию автомобилей. Мы предлагаем полный комплекс
            услуг: от диагностики подвески на вибростенде до восстановления
            геометрии кузова на стапеле и покраски.
          </p>

          <h3>Услуги автосервиса в {cityPrep}</h3>
          <ul>
            <li>
              <strong>Кузовной ремонт</strong> — стапель, рихтовка споттером,
              покраска
            </li>
            <li>
              <strong>Ремонт автокондиционеров</strong> — диагностика, заправка,
              замена
            </li>
            <li>
              <strong>Ремонт китайских автомобилей</strong> — Geely, Chery,
              Haval (бензиновые)
            </li>
            <li>
              <strong>Диагностика подвески</strong> — на профессиональном
              вибростенде
            </li>
            <li>
              <strong>Ремонт отопителей</strong> — Webasto, Eberspacher, Планар
            </li>
            <li>
              <strong>Аргонная сварка</strong> — алюминий, нержавейка, пайка
            </li>
          </ul>

          <h3>Почему выбирают автосервис Nexton в {cityPrep}</h3>
          <ul>
            <li>
              ✅ <strong>Опыт с 2010 года</strong> — более 15 лет на рынке
            </li>
            <li>
              ✅ <strong>Гарантия до 12 месяцев</strong> — на все виды работ
            </li>
            <li>
              ✅ <strong>Профессиональное оборудование</strong> — стапель,
              вибростенд, аргон
            </li>
            <li>
              ✅ <strong>Прозрачные цены</strong> — смета до начала работ, цены
              в BYN
            </li>
          </ul>

          <h3>Как мы работаем в {cityPrep}</h3>
          <ol>
            <li>
              <strong>Звонок или заявка</strong> — описываете проблему
            </li>
            <li>
              <strong>Диагностика</strong> — находим причину, составляем смету
            </li>
            <li>
              <strong>Согласование</strong> — обсуждаем стоимость и сроки
            </li>
            <li>
              <strong>Ремонт</strong> — выполняем работы на профессиональном
              оборудовании
            </li>
            <li>
              <strong>Сдача</strong> — проверяем качество, даём гарантию
            </li>
          </ol>
        </article>

        {/* Преимущества */}
        <section
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          aria-labelledby="advantages-title"
        >
          <h2 id="advantages-title" className="sr-only">
            Преимущества автосервиса Nexton в {cityPrep}
          </h2>
          {advantages.map((item, i) => (
            <div
              key={i}
              className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all"
              role="listitem"
            >
              <h3 className="font-bold text-black dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.text}
              </p>
            </div>
          ))}
        </section>

        {/* Категории услуг */}
        <section className="mb-12" aria-labelledby="services-title">
          <h2
            id="services-title"
            className="text-2xl font-bold text-black dark:text-white mb-6"
          >
            Услуги автосервиса в {cityPrep}
          </h2>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
            aria-label="Список услуг автосервиса"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const href = cat.href ? `/${cat.href}` : `/${city}#${cat.id}`;
              const ariaLabel = cat.aria || `${cat.name} в ${cityPrep}`;
              return (
                <Link
                  key={cat.id}
                  href={href}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb]"
                  role="listitem"
                  aria-label={ariaLabel}
                >
                  <div
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-[#1e3a5f]/10 dark:group-hover:bg-[#7a9bcb]/10 transition-colors"
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5 text-[#1e3a5f] dark:text-[#7a9bcb]" />
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* О нас */}
        <section
          className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 mb-10 border border-gray-200 dark:border-gray-800"
          aria-labelledby="about-title"
        >
          <h2
            id="about-title"
            className="text-2xl font-bold text-black dark:text-white mb-4"
          >
            О автосервисе Nexton в {cityPrep}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Автосервис Nexton работает с 2010 года. Мы специализируемся на
            ремонте систем охлаждения и автокондиционеров, выполняем кузовной
            ремонт и обслуживаем китайские автомобили. За это время помогли
            тысячам автовладельцев в {cityPrep} и области.
          </p>
        </section>

        {/* Контакты */}
        <section
          className="bg-[#1e3a5f] dark:bg-[#1a2a3a] rounded-2xl p-6 sm:p-8 text-white"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title" className="text-2xl font-bold mb-4">
            Запишитесь в автосервис {cityPrep}
          </h2>
          <p className="text-white/80 mb-6">
            Позвоните или напишите нам — мы ответим на все вопросы.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+375297115091"
              className="px-6 py-3 bg-white text-[#1e3a5f] font-semibold rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
              aria-label="Позвонить в сервис Nexton по номеру +375297115091"
            >
              📞 Позвонить
            </a>
            <a
              href="https://t.me/+375297115091"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
              aria-label="Написать в Telegram"
            >
              💬 Telegram
            </a>
          </div>
          <address className="text-white/60 text-sm mt-4 not-italic">
            г. Полоцк, ул. Строительная 21в/3, блок 9, бокс 3
          </address>
        </section>
      </div>

      {/* Отзывы */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ReviewsSection />
      </div>
    </main>
  );
}
