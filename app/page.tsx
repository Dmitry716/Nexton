import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { getCategoryImageThumb } from "@/data/categoryImages";
import VkIcon from "@/components/icons/VkIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import {
  Thermometer,
  Wind,
  Truck,
  Flame,
  Wrench,
  Zap,
  Send,
} from "lucide-react";
import type { Metadata } from "next";

const YANDEX_MAP_URL =
  "https://yandex.ru/map-widget/v1/?um=constructor%3A091537b61c73c1e9afc0a1a9fdee72b65a2a03cf0ed761b60d52a61f2d0ea669&source=constructor";

// Метаданные для главной страницы
export const metadata: Metadata = {
  title:
    "Заправка и ремонт кондиционеров, ремонт вебасто и систем охлаждения авто в Полоцке и Новополоцке | Nexton",
  description:
    "Профессиональный ремонт систем охлаждения, автокондиционеров, радиаторов в Полоцке и Новополоцке. Заправка кондиционеров, ремонт Webasto, аргонная сварка. Гарантия 6 месяцев. Звоните: +375297115091",
  openGraph: {
    title: "Заправка и ремонт кондиционеров, ремонт вебасто и систем охлаждения авто в Полоцке и Новополоцке",
    description:
      "Профессиональный ремонт систем охлаждения, автокондиционеров, радиаторов в Полоцке и Новополоцке. Заправка кондиционеров, ремонт Webasto, аргонная сварка.",
    url: "https://nexton.vip",
    siteName: "Nexton Полоцк — Новополоцк",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexton - ремонт систем охлаждения в Полоцке и Новополоцке",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

// Категории услуг
const categories = [
  {
    id: "avtokondicionery",
    name: "Автокондиционеры",
    icon: Wind,
    description: "Диагностика, заправка и ремонт кондиционеров",
  },
  {
    id: "otopiteli",
    name: "Автономные отопители",
    icon: Flame,
    description: "Webasto, Eberspacher, Планар, Бинар",
  },
  {
    id: "radiatory",
    name: "Ремонт радиаторов",
    icon: Thermometer,
    description: "Все виды радиаторов охлаждения",
  },
  {
    id: "svarka",
    name: "Аргонная сварка",
    icon: Zap,
    description: "Сварка алюминия, нержавейки, пайка",
  },
  {
    id: "gruzovye",
    name: "Ремонт радиаторов и топливных баков для грузовиков",
    icon: Truck,
    description: "Радиаторы и топливные баки для грузовиков",
  },
  {
    id: "pnevmosistemy_legkovyh",
    name: "Пневмосистемы легковых авто",
    // Пневмоподвеска/пневмоприводы по смыслу ближе к работам по узлам и ремонту
    icon: Wrench,
    description: "Диагностика и ремонт пневмоподвески легковых автомобилей",
  },
  {
    id: "plastik",
    name: "Ремонт автопластика",
    icon: Wrench,
    description: "Бамперы, бачки, патрубки",
  },
];

export default function Home() {
  // Schema.org разметка для услуг на главной
  const serviceSchema = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "AutoRepair",
      name: "Nexton",
      url: "https://nexton.vip",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Строительная 21в/3, блок 9, бокс 3",
        addressLocality: "Полоцк, Новополоцк",
        addressRegion: "Витебская область",
        postalCode: "211400",
        addressCountry: "BY",
      },
      telephone: "+375297115091",
    },
    areaServed: [
      { "@type": "City", name: "Полоцк" },
      { "@type": "City", name: "Новополоцк" },
    ],
  }));

  return (
    <>
      {/* Schema.org разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      {/* Hero секция */}
      <HeroSection />

      {/* Почему мы */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-black dark:text-white mb-12">
            Почему выбирают Nexton
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: "Гарантия до 6 месяцев",
                text: "На все виды работ. Исправляем недостатки бесплатно в течение гарантийного срока.",
              },
              {
                title: "Опыт с 2010 года",
                text: "Тысячи довольных клиентов в Полоцке, Новополоцке и области. Знаем каждую систему.",
              },
              {
                title: "Профессиональное оборудование",
                text: "Станции заправки, диагностики, аргонная сварка, пайка. Работаем по технологии.",
              },
              {
                title: "Прозрачные цены",
                text: "Озвучиваем стоимость после осмотра. Никаких скрытых доплат. Цены в BYN.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-lg text-black dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section
        id="services"
        className="py-20 bg-white dark:bg-black border-y border-gray-200 dark:border-gray-800 relative overflow-hidden"
      >
        {/* Легкий синий градиент */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/5 via-transparent to-transparent dark:from-[#7a9bcb]/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            {/* Добавил анимацию появления для заголовка */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white animate-fade-in">
              Услуги по ремонту систем охлаждения в{" "}
              <span className="bg-gradient-to-r from-[#1e3a5f] to-[#2b4c7c] dark:from-[#7a9bcb] dark:to-[#5a7bb0] bg-clip-text text-transparent">
                Полоцке и Новополоцке
              </span>
            </h1>

            {/* Добавил анимацию с задержкой для описания */}
            <p
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in mb-6"
              style={{ animationDelay: "0.2s" }}
            >
              Профессиональный ремонт и обслуживание систем охлаждения,
              кондиционеров и автономных отопителей
            </p>
            <p
              className="text-sm text-gray-500 dark:text-gray-500 max-w-3xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Ниже — полный перечень услуг с описанием и ориентировочными ценами в белорусских рублях (BYN).
              На каждой странице услуги вы найдёте подробное описание работ, этапы и контакты для записи.
            </p>
          </div>

          {/* Категории с изображениями */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const img = getCategoryImageThumb(category.id);
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="group block rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {img && (
                    <div className="relative h-36 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    {!img && (
                      <div className="mb-4">
                        <Icon className="w-8 h-8 text-black dark:text-white" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2 text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {category.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Услуги по категориям */}
          {categories.map((category) => {
            const categoryServices = services.filter(
              (s) => s.category === category.id,
            );
            if (categoryServices.length === 0) return null;

            const Icon = category.icon;

            return (
              <div
                key={category.id}
                id={category.id}
                className="mb-20 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <Icon className="w-6 h-6 text-black dark:text-white" />
                  <h2 className="text-2xl font-bold text-black dark:text-white">
                    {category.name} в{" "}
                    <span className="bg-gradient-to-r from-[#1e3a5f] to-[#2b4c7c] dark:from-[#7a9bcb] dark:to-[#5a7bb0] bg-clip-text text-transparent">
                      Полоцке и Новополоцке
                    </span>
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-500 ml-auto">
                    {categoryServices.length} услуг
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service, idx) => (
                    <div
                      key={service.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <ServiceCard
                        service={service}
                        imageUrl={getCategoryImageThumb(category.id) ?? undefined}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* О компании */}
      <section
        id="about"
        className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/5 via-transparent to-transparent dark:from-[#7a9bcb]/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm">
                О компании
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight">
                Nexton в <span className="gradient-text">Полоцке и Новополоцке</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Мы специализируемся на ремонте систем охлаждения и
                автокондиционеров с 2010 года. За это время помогли тысячам
                автовладельцев в Полоцке, Новополоцке и области.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Наши мастера проходят регулярное обучение и используют
                профессиональное оборудование: станции заправки и диагностики,
                аргонная сварка, пайка. Гарантия до 6 месяцев на все виды работ.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Работаем с частными лицами и организациями. Выезжаем на место при
                необходимости. Цены фиксируем после осмотра — без скрытых доплат.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] dark:bg-[#7a9bcb]" />
                  Легковые и грузовые автомобили
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] dark:bg-[#7a9bcb]" />
                  Кондиционеры, отопители, радиаторы, пневмосистемы
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] dark:bg-[#7a9bcb]" />
                  Ремонт автопластика и аргонная сварка
                </li>
              </ul>

              {/* Статистика - с темно-красным акцентом и анимацией */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-[#800020] dark:text-[#b3545e] animate-count">
                    15+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 group-hover:text-[#800020] dark:group-hover:text-[#b3545e] transition-colors duration-300">
                    лет опыта
                  </div>
                </div>
                <div className="text-center group">
                  <div
                    className="text-4xl md:text-5xl font-bold text-[#800020] dark:text-[#b3545e] animate-count"
                    style={{ animationDelay: "0.2s" }}
                  >
                    1000+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 group-hover:text-[#800020] dark:group-hover:text-[#b3545e] transition-colors duration-300">
                    клиентов
                  </div>
                </div>
                <div className="text-center group">
                  <div
                    className="text-4xl md:text-5xl font-bold text-[#800020] dark:text-[#b3545e] animate-count"
                    style={{ animationDelay: "0.4s" }}
                  >
                    6
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 group-hover:text-[#800020] dark:group-hover:text-[#b3545e] transition-colors duration-300">
                    мес гарантии
                  </div>
                </div>
              </div>
            </div>

            {/* Видео вместо смайлика */}
            <div className="relative h-[400px] border border-gray-200 dark:border-gray-800 overflow-hidden group">
              {/* Видео фон */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              >
                <source src="/videos/about-bg.mp4" type="video/mp4" />
              </video>

              {/* Затемнение для текста */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>

              {/* Темно-синий градиент */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Текст поверх видео */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                  <p className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    Качество
                  </p>
                  <p className="text-xl text-white/90 drop-shadow">
                    которому доверяют
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section
        id="contacts"
        className="py-20 bg-white dark:bg-black relative overflow-hidden"
      >
        {/* Темно-синий градиент - очень тонкий */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1e3a5f]/5 to-transparent dark:from-[#7a9bcb]/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium mb-4 border border-gray-200 dark:border-gray-700">
              Свяжитесь с нами
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              Контакты в <span className="gradient-text">Полоцке и Новополоцке</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ответим на все вопросы и запишем на удобное время
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Телефон / Telegram",
                content: "+375 (29) 711-50-91",
                link: "tel:+375297115091",
                icon: "📞",
                delay: "0s",
              },
              {
                title: "Адрес",
                content: "ул. Строительная 21в/3, блок 9, бокс 3",
                link: YANDEX_MAP_URL,
                icon: "📍",
                delay: "0.2s",
              },
              {
                title: "Режим работы",
                content: "Пн-Пт: 10.00-18.00\nСб-Вс: выходной",
                icon: "🕐",
                delay: "0.4s",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card p-6 text-center hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-500 hover:shadow-xl hover:shadow-[#1e3a5f]/10 group"
                style={{ animationDelay: item.delay }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold mb-2 text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
                  {item.title}
                </h3>
                {item.link ? (
                  <a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-gray-600 dark:text-gray-400 hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] text-lg transition-colors block"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Схема проезда */}
          <div className="mt-12 text-center">
            <div className="border border-gray-200 dark:border-gray-800 p-8 max-w-2xl mx-auto hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-500 group">
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
                Как нас найти
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <span className="font-medium">Ориентир:</span> Северный рынок,
                г. Полоцк. Обслуживаем Полоцк и Новополоцк.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <span className="font-medium">Режим работы:</span> Пн-Пт:
                10.00-18.00, Сб-Вс - выходной
              </p>
              <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <iframe
                  src={YANDEX_MAP_URL}
                  width="100%"
                  height="420"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта проезда Nexton"
                  className="w-full"
                />
              </div>
              <div className="mb-6">
                <a
                  href={YANDEX_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  Открыть карту в Яндекс
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://t.me/+375297115091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 group/btn"
                >
                  <span>Telegram</span>
                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </a>
                <a
                  href="https://vk.com/club164841898"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 group/btn"
                >
                  <span>ВКонтакте</span>
                  <VkIcon
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </a>
                <a
                  href="https://www.instagram.com/nextonservice/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 group/btn"
                >
                  <span>Instagram</span>
                  <InstagramIcon
                    width={16}
                    height={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </a>
                <a
                  href="tel:+375297115091"
                  className="btn-primary bg-black text-white dark:bg-white dark:text-black hover:bg-[#1e3a5f] dark:hover:bg-[#7a9bcb] hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb]"
                >
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
