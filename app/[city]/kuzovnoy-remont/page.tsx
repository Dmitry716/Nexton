import { notFound } from "next/navigation";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import Link from "next/link";
import { Wrench, Car, Hammer, Paintbrush } from "lucide-react";
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
    title: `Кузовной ремонт в ${cityPrep}: рихтовка, восстановление геометрии, покраска | Nexton`,
    description: `Профессиональный кузовной ремонт в ${cityPrep}. Восстановление геометрии на стапеле, удаление вмятин споттером под покраску, покраска кузова. Гарантия 12 месяцев. Звоните: +375297115091`,
    keywords: [
      "кузовной ремонт",
      `кузовной ремонт ${cityData.name}`,
      `кузовной ремонт ${cityData.region}`,
      "рихтовка кузова",
      "восстановление геометрии кузова",
      "покраска кузова",
      `ремонт кузова ${cityData.name}`,
      "стапель",
      "удаление вмятин споттером",
    ],
    openGraph: {
      title: `Кузовной ремонт в ${cityPrep} | Nexton`,
      description: `Профессиональный кузовной ремонт в ${cityPrep}: восстановление геометрии, рихтовка, покраска. Гарантия 12 месяцев.`,
      url: `https://nexton.vip/${city}/kuzovnoy-remont`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://nexton.vip/${city}/kuzovnoy-remont`,
    },
  };
}

