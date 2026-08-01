import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "../../data/articles";
import { Calendar, Clock, FolderOpen, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = [...new Set(articles.map((a) => a.categorySlug))];
  return categories.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryArticles = articles.filter((a) => a.categorySlug === slug);

  if (categoryArticles.length === 0) {
    return {
      title: "Категория не найдена",
    };
  }

  const categoryName = categoryArticles[0]?.category || slug;

  return {
    title: `${categoryName} | Блог Nexton`,
    description: `Статьи по теме ${categoryName.toLowerCase()} - полезная информация от Nexton`,
    openGraph: {
      title: `${categoryName} | Блог Nexton`,
      description: `Статьи по теме ${categoryName.toLowerCase()}`,
      url: `https://nexton.vip/blog/category/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://nexton.vip/blog/category/${slug}`,
    },
  };
}

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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryArticles = articles.filter((a) => a.categorySlug === slug);

  if (categoryArticles.length === 0) {
    notFound();
  }

  const categoryName = categoryArticles[0]?.category || "Категория";

  return (
    <main
      className="min-h-screen bg-white dark:bg-black pt-16"
      role="main"
      aria-label={`Страница категории: ${categoryName}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <nav aria-label="Навигация">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-[#1e3a5f] dark:hover:text-[#7a9bcb] transition-colors mb-4 group"
            aria-label="Вернуться к списку статей"
          >
            <ArrowLeft
              className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
            Назад к блогу
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-3">
            {categoryName}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Статьи по теме {categoryName.toLowerCase()}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-500">
            <span className="inline-flex items-center gap-1">
              <FolderOpen className="w-4 h-4" aria-hidden="true" />
              {categoryArticles.length} статей
            </span>
          </div>
        </header>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label={`Список статей в категории ${categoryName}`}
        >
          {categoryArticles.map((article) => (
            <article
              key={article.id}
              role="listitem"
              className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Link
                href={`/blog/${article.slug}`}
                aria-label={`Читать статью: ${article.title}`}
                className="block h-full"
              >
                <h2 className="text-xl font-bold text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {article.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
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
      </div>
    </main>
  );
}
