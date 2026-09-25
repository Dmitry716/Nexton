import { notFound } from "next/navigation";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import Link from "next/link";
import { Flame, Wrench, ScanSearch, Settings } from "lucide-react";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";

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
    title: `Ремонт вебасто в ${cityPrep}: Webasto, Eberspacher, Планар | Nexton`,
    description: `Ремонт вебасто в ${cityPrep}. Диагностика, замена свечей, чистка камеры сгорания, ремонт блоков управления Webasto, Eberspacher, Планар, Бинар. Гарантия до 6 месяцев. Звоните: +375297115091`,
    keywords: [
      "ремонт вебасто",
      `ремонт вебасто ${cityData.name}`,
      "ремонт Webasto",
      `ремонт Webasto ${cityData.name}`,
      "ремонт автономных отопителей",
      `вебасто ${cityData.name}`,
      "диагностика вебасто",
      "ремонт блока управления webasto",
    ],
    openGraph: {
      title: `Ремонт вебасто в ${cityPrep} | Nexton`,
      description: `Ремонт Webasto, Eberspacher, Планар в ${cityPrep}. Диагностика, свечи, блоки управления. Гарантия до 6 месяцев.`,
      url: `https://nexton.vip/${city}/remont-vebasto`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://nexton.vip/${city}/remont-vebasto`,
    },
  };
}