export default async function KuzovnoyRemontPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) notFound();

  const cityPrep = cityData.namePrepositional || cityData.name;

  const kuzovnyeServices = services.filter((s) => s.category === "kuzovnye");

  const serviceIcons: Record<string, React.ElementType> = {
    "Восстановление геометрии кузова на стапеле": Hammer,
    "Удаление вмятин споттером под покраску": Car,
    "Покраска кузова автомобиля": Paintbrush,
  };

  return (
    <main
      className="min-h-screen bg-white dark:bg-black pt-16"
      role="main"
      aria-label="Страница кузовного ремонта"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Хлебные крошки (Breadcrumbs) - для SEO */}
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
              Кузовной ремонт
            </span>
            <meta itemProp="position" content="3" />
          </span>
        </nav>

        {/* HERO */}
        <header className="mb-8" aria-labelledby="main-title">
          <h1
            id="main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3"
            itemProp="headline"
          >
            Кузовной ремонт в {cityPrep}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Профессиональное восстановление кузова любой сложности. Работаем с
            2010 года. Гарантия до 12 месяцев.
          </p>
        </header>

        {/* ВИДЕО */}
        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-800 bg-gray-900"
          role="img"
          aria-label="Видео о кузовном ремонте"
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
            <source src="/videos/blog/body-repair.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <span
                className="text-5xl sm:text-6xl block mb-2"
                aria-hidden="true"
              >
                🔧
              </span>
              <p className="text-xl sm:text-2xl font-bold">
                Кузовной ремонт любой сложности
              </p>
              <p className="text-sm sm:text-lg text-white/80">
                Восстановим кузов вашего автомобиля
              </p>
            </div>
          </div>
        </div>

        {/* КОНТЕНТ С SEO-ТЕКСТОМ */}
        <article
          className="prose prose-lg max-w-none dark:prose-invert mb-10"
          itemScope
          itemType="https://schema.org/Article"
        >
          <h2>Кузовной ремонт в {cityPrep}: профессиональное восстановление</h2>
          <p>
            Кузовной ремонт — один из самых сложных видов ремонта автомобиля. Мы
            в{" "}
            <a
              href={`/${city}`}
              className="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
            >
              Nexton в {cityPrep}
            </a>
            выполняем полный спектр кузовных работ: от мелкой рихтовки до
            восстановления геометрии на стапеле.
          </p>

          <h3>Виды кузовного ремонта в {cityPrep}</h3>
          <ul>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/vosstanovlenie-geometrii-kuzova`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Восстановление геометрии кузова на стапеле
                </Link>
              </strong>{" "}
              — правка лонжеронов, устранение перекосов после ДТП
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/rihtovka-kuzova`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Удаление вмятин споттером
                </Link>
              </strong>{" "}
              — вытяжка вмятин под покраску
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/pokraska-kuzova`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Покраска кузова
                </Link>
              </strong>{" "}
              — полная и локальная, подбор цвета по VIN
            </li>
            <li>
              <strong>Сварка кузова</strong> — аргонная и полуавтоматическая
            </li>
            <li>
              <strong>Замена элементов кузова</strong> — крылья, двери, капот,
              бамперы
            </li>
          </ul>

          <h3>Почему выбирают Nexton для кузовного ремонта в {cityPrep}</h3>
          <ul>
            <li>
              ✅ <strong>Профессиональное оборудование</strong> — стапель для
              правки кузова любой сложности
            </li>
            <li>
              ✅ <strong>Опыт с 2010 года</strong> — более 1000 восстановленных
              автомобилей
            </li>
            <li>
              ✅ <strong>Гарантия 12 месяцев</strong> — на все виды кузовных
              работ
            </li>
            <li>
              ✅ <strong>Собственный подбор цвета</strong> — точное попадание в
              цвет кузова
            </li>
            <li>
              ✅ <strong>Работаем со всеми марками</strong> — от ВАЗ до
              премиум-класса
            </li>
          </ul>
        </article>

        {/* УСЛУГИ */}
        <section aria-labelledby="services-title">
          <h2
            id="services-title"
            className="text-2xl font-bold text-black dark:text-white mb-6"
          >
            Наши услуги по кузовному ремонту в {cityPrep}
          </h2>
          <div
            className="grid sm:grid-cols-2 gap-6 mb-10"
            role="list"
            aria-label="Список услуг кузовного ремонта"
          >
            {kuzovnyeServices.map((service) => {
              const Icon = serviceIcons[service.name] || Wrench;
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

        {/* ПРЕИМУЩЕСТВА */}
        <section
          className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 mb-10 border border-gray-200 dark:border-gray-800"
          aria-labelledby="advantages-title"
        >
          <h2
            id="advantages-title"
            className="text-2xl font-bold text-black dark:text-white mb-4"
          >
            Преимущества кузовного ремонта в Nexton
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Профессиональный стапель",
                text: "Восстанавливаем геометрию кузова с точностью до миллиметра",
              },
              {
                title: "Вытяжка вмятин споттером",
                text: "Споттер, обратный молоток и рихтовка — готовим деталь под покраску",
              },
              {
                title: "Точный подбор цвета",
                text: "Используем профессиональный спектрофотометр",
              },
              {
                title: "Гарантия 12 месяцев",
                text: "На все виды кузовных работ",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] text-xl"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div>
                  <h4 className="font-semibold text-black dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ДОПОЛНИТЕЛЬНЫЙ SEO-ТЕКСТ */}
        <article
          className="prose prose-lg max-w-none dark:prose-invert mb-10"
          itemScope
          itemType="https://schema.org/Article"
        >
          <h2>Как проходит кузовной ремонт в {cityPrep}</h2>
          <ol>
            <li>
              <strong>Диагностика и оценка повреждений</strong> — осмотр
              автомобиля, составление сметы
            </li>
            <li>
              <strong>Восстановление геометрии</strong> — правка на стапеле (при
              необходимости)
            </li>
            <li>
              <strong>Рихтовка кузова</strong> — удаление вмятин споттером
              и подготовка под покраску
            </li>
            <li>
              <strong>Подготовка к покраске</strong> — шпаклёвка, грунтовка,
              шлифовка
            </li>
            <li>
              <strong>Покраска кузова</strong> — нанесение краски и лака
            </li>
            <li>
              <strong>Полировка</strong> — финальная обработка, удаление шагрени
            </li>
            <li>
              <strong>Сдача автомобиля</strong> — контроль качества, гарантия
            </li>
          </ol>

          <h3>Сколько стоит кузовной ремонт в {cityPrep}</h3>
          <p>Стоимость кузовного ремонта зависит от нескольких факторов:</p>
          <ul>
            <li>
              Сложность повреждений (глубина вмятины, количество элементов)
            </li>
            <li>Необходимость замены деталей</li>
            <li>Тип покраски (полная или локальная)</li>
            <li>Марка автомобиля</li>
          </ul>
          <p>
            Мы проводим <strong>бесплатную диагностику</strong> и составляем
            точную смету до начала работ. Звоните, чтобы записаться на осмотр!
          </p>
        </article>

        {/* КОНТАКТЫ */}
        <section
          className="bg-[#1e3a5f] dark:bg-[#1a2a3a] rounded-2xl p-6 sm:p-8 text-white"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title" className="text-2xl font-bold mb-4">
            Запишитесь на кузовной ремонт в {cityPrep}
          </h2>
          <p className="text-white/80 mb-6">
            Приедем, оценим повреждения и составим смету. Бесплатная диагностика
            перед ремонтом.
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

      {/* ОТЗЫВЫ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ReviewsSection />
      </div>
    </main>
  );
}
