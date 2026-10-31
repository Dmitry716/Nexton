import { notFound } from "next/navigation";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import Link from "next/link";
import { Shield, Droplets, Layers, Wrench } from "lucide-react";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import Image from "next/image";
import {
  formatPriceAmount,
  getExchangeRates,
  localizePricesInHtml,
  ratesDisclaimer,
} from "@/lib/nbrb-rates";

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
  const rates = await getExchangeRates();
  const p1 = formatPriceAmount(700, cityData.currency, rates);
  const p2 = formatPriceAmount(1500, cityData.currency, rates);
  const p3 = formatPriceAmount(2500, cityData.currency, rates);

  return {
    title: `Антикоррозийная обработка в ${cityPrep}: Dinitrol, Noxudol | Nexton`,
    description: `Антикоррозийная обработка в ${cityPrep}. 3 варианта: скрытые полости ${p1}, + днище ${p2}, с грунтованием ${p3}. Dinitrol, Noxudol. Звоните: +375297115091`,
    keywords: [
      "антикоррозийная обработка",
      `антикоррозийная обработка ${cityData.name}`,
      `антикор ${cityData.name}`,
      "антикоррозийная обработка Полоцк",
      "антикор Новополоцк",
      "антикор днища",
      "Dinitrol",
      "Noxudol",
    ],
    openGraph: {
      title: `Антикоррозийная обработка в ${cityPrep} | Nexton`,
      description: `Антикор в ${cityPrep}: скрытые полости ${p1}, + днище ${p2}, с грунтованием ${p3}. Dinitrol, Noxudol.`,
      url: `https://nexton.vip/${city}/antikorrozijnaya-obrabotka`,
      images: [
        {
          url: "/images/categories/antikor.jpg",
          width: 1200,
          height: 675,
        },
      ],
    },
    alternates: {
      canonical: `https://nexton.vip/${city}/antikorrozijnaya-obrabotka`,
    },
  };
}

