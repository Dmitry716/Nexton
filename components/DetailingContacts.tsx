import { ExternalLink } from "lucide-react";

interface Props {
  /** Название города для заголовка (опционально) */
  cityName?: string;
  /** Показывать карту (на главной детейлинга — да, на услугах — можно без) */
  showMap?: boolean;
}

export default function DetailingContacts({ cityName, showMap = true }: Props) {
  const title = cityName
    ? `Контакты в ${cityName}`
    : "Контакты в Полоцке и Новополоцке";

  return (
    <section
      aria-labelledby="contacts-title"
      className="py-16 bg-white dark:bg-black"
    >
      {/* JSON-LD AutomotiveBusiness — правильный тип для автосервиса */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutomotiveBusiness",
            name: "Nexton Detailing",
            description:
              "Детейлинг студия: оклейка, тонировка, химчистка, полировка, керамика, антикор.",
            url: "https://nexton.vip/detailing",
            telephone: "+375297115091",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Строительная 21в/3, блок 9, бокс 3",
              addressLocality: "Полоцк",
              addressRegion: "Витебская область",
              postalCode: "211400",
              addressCountry: "BY",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 55.4856,
              longitude: 28.7856,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "10:00",
                closes: "18:00",
              },
            ],
            areaServed: [
              { "@type": "City", name: "Полоцк" },
              { "@type": "City", name: "Новополоцк" },
            ],
            sameAs: [
              "https://t.me/+375297115091",
              "https://vk.com/club164841898",
              "https://www.instagram.com/nextonservice/",
            ],
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="contacts-title"
            className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3"
          >
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Приезжайте или позвоните — ответим на вопросы и запишем на удобное
            время.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {/* Телефон */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-center">
            <div className="text-3xl mb-3" aria-hidden="true">
              📞
            </div>
            <h3 className="font-bold text-black dark:text-white mb-2">
              Телефон / Telegram
            </h3>
            <a
              href="tel:+375297115091"
              className="text-[#1e3a5f] dark:text-[#7a9bcb] hover:underline text-lg font-medium"
            >
              +375 (29) 711-50-91
            </a>
          </div>

          {/* Адрес */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-center">
            <div className="text-3xl mb-3" aria-hidden="true">
              📍
            </div>
            <h3 className="font-bold text-black dark:text-white mb-2">Адрес</h3>
            <a
              href="https://yandex.ru/maps/?text=Полоцк, Строительная 21в/3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-colors inline-flex items-center gap-1"
            >
              ул. Строительная 21в/3
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>

          {/* Часы */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-center">
            <div className="text-3xl mb-3" aria-hidden="true">
              🕐
            </div>
            <h3 className="font-bold text-black dark:text-white mb-2">
              Режим работы
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Пн–Пт: 10:00–18:00
              <br />
              Сб–Вс: выходной
            </p>
          </div>
        </div>

        {showMap && (
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A091537b61c73c1e9afc0a1a9fdee72b65a2a03cf0ed761b60d52a61f2d0ea669&source=constructor"
              width="100%"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта проезда Nexton"
              className="w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
