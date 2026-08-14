import Link from "next/link";
import { articles } from "./data/articles";
import { Calendar, Clock, FolderOpen, ArrowRight, Tag } from "lucide-react";
import { getBlogListVideo } from "@/data/categoryMedia";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог автосервиса Nexton | Автокондиционеры, кузов, советы автовладельцам",
  description:
    "Статьи автосервиса Nexton: ремонт автокондиционеров, вебасто, радиаторов и систем охлаждения, кузов, китайские авто. Советы автовладельцам в Полоцке и Новополоцке.",
  keywords:
    "блог, статьи, автосервис Полоцк, ремонт автокондиционеров, вебасто, радиаторы, кузовной ремонт, Полоцк, Новополоцк",
  openGraph: {
    title: "Блог автосервиса Nexton | Полезные статьи для автовладельцев",
    description:
      "Статьи по ремонту автокондиционеров, вебасто, радиаторов, систем охлаждения и кузова.",
    url: "https://nexton.vip/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://nexton.vip/blog",
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ✅ ФУНКЦИЯ ДЛЯ ВИДЕО ПО КАТЕГОРИИ
function getVideoForCategory(category: string): string {
  return getBlogListVideo(category);
}

// ✅ ФУНКЦИЯ ДЛЯ ЗАГЛУШКИ (ПОСТЕРА)
function getPosterForCategory(category: string): string {
  const posterMap: Record<string, string> = {
    "Ремонт автокондиционеров": "/images/blog/posters/ac-poster.jpg",
    "Ремонт Webasto": "/images/blog/posters/webasto-poster.jpg",
    "Ремонт радиаторов": "/images/blog/posters/radiator-poster.jpg",
    "Советы автовладельцам": "/images/blog/posters/maintenance-poster.jpg",
  };
  return posterMap[category] || "/images/blog/posters/default.jpg";
}

// ✅ ФУНКЦИЯ ДЛЯ ИКОНКИ КАТЕГОРИИ (ЗАГЛУШКА)
function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    "Ремонт автокондиционеров": "❄️",
    "Ремонт Webasto": "🔥",
    "Ремонт радиаторов": "🌡️",
    "Советы автовладельцам": "🔧",
    "Кузовные работы": "🔨", // 👈 ДОБАВИТЬ
  };
  return iconMap[category] || "🚗";
}