export default async function AntikorrozijnayaObrabotkaPage({
  params,
}: PageProps) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) notFound();

  const cityPrep = cityData.namePrepositional || cityData.name;
  const cityName = cityData.name;
  const currency = cityData.currency;
  const rates = await getExchangeRates();
  const p1 = formatPriceAmount(700, currency, rates);
  const p2 = formatPriceAmount(1500, currency, rates);
  const p3 = formatPriceAmount(2500, currency, rates);
  const priceNote =
    currency === "BYN" ? null : ratesDisclaimer(rates, currency);

  const antikorServices = services.filter((s) => s.category === "antikor");

  const serviceIcons: Record<string, React.ElementType> = {
    "Обработка скрытых полостей антикором": Layers,
    "Антикор днища и скрытых полостей": Droplets,
    "Комплексная антикоррозийная обработка": Shield,
  };

  const faqItems = [
    {
      question: "Сколько стоит антикоррозийная обработка?",
      answer: `Три фиксированных варианта: 1 — только скрытые полости — ${p1}; 2 — скрытые полости + антикор по днищу — ${p2}; 3 — грунтование + скрытые полости + антикор по днищу — ${p3}.`,
    },
    {
      question: "Чем отличаются варианты?",
      answer:
        "Вариант 1 — только пролив скрытых полостей. Вариант 2 — полости плюс антикор по днищу. Вариант 3 — то же с грунтованием металла перед антикором.",
    },
    {
      question: "Какие материалы используете?",
      answer:
        "Премиум-составы Dinitrol, Noxudol, Body и Tectyl — для днища и скрытых полостей.",
    },
    {
      question: "Какая гарантия на антикор?",
      answer:
        "До 3 лет при соблюдении рекомендаций и ежегодном осмотре покрытия.",
    },
  ];

  return (
    <main
      className="min-h-screen bg-white dark:bg-black pt-16"
      role="main"
      aria-label="Страница антикоррозийной обработки"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            name: `Антикоррозийная обработка Nexton в ${cityName}`,
            description: `Антикоррозийная обработка кузова в ${cityPrep}. Dinitrol, Noxudol, Body. Гарантия до 3 лет.`,
            url: `https://nexton.vip/${city}/antikorrozijnaya-obrabotka`,
            telephone: "+375297115091",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Строительная 21в/3, блок 9, бокс 3",
              addressLocality: "Полоцк",
              addressRegion: "Витебская область",
              addressCountry: "BY",
            },
            areaServed: { "@type": "City", name: cityName },
            openingHours: "Mo-Fr 10:00-18:00",
            priceRange: "$$",
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
              Антикоррозийная обработка
            </span>
            <meta itemProp="position" content="3" />
          </span>
        </nav>

        <header className="mb-8" aria-labelledby="main-title">
          <h1
            id="main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3"
          >
            Антикоррозийная обработка в {cityPrep}
          </h1>
          <div className="overflow-x-auto mb-3">
            <table className="w-full min-w-[320px] text-sm sm:text-base border-collapse border border-gray-200 dark:border-gray-800">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                  <th className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 font-semibold w-14">
                    №
                  </th>
                  <th className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 font-semibold">
                    Вариант
                  </th>
                  <th className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 font-semibold">
                    Цена
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-200">
                <tr>
                  <td className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 font-semibold">
                    1
                  </td>
                  <td className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3">
                    Скрытые полости
                  </td>
                  <td className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 font-semibold whitespace-nowrap">
                    {p1}
                  </td>
                </tr>
                <tr className="bg-gray-50/60 dark:bg-gray-900/40">
                  <td className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 font-semibold">
                    2
                  </td>
                  <td className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3">
                    Скрытые полости + антикор по днищу
                  </td>
                  <td className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 font-semibold whitespace-nowrap">
                    {p2}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 font-semibold">
                    3
                  </td>
                  <td className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3">
                    Грунтование + скрытые полости + антикор по днищу
                  </td>
                  <td className="border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 font-semibold whitespace-nowrap">
                    {p3}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Материалы Dinitrol, Noxudol, Body.
          </p>
        </header>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-800 bg-gray-900">
          <Image
            src="/images/categories/antikor.jpg"
            alt={`Антикоррозийная обработка автомобиля в ${cityPrep}`}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <p className="text-xl sm:text-2xl font-bold">
                Антикор в {cityPrep}
              </p>
              <p className="text-sm sm:text-lg text-white/85">
                Премиум-материалы · прозрачные цены в BYN
              </p>
            </div>
          </div>
        </div>

        <article className="prose prose-lg max-w-none dark:prose-invert mb-10">
          <h2>Антикоррозийная обработка в {cityPrep}: защита на годы</h2>
          <p>
            Зимой соль и реагенты ускоряют коррозию днища и арок. В{" "}
            <Link
              href={`/${city}`}
              className="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
            >
              Nexton в {cityPrep}
            </Link>{" "}
            делаем антикор составами премиум-класса и озвучиваем смету до
            начала работ. Адрес сервиса: Полоцк, ул. Строительная 21в/3.
            {cityData.country === "BY"
              ? " Обслуживаем Полоцк и Новополоцк."
              : ` Обслуживаем клиентов из ${cityPrep}.`}
          </p>

          <h3>Варианты антикора в {cityPrep}</h3>
          <ul>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/obrabotka-skrytyh-polostej`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Вариант 1 — скрытые полости
                </Link>
              </strong>{" "}
              — {p1}
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/antikor-dnishcha-arok`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Вариант 2 — скрытые + антикор по днищу
                </Link>
              </strong>{" "}
              — {p2}
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/antikorrozijnaya-obrabotka-kompleks`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Вариант 3 — грунтование + полости + днище
                </Link>
              </strong>{" "}
              — {p3}
            </li>
          </ul>

          <h3>Почему антикор в Nexton</h3>
          <ul>
            <li>
              ✅ <strong>Материалы премиум-класса</strong> — Dinitrol, Noxudol,
              Body, Tectyl
            </li>
            <li>
              ✅ <strong>Понятные цены</strong> — три фиксированных варианта
            </li>
            <li>
              ✅ <strong>Гарантия до 3 лет</strong> — при ежегодном осмотре
              покрытия
            </li>
            <li>
              ✅ <strong>Смета до старта</strong> — всё согласовываем заранее
            </li>
          </ul>
        </article>

        <section
          className="mb-10 overflow-x-auto"
          aria-labelledby="prices-title"
        >
          <h2
            id="prices-title"
            className="text-2xl font-bold text-black dark:text-white mb-4"
          >
            Тарифы антикоррозийной обработки
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Фиксированные варианты.
            {currency === "BYN"
              ? " Цены в BYN."
              : ` ${priceNote}`}
          </p>
          <table className="w-full min-w-[420px] text-sm border-collapse border border-gray-200 dark:border-gray-800">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                <th className="border border-gray-200 dark:border-gray-800 p-3 font-semibold">
                  Вариант
                </th>
                <th className="border border-gray-200 dark:border-gray-800 p-3 font-semibold">
                  Что входит
                </th>
                <th className="border border-gray-200 dark:border-gray-800 p-3 font-semibold">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              <tr>
                <td className="border border-gray-200 dark:border-gray-800 p-3">
                  1
                </td>
                <td className="border border-gray-200 dark:border-gray-800 p-3">
                  Только скрытые полости
                </td>
                <td className="border border-gray-200 dark:border-gray-800 p-3 font-semibold">
                  {p1}
                </td>
              </tr>
              <tr className="bg-gray-50/60 dark:bg-gray-900/40">
                <td className="border border-gray-200 dark:border-gray-800 p-3">
                  2
                </td>
                <td className="border border-gray-200 dark:border-gray-800 p-3">
                  Скрытые полости + антикор по днищу
                </td>
                <td className="border border-gray-200 dark:border-gray-800 p-3 font-semibold">
                  {p2}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-800 p-3">
                  3
                </td>
                <td className="border border-gray-200 dark:border-gray-800 p-3">
                  Грунтование + скрытые полости + антикор по днищу
                </td>
                <td className="border border-gray-200 dark:border-gray-800 p-3 font-semibold">
                  {p3}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section aria-labelledby="services-title">
          <h2
            id="services-title"
            className="text-2xl font-bold text-black dark:text-white mb-6"
          >
            Услуги антикоррозийной обработки в {cityPrep}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-10" role="list">
            {antikorServices.map((service) => {
              const Icon = serviceIcons[service.name] || Wrench;
              return (
                <Link
                  key={service.id}
                  href={`/${city}/usluga/${service.slug}`}
                  className="group block rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  role="listitem"
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
                        {localizePricesInHtml(
                          service.description,
                          currency,
                          rates,
                        )}
                      </p>
                      <span className="inline-block mt-3 text-sm text-[#1e3a5f] dark:text-[#7a9bcb] font-medium">
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
          aria-labelledby="materials-title"
        >
          <h2
            id="materials-title"
            className="text-2xl font-bold text-black dark:text-white mb-4"
          >
            Материалы премиум-класса
          </h2>
          <div className="flex flex-wrap gap-2">
            {["Dinitrol", "Noxudol", "Body", "Tectyl"].map((brand) => (
              <span
                key={brand}
                className="px-3 py-2 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-800 dark:text-gray-200"
              >
                {brand}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10" aria-labelledby="faq-title">
          <h2
            id="faq-title"
            className="text-2xl font-bold text-black dark:text-white mb-6"
          >
            Частые вопросы об антикоре
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

        <article className="prose prose-lg max-w-none dark:prose-invert mb-10">
          <h2>Как проходит антикоррозийная обработка в {cityPrep}</h2>
          <ol>
            <li>
              <strong>Осмотр и смета</strong> — оцениваем состояние днища и
              объём работ
            </li>
            <li>
              <strong>Мойка и сушка</strong> — подготовка поверхности
            </li>
            <li>
              <strong>Обработка</strong> — днище, арки, скрытые полости
            </li>
            <li>
              <strong>Контроль и рекомендации</strong> — гарантия и уход
            </li>
          </ol>
          <h3>Сколько стоит антикор в {cityPrep}</h3>
          <p>
            Вариант 1 — {p1} (только скрытые полости). Вариант 2 — {p2} (скрытые
            + антикор по днищу). Вариант 3 — {p3} (грунтование + скрытые +
            антикор по днищу).
            {priceNote ? ` ${priceNote}` : ""}
          </p>
        </article>

        <section
          className="bg-[#1e3a5f] dark:bg-[#1a2a3a] rounded-2xl p-6 sm:p-8 text-white"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title" className="text-2xl font-bold mb-4">
            Запишитесь на антикоррозийную обработку в {cityPrep}
          </h2>
          <p className="text-white/80 mb-6">
            Оценим состояние кузова и подберём материалы. Цены в BYN, без
            скрытых доплат.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+375297115091"
              className="px-6 py-3 bg-white text-[#1e3a5f] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Позвонить
            </a>
            <a
              href="https://t.me/+375297115091"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
            >
              Telegram
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
