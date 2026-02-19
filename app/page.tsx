import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { Thermometer, Wind, Truck, Flame, Wrench, Zap } from "lucide-react";
import type { Metadata } from 'next';

// Метаданные для главной страницы
export const metadata: Metadata = {
  title: "Ремонт систем охлаждения и автокондиционеров в Полоцке | Nexton",
  description: "Профессиональный ремонт систем охлаждения, автокондиционеров, радиаторов в Полоцке. Заправка кондиционеров, ремонт Webasto, аргонная сварка. Гарантия 6 месяцев. Звоните: +375297115091",
  openGraph: {
    title: "Ремонт систем охлаждения и автокондиционеров в Полоцке",
    description: "Профессиональный ремонт систем охлаждения, автокондиционеров, радиаторов. Заправка кондиционеров, ремонт Webasto, аргонная сварка.",
    url: 'https://nexton.vip',
    siteName: 'Nexton Полоцк',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexton - ремонт систем охлаждения в Полоцке',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
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
    name: "Грузовые автомобили",
    icon: Truck,
    description: "Радиаторы и топливные баки для грузовиков",
  },
  {
    id: "plastik",
    name: "Ремонт автопластика",
    icon: Wrench,
    description: "Бамперы, бачки, патрубки",
  }
];

export default function Home() {
  // Schema.org разметка для услуг на главной
  const serviceSchema = services.map(service => ({
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
  }));

  return (
    <>
      {/* Schema.org разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />

      {/* Hero секция */}
      <HeroSection />
      
      {/* Услуги */}
      <section id="services" className="py-20 bg-white dark:bg-black border-y border-gray-200 dark:border-gray-800 animate-fade-in-up"></section>
      <section id="services" className="py-20 bg-white dark:bg-black border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
              Услуги по ремонту систем охлаждения в Полоцке
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Профессиональный ремонт и обслуживание систем охлаждения, кондиционеров и автономных отопителей
            </p>
          </div>

          {/* Категории */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="card p-6 block hover:translate-y-[-2px] transition-all duration-200"
                >
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-black dark:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {category.description}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Услуги по категориям */}
          {categories.map((category) => {
            const categoryServices = services.filter(s => s.category === category.id);
            if (categoryServices.length === 0) return null;
            
            const Icon = category.icon;
            
            return (
              <div key={category.id} id={category.id} className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <Icon className="w-6 h-6 text-black dark:text-white" />
                  <h2 className="text-2xl font-bold text-black dark:text-white">
                    {category.name} в Полоцке
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-500 ml-auto">
                    {categoryServices.length} услуг
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* О компании */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 animate-fade-in-up" style={{ animationDelay: "0.2s" }}></section>
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
                О компании Nexton в Полоцке
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Мы специализируемся на ремонте систем охлаждения и автокондиционеров с 2010 года. 
                За это время мы помогли тысячам автовладельцев в Полоцке и области.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Наши мастера проходят регулярное обучение и используют профессиональное оборудование. 
                Мы даем гарантию до 6 месяцев на все виды работ.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Работаем с частными лицами и организациями. Выезжаем на место по необходимости.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">
                Наши преимущества
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black dark:bg-white mt-2"></span>
                  <span className="text-gray-600 dark:text-gray-400">Опыт работы более 15 лет</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black dark:bg-white mt-2"></span>
                  <span className="text-gray-600 dark:text-gray-400">Современное диагностическое оборудование</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black dark:bg-white mt-2"></span>
                  <span className="text-gray-600 dark:text-gray-400">Гарантия до 6 месяцев</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black dark:bg-white mt-2"></span>
                  <span className="text-gray-600 dark:text-gray-400">Бесплатная диагностика при ремонте</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black dark:bg-white mt-2"></span>
                  <span className="text-gray-600 dark:text-gray-400">Оригинальные запчасти и материалы</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="py-20 bg-white dark:bg-black animate-fade-in-up" style={{ animationDelay: "0.4s" }}></section>
      <section id="contacts" className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
              Контакты в Полоцке
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card p-6 text-center">
              <h3 className="font-bold mb-2 text-black dark:text-white">Телефон / Telegram</h3>
              <a 
                href="tel:+375297115091" 
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg transition-colors block"
              >
                +375 (29) 711-50-91
              </a>
              <a
                href="https://t.me/+375297115091"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
              >
                Написать в Telegram →
              </a>
            </div>
            
            <div className="card p-6 text-center">
              <h3 className="font-bold mb-2 text-black dark:text-white">Адрес</h3>
              <p className="text-gray-600 dark:text-gray-400">г. Полоцк, ул. Строительная 21в/3</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">блок 9, бокс 3</p>
              <a 
                href="https://yandex.by/maps/?text=Полоцк%20ул.%20Строительная%2021в"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
              >
                Открыть на карте →
              </a>
            </div>
            
            <div className="card p-6 text-center">
              <h3 className="font-bold mb-2 text-black dark:text-white">Режим работы</h3>
              <p className="text-gray-600 dark:text-gray-400">Пн-Пт: 09:00 - 19:00</p>
              <p className="text-gray-600 dark:text-gray-400">Сб: 10:00 - 16:00</p>
              <p className="text-gray-600 dark:text-gray-400">Вс: по записи</p>
            </div>
          </div>
          
          {/* Схема проезда */}
          <div className="mt-12 text-center">
            <div className="border-2 border-gray-200 dark:border-gray-800 p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Как нас найти</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Мы находимся по адресу: <strong>ул. Строительная 21в/3, блок 9, бокс 3</strong>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Ориентир: промзона, въезд со стороны ул. Строительная
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <a
                  href="https://t.me/+375297115091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <span>Telegram</span>
                </a>
                <a
                  href="tel:+375297115091"
                  className="btn-primary"
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