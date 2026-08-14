import { notFound } from "next/navigation";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import Link from "next/link";
import { Car, Wrench, ScanSearch, Hammer } from "lucide-react";
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
    title: `Ремонт китайских автомобилей в ${cityPrep}: Geely, Chery, Haval, Changan | Nexton`,
    description: `Ремонт бензиновых китайских авто в ${cityPrep}. Диагностика, двигатель, ходовая, кузов после ДТП. Электромобили не принимаем. Geely, Chery, Haval, Changan, Exeed, Omoda, Tank. Звоните: +375297115091`,
    keywords: [
      "ремонт китайских автомобилей",
      `ремонт китайских авто ${cityData.name}`,
      `ремонт geely ${cityData.name}`,
      `ремонт haval ${cityData.name}`,
      `ремонт chery ${cityData.name}`,
      "ремонт changan",
      "восстановление китайского авто после дтп",
    ],
    openGraph: {
      title: `Ремонт китайских автомобилей в ${cityPrep} | Nexton`,
      description: `Диагностика и ремонт бензиновых Geely, Chery, Haval в ${cityPrep}. Электромобили не принимаем.`,
      url: `https://nexton.vip/${city}/remont-kitayskih-avto`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://nexton.vip/${city}/remont-kitayskih-avto`,
    },
  };
}

export default async function RemontKitayskihAvtoPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) notFound();

  const cityPrep = cityData.namePrepositional || cityData.name;

  const kitayskieServices = services.filter(
    (s) => s.category === "kitayskie_avto",
  );

  const serviceIcons: Record<string, React.ElementType> = {
    "Ремонт китайских автомобилей": Car,
    "Диагностика китайских автомобилей": ScanSearch,
    "Восстановление китайских автомобилей после ДТП": Hammer,
    "Ремонт двигателя и ходовой китайских авто": Wrench,
  };

  return (
    <main
      className="min-h-screen bg-white dark:bg-black pt-16"
      role="main"
      aria-label="Страница ремонта китайских автомобилей"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <nav
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6"
          aria-label="Хлебные крошки"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <Link
            href="/"
            className="hover:text-black dark:hover:text-white transition-colors"
            itemProp="item"
          >
            <span itemProp="name">Главная</span>
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/${city}`}
            className="hover:text-black dark:hover:text-white transition-colors"
            itemProp="item"
          >
            <span itemProp="name">{cityData.name}</span>
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-black dark:text-white" itemProp="name">
            Ремонт китайских автомобилей
          </span>
        </nav>

        <header className="mb-8" aria-labelledby="main-title">
          <h1
            id="main-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3"
            itemProp="headline"
          >
            Ремонт китайских автомобилей в {cityPrep}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Диагностика, ремонт двигателя и ходовой, восстановление после ДТП.
            Geely, Chery, Haval, Changan и другие марки с бензиновым двигателем.
            Электромобили не принимаем.
          </p>
        </header>

        <div
          className="rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-4 sm:p-5 mb-8"
          role="note"
        >
          <p className="text-sm sm:text-base font-semibold text-amber-950 dark:text-amber-100 mb-1">
            Электромобили не обслуживаем
          </p>
          <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            Не записывайте EV и не звоните по высоковольтной силовой установке.
            Принимаем только бензиновые китайские авто.
          </p>
        </div>

        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-800 bg-gray-900"
          role="img"
          aria-label="Видео об обслуживании автомобиля"
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
            <source src="/videos/blog/car-maintenance.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <span
                className="text-5xl sm:text-6xl block mb-2"
                aria-hidden="true"
              >
                🚗
              </span>
              <p className="text-xl sm:text-2xl font-bold">
                Китайские авто — ремонт и восстановление
              </p>
              <p className="text-sm sm:text-lg text-white/80">
                Сначала диагностика, затем смета без сюрпризов
              </p>
            </div>
          </div>
        </div>

        <article
          className="prose prose-lg max-w-none dark:prose-invert mb-10"
          itemScope
          itemType="https://schema.org/Article"
        >
          <h2>
            Ремонт китайских автомобилей в {cityPrep}: сервис без «угадайки»
          </h2>
          <p>
            Китайские марки чувствительны к качеству топлива, датчикам и блокам
            управления. В{" "}
            <a
              href={`/${city}`}
              className="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
            >
              Nexton в {cityPrep}
            </a>{" "}
            сначала сканер и осмотр, затем ремонт: двигатель, ходовая, электрика
            12 В или кузов после ДТП. Электромобили не принимаем.
          </p>

          <h3>Какие работы выполняем в {cityPrep}</h3>
          <ul>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/remont-kitayskih-avtomobiley`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Комплексный ремонт китайских авто
                </Link>
              </strong>{" "}
              — диагностика, узлы, электрика, климат в одном сервисе
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/diagnostika-kitayskogo-avto`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Компьютерная диагностика
                </Link>
              </strong>{" "}
              — ошибки, датчики, проверка перед покупкой
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/vosstanovlenie-kitayskogo-avto`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Восстановление после ДТП
                </Link>
              </strong>{" "}
              — геометрия на стапеле, споттер, покраска
            </li>
            <li>
              <strong>
                <Link
                  href={`/${city}/usluga/remont-dvigatelya-hodovoy-kitayskogo-avto`}
                  className="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline"
                >
                  Двигатель и ходовая
                </Link>
              </strong>{" "}
              — течи, перегрев, стуки подвески, тормоза
            </li>
          </ul>

          <h3>Почему китайские авто везут в Nexton в {cityPrep}</h3>
          <ul>
            <li>
              ✅ <strong>Диагностика до ремонта</strong> — не меняем запчасти
              «на всякий случай»
            </li>
            <li>
              ✅ <strong>Кузов и механика в одном месте</strong> — после ДТП не
              нужно ездить по разным мастерским
            </li>
            <li>
              ✅ <strong>Смета до старта работ</strong> — цены в BYN, без
              скрытых доплат
            </li>
            <li>
              ✅ <strong>Гарантия</strong> — до 6 месяцев на ремонт, до 12
              месяцев на кузовные работы
            </li>
          </ul>
        </article>

        <section aria-labelledby="services-title">
          <h2
            id="services-title"
            className="text-2xl font-bold text-black dark:text-white mb-6"
          >
            Услуги по китайским автомобилям в {cityPrep}
          </h2>
          <div
            className="grid sm:grid-cols-2 gap-6 mb-10"
            role="list"
            aria-label="Список услуг по китайским автомобилям"
          >
            {kitayskieServices.map((service) => {
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

        <section
          className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 mb-10 border border-gray-200 dark:border-gray-800"
          aria-labelledby="brands-title"
        >
          <h2
            id="brands-title"
            className="text-2xl font-bold text-black dark:text-white mb-4"
          >
            Марки, которые принимаем
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Бензиновые модели: Geely и Belgee, Chery, Exeed, Omoda, Jaecoo,
            Haval, Tank, Great Wall, Changan. Электромобили и электрические
            версии марок не принимаем.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
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

        <article
          className="prose prose-lg max-w-none dark:prose-invert mb-10"
          itemScope
          itemType="https://schema.org/Article"
        >
          <h2>Как проходит ремонт китайского авто в {cityPrep}</h2>
          <ol>
            <li>
              <strong>Запись и осмотр</strong> — описываете симптомы или
              привозите авто после ДТП
            </li>
            <li>
              <strong>Диагностика</strong> — сканер, осмотр ходовой, при
              необходимости вибростенд
            </li>
            <li>
              <strong>Смета</strong> — согласовываем работы и запчасти до
              старта
            </li>
            <li>
              <strong>Ремонт</strong> — механика, электрика или кузов
            </li>
            <li>
              <strong>Сдача</strong> — проверка, гарантия, рекомендации по
              обслуживанию
            </li>
          </ol>

          <h3>Сколько стоит ремонт китайского авто в {cityPrep}</h3>
          <p>
            Ориентир: компьютерная диагностика от 40 Br, диагностика ходовой от
            70 Br, кузов и двигатель — после осмотра. Точную сумму называем до
            начала работ.
          </p>
        </article>

        <section
          className="bg-[#1e3a5f] dark:bg-[#1a2a3a] rounded-2xl p-6 sm:p-8 text-white"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title" className="text-2xl font-bold mb-4">
            Запишитесь на ремонт китайского авто в {cityPrep}
          </h2>
          <p className="text-white/80 mb-6">
            Привезите бензиновый Geely, Haval, Chery или другую китайскую марку
            — оценим и составим смету. Электромобили не принимаем.
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