export default async function RemontVebastoPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) notFound();

  const cityPrep = cityData.namePrepositional || cityData.name;
  const cityName = cityData.name;

  const otopiteliServices = services.filter((s) => s.category === "otopiteli");

  const serviceIcons: Record<string, React.ElementType> = {
    "Диагностика вебасто и автономных отопителей": ScanSearch,
    "Диагностика автономных отопителей": ScanSearch,
    "Ремонт вебасто и автономных отопителей": Flame,
    "Ремонт автономных отопителей": Flame,
    "Обслуживание автономных отопителей": Settings,
    "Ремонт блоков управления отопителей": Wrench,
  };

  const faqItems = [
    {
      question: "Почему вебасто не запускается?",
      answer:
        "Частые причины: неисправная свеча накаливания, забитая камера сгорания, проблемы с топливоподачей или блоком управления. Сначала делаем компьютерную диагностику.",
    },
    {
      question: "Что делать, если вебасто дымит?",
      answer:
        "Дым обычно указывает на нагар в камере сгорания или проблемы с форсункой/топливом. Нужны чистка и проверка дозировки топлива.",
    },
    {
      question: "Сколько стоит ремонт вебасто?",
      answer:
        "Ориентир: диагностика от 30 Br, замена свечи от 30 Br, чистка камеры от 50 Br, ремонт блока от 150 Br. Точную смету называем после осмотра.",
    },
  ];

  return (
    <main
      className="min-h-screen bg-white dark:bg-black pt-16"
      role="main"
      aria-label="Страница ремонта вебасто"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            name: `Ремонт вебасто Nexton в ${cityName}`,
            description: `Ремонт вебасто и автономных отопителей в ${cityPrep}. Webasto, Eberspacher, Планар, Бинар.`,
            url: `https://nexton.vip/${city}/remont-vebasto`,
            telephone: "+375297115091",
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
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
            >
              <span itemProp="name">{cityData.name}</span>
            </Link>
            <meta itemProp="position" content="2" />
          </span>
          <span aria-hidden="true">/</span>
          <span
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span className="text-black dark:text-white" itemProp="name">
              Ремонт вебасто
            </span>
            <meta itemProp="position" content="3" />
          </span>
        </nav>

        <header className="mb-8" aria-labelledby="main-title">
          <h1
            id="main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3"
            itemProp="headline"
          >
            Ремонт вебасто в {cityPrep}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Диагностика и ремонт Webasto, Eberspacher, Планар, Бинар. Свечи,
            камера сгорания, насосы-дозаторы, блоки управления. Работаем с 2010
            года. Гарантия до 6 месяцев.
          </p>
        </header>

        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-800 bg-gray-900"
          role="img"
          aria-label="Видео о ремонте вебасто"
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
            <source src="/videos/blog/repair-webasto.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <span
                className="text-5xl sm:text-6xl block mb-2"
                aria-hidden="true"
              >
                🔥
              </span>
              <p className="text-xl sm:text-2xl font-bold">
                Ремонт вебасто в {cityPrep}
              </p>
              <p className="text-sm sm:text-lg text-white/80">
                Сначала диагностика — потом смета без сюрпризов
              </p>
            </div>
          </div>
        </div>

        <article
          className="prose prose-lg max-w-none dark:prose-invert mb-10"
          itemScope
          itemType="https://schema.org/Article"
        >
          <h2>Ремонт вебасто в {cityPrep}: диагностика и восстановление</h2>
          <p>
            Вебасто не запускается, дымит или глохнет через несколько минут? В{" "}
            <a
              href={`/${city}`}
              className="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
            >
              Nexton в {cityPrep}
            </a>{" "}
            делаем компьютерную диагностику и ремонт автономных отопителей
            Webasto, Eberspacher, Планар, Бинар и Autoterm. Опыт с 2010 года,
            гарантия до 6 месяцев.
          </p>

          <h3>Какие работы по вебасто выполняем в {cityPrep}</h3>
          <ul>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/diagnostika-otopiteley`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Диагностика вебасто
                </Link>
              </strong>{" "}
              — ошибки, параметры, топливоподача, электрика
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/remont-otopiteley`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Ремонт вебасто
                </Link>
              </strong>{" "}
              — свечи, камера сгорания, насос-дозатор, вентилятор
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/remont-blokov-upravleniya`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Ремонт блоков управления
                </Link>
              </strong>{" "}
              — восстановление электроники на компонентном уровне
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/obsluzhivanie-otopiteley`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Обслуживание перед зимой
                </Link>
              </strong>{" "}
              — чистка, проверка, подготовка к сезону
            </li>
          </ul>

          <h3>Почему везут вебасто в Nexton в {cityPrep}</h3>
          <ul>
            <li>
              ✅ <strong>Диагностика до ремонта</strong> — не меняем детали «на
              глаз»
            </li>
            <li>
              ✅ <strong>Webasto и другие бренды</strong> — Eberspacher, Планар,
              Бинар, Autoterm
            </li>
            <li>
              ✅ <strong>Ремонт блоков управления</strong> — часто дешевле
              замены
            </li>
            <li>
              ✅ <strong>Гарантия до 6 месяцев</strong> — на выполненные работы
            </li>
            <li>
              ✅ <strong>Цены в BYN</strong> — смета до старта работ
            </li>
          </ul>
        </article>

        <section aria-labelledby="services-title">
          <h2
            id="services-title"
            className="text-2xl font-bold text-black dark:text-white mb-6"
          >
            Услуги по ремонту вебасто в {cityPrep}
          </h2>
          <div
            className="grid sm:grid-cols-2 gap-6 mb-10"
            role="list"
            aria-label="Список услуг по вебасто"
          >
            {otopiteliServices.map((service) => {
              const Icon = serviceIcons[service.name] || Flame;
              return (
                <Link
                  key={service.id}
                  href={`/${city}/usluga/${service.slug}`}
                  className="group block rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  role="listitem"
                  aria-label={`Подробнее об услуге: ${service.name}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-[#1e3a5f]/10 dark:group-hover:bg-[#7a9bcb]/10 transition-colors"
                      aria-hidden="true"
                    >
                      <Icon className="w-6 h-6 text-[#1e3a5f] dark:text-[#7a9bcb]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors mb-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {service.description}
                      </p>
                      <span className="inline-block mt-3 text-sm text-[#1e3a5f] dark:text-[#7a9bcb] font-medium group-hover:translate-x-1 transition-transform">
                        Подробнее →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section
          className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 mb-10 border border-gray-200 dark:border-gray-800"
          aria-labelledby="brands-title"
        >
          <h2
            id="brands-title"
            className="text-2xl font-bold text-black dark:text-white mb-4"
          >
            Какие отопители ремонтируем
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Работаем с жидкостными и воздушными автономными отопителями легковых
            и грузовых авто.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Webasto",
              "Eberspacher",
              "Планар",
              "Бинар",
              "Autoterm",
              "Термотранс",
            ].map((brand) => (
              <span
                key={brand}
                className="px-3 py-2 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-800 dark:text-gray-200"
              >
                {brand}
              </span>
            ))}
          </div>
        </section>

        <section
          className="mb-10"
          aria-labelledby="faq-title"
        >
          <h2
            id="faq-title"
            className="text-2xl font-bold text-black dark:text-white mb-6"
          >
            Частые вопросы о ремонте вебасто
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5"
              >
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <article
          className="prose prose-lg max-w-none dark:prose-invert mb-10"
          itemScope
          itemType="https://schema.org/Article"
        >
          <h2>Как проходит ремонт вебасто в {cityPrep}</h2>
          <ol>
            <li>
              <strong>Запись</strong> — звонок или Telegram, описываете
              симптомы
            </li>
            <li>
              <strong>Диагностика</strong> — компьютерная проверка ошибок и
              параметров
            </li>
            <li>
              <strong>Смета</strong> — согласовываем работы и запчасти до
              старта
            </li>
            <li>
              <strong>Ремонт</strong> — свеча, чистка, насос, блок или
              комплекс
            </li>
            <li>
              <strong>Проверка и сдача</strong> — тестовый запуск, гарантия
            </li>
          </ol>

          <h3>Сколько стоит ремонт вебасто в {cityPrep}</h3>
          <p>
            Ориентир: диагностика от 30 Br, замена свечи накаливания от 30 Br,
            чистка камеры сгорания от 50 Br, замена насоса-дозатора от 50 Br,
            ремонт блока управления от 150 Br. Точную сумму называем после
            диагностики.
          </p>
        </article>

        <section
          className="bg-[#1e3a5f] dark:bg-[#1a2a3a] rounded-2xl p-6 sm:p-8 text-white"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title" className="text-2xl font-bold mb-4">
            Запишитесь на ремонт вебасто в {cityPrep}
          </h2>
          <p className="text-white/80 mb-6">
            Привезите Webasto или другой автономный отопитель — диагностируем и
            составим смету. Цены в BYN, без скрытых доплат.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+375297115091"
              className="px-6 py-3 bg-white text-[#1e3a5f] font-semibold rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e3a5f]"
              aria-label="Позвонить в сервис Nexton"
            >
              📞 Позвонить
            </a>
            <a
              href="https://t.me/+375297115091"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e3a5f]"
              aria-label="Написать в Telegram"
            >
              💬 Написать в Telegram
            </a>
          </div>
          <address className="text-white/60 text-sm mt-4 not-italic">
            Адрес: г. Полоцк, ул. Строительная 21в/3, блок 9, бокс 3
          </address>
        </section>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ReviewsSection />
      </div>
    </main>
  );
}