export default function BlogPage() {
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const categories = sortedArticles.reduce(
    (acc, article) => {
      if (!acc[article.category]) {
        acc[article.category] = [];
      }
      acc[article.category].push(article);
      return acc;
    },
    {} as Record<string, typeof articles>,
  );

  return (
    <main
      className="min-h-screen bg-white dark:bg-black overflow-x-hidden"
      role="main"
      aria-label="Главная страница блога"
    >
      {/* ✅ HERO С ВИДЕО И ЗАГЛУШКОЙ */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        {/* Заглушка (пока грузится видео) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] to-[#2b4c7c] dark:from-[#1a2a3a] dark:to-[#0d1a2a]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl opacity-20">🎬</span>
        </div>

        {/* Видео */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/blog/posters/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/blog/hero.mp4" type="video/mp4" />
        </video>

        {/* Затемнение */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        {/* Контент */}
        <div className="relative h-full flex items-center justify-center z-10">
          <div className="text-center text-white px-4 max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4 border border-white/20">
              Полезные статьи
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Блог <span className="text-[#7a9bcb]">Nexton</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Статьи автосервиса: ремонт автокондиционеров, вебасто, радиаторов
              и систем охлаждения, кузов, советы автовладельцам
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Последние статьи */}
        <section className="mb-12" aria-labelledby="recent-articles-title">
          <div className="flex items-center justify-between mb-6">
            <h2
              id="recent-articles-title"
              className="text-2xl font-bold text-black dark:text-white flex items-center gap-2"
            >
              <span
                className="w-1 h-6 bg-[#1e3a5f] dark:bg-[#7a9bcb] rounded-full"
                aria-hidden="true"
              />
              Последние статьи
            </h2>
            <Link
              href="/blog"
              className="text-sm text-[#1e3a5f] dark:text-[#7a9bcb] hover:underline font-medium"
            >
              Все статьи →
            </Link>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label="Список последних статей"
          >
            {sortedArticles.slice(0, 6).map((article, index) => (
              <article
                key={article.id}
                role="listitem"
                className="group block rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={`/blog/${article.slug}`}
                  aria-label={`Читать статью: ${article.title}`}
                  className="block h-full"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                    {/* ✅ Заглушка (пока грузится видео) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/20 to-[#2b4c7c]/20 dark:from-[#7a9bcb]/10 dark:to-[#5a7bb0]/10 flex items-center justify-center">
                      <span className="text-6xl opacity-30">
                        {getCategoryIcon(article.category)}
                      </span>
                    </div>

                    {/* ✅ Видео с poster (БЕЗ loading) */}
                    <video
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      poster={getPosterForCategory(article.category)}
                    >
                      <source
                        src={getVideoForCategory(article.category)}
                        type="video/mp4"
                      />
                    </video>

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"
                      aria-hidden="true"
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="inline-block px-3 py-1 bg-black/70 dark:bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white/80 text-[10px] flex items-center gap-1">
                      <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                      HD
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2 group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {article.description}
                    </p>

                    {/* Метки */}
                    {article.keywords && article.keywords.length > 0 && (
                      <div
                        className="flex flex-wrap gap-1.5 mb-3"
                        role="list"
                        aria-label="Метки статьи"
                      >
                        {article.keywords.slice(0, 3).map((keyword, idx) => (
                          <span
                            key={idx}
                            role="listitem"
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-[#1e3a5f] dark:hover:bg-[#7a9bcb] hover:text-white dark:hover:text-black hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {keyword}
                          </span>
                        ))}
                        {article.keywords.length > 3 && (
                          <span className="px-2.5 py-0.5 text-[10px] text-gray-400 dark:text-gray-600">
                            +{article.keywords.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" aria-hidden="true" />
                          <time dateTime={article.date}>
                            {formatDate(article.date)}
                          </time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {article.readingTime} мин
                        </span>
                      </div>
                      <span className="text-[#1e3a5f] dark:text-[#7a9bcb] font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Читать{" "}
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* КАТЕГОРИИ */}
        <section className="mb-12" aria-labelledby="categories-title">
          <h2
            id="categories-title"
            className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-2"
          >
            <span
              className="w-1 h-6 bg-[#1e3a5f] dark:bg-[#7a9bcb] rounded-full"
              aria-hidden="true"
            />
            Все категории
          </h2>

          <div
            className="relative overflow-hidden py-4"
            role="navigation"
            aria-label="Категории статей"
          >
            <div className="flex gap-3 animate-infinite-scroll">
              {Object.keys(categories).map((category) => {
                const slug = categories[category][0]?.categorySlug;
                return (
                  <Link
                    key={category}
                    href={`/blog/category/${slug}`}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 font-medium hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                    aria-label={`Категория: ${category}, ${categories[category].length} статей`}
                  >
                    <FolderOpen
                      className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb]"
                      aria-hidden="true"
                    />
                    {category}
                    <span
                      className="ml-1 text-xs text-gray-400 dark:text-gray-600"
                      aria-hidden="true"
                    >
                      ({categories[category].length})
                    </span>
                  </Link>
                );
              })}
              {Object.keys(categories).map((category) => {
                const slug = categories[category][0]?.categorySlug;
                return (
                  <Link
                    key={`dup-${category}`}
                    href={`/blog/category/${slug}`}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 font-medium hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                    aria-label={`Категория: ${category}, ${categories[category].length} статей`}
                  >
                    <FolderOpen
                      className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb]"
                      aria-hidden="true"
                    />
                    {category}
                    <span
                      className="ml-1 text-xs text-gray-400 dark:text-gray-600"
                      aria-hidden="true"
                    >
                      ({categories[category].length})
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* СТАТЬИ ПО КАТЕГОРИЯМ */}
        {Object.entries(categories).map(([category, categoryArticles]) => (
          <section
            key={category}
            className="mb-12"
            aria-labelledby={`category-${category.replace(/\s+/g, "-")}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                id={`category-${category.replace(/\s+/g, "-")}`}
                className="text-xl font-bold text-black dark:text-white flex items-center gap-2"
              >
                <FolderOpen
                  className="w-5 h-5 text-[#1e3a5f] dark:text-[#7a9bcb]"
                  aria-hidden="true"
                />
                {category}
                <span
                  className="text-sm font-normal text-gray-500 dark:text-gray-500"
                  aria-hidden="true"
                >
                  ({categoryArticles.length})
                </span>
              </h3>
              <Link
                href={`/blog/category/${categoryArticles[0]?.categorySlug}`}
                className="text-sm text-[#1e3a5f] dark:text-[#7a9bcb] hover:underline"
                aria-label={`Все статьи в категории ${category}`}
              >
                Все статьи →
              </Link>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              role="list"
              aria-label={`Статьи в категории ${category}`}
            >
              {categoryArticles.slice(0, 3).map((article, index) => (
                <article
                  key={article.id}
                  role="listitem"
                  className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    href={`/blog/${article.slug}`}
                    aria-label={`Читать статью: ${article.title}`}
                    className="block h-full"
                  >
                    <div className="relative h-32 w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 mb-3">
                      {/* Заглушка */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/20 to-[#2b4c7c]/20 dark:from-[#7a9bcb]/10 dark:to-[#5a7bb0]/10 flex items-center justify-center">
                        <span className="text-4xl opacity-30">
                          {getCategoryIcon(article.category)}
                        </span>
                      </div>
                      {/* Видео (БЕЗ loading) */}
                      <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        poster={getPosterForCategory(article.category)}
                      >
                        <source
                          src={getVideoForCategory(article.category)}
                          type="video/mp4"
                        />
                      </video>
                      <div className="absolute inset-0 bg-black/30" />
                    </div>
                    <h4 className="font-bold text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                      {article.description}
                    </p>

                    {article.keywords && article.keywords.length > 0 && (
                      <div
                        className="flex flex-wrap gap-1 mt-2"
                        role="list"
                        aria-label="Метки статьи"
                      >
                        {article.keywords.slice(0, 2).map((keyword, idx) => (
                          <span
                            key={idx}
                            role="listitem"
                            className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-[9px] text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-[#1e3a5f] dark:hover:bg-[#7a9bcb] hover:text-white dark:hover:text-black hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300"
                          >
                            <Tag className="w-2 h-2" />
                            {keyword}
                          </span>
                        ))}
                        {article.keywords.length > 2 && (
                          <span className="text-[9px] text-gray-400 dark:text-gray-600">
                            +{article.keywords.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        <time dateTime={article.date}>
                          {formatDate(article.date)}
                        </time>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {article.readingTime} мин
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* SEO-текст */}
        <footer
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 animate-fade-in"
          role="contentinfo"
          aria-label="О блоге"
        >
          <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
            Автосервис Nexton: ремонт автокондиционеров и систем охлаждения в
            Полоцке и Новополоцке
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            В блоге СТО Nexton публикуем статьи о ремонте автокондиционеров,
            вебасто, радиаторов и систем охлаждения, а также о кузове и
            обслуживании авто. Здесь вы найдете советы по обслуживанию
            автомобиля, информацию о типичных неисправностях и способах их
            устранения. Мы работаем в Полоцке и Новополоцке с 2010 года и
            делимся своим опытом, чтобы помочь автовладельцам продлить срок
            службы своих автомобилей.
          </p>
        </footer>
      </div>
    </main>
  );
}
