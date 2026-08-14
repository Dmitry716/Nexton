import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "../data/articles";
import { Calendar, Clock, FolderOpen, ArrowLeft } from "lucide-react";
import { ShareButton } from "./ShareButton";
import { getBlogArticleVideo } from "@/data/categoryMedia";
import type { Metadata } from "next";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Статья не найдена",
    };
  }

  return {
    title: `${article.title} | Блог Nexton`,
    description: article.description,
    keywords: article.keywords?.join(", "),
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://nexton.vip/blog/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      authors: ["Nexton"],
    },
    alternates: {
      canonical: `https://nexton.vip/blog/${article.slug}`,
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

function getVideoForArticle(category: string): string | null {
  return getBlogArticleVideo(category);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const videoSrc = getVideoForArticle(article.category);

  return (
    <main
      className="min-h-screen bg-white dark:bg-black pt-16 overflow-x-hidden"
      role="main"
      aria-label="Страница статьи"
    >
      <article
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
        itemScope
        itemType="https://schema.org/Article"
      >
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

        {/* ВИДЕО */}
        {videoSrc ? (
          <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-800">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
            <div className="relative h-full flex items-center justify-center z-10">
              <div className="text-center text-white px-4 max-w-3xl">
                <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white/90">
                    {article.category}
                  </span>
                  <span className="text-white/70 text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.date)}
                  </span>
                  <span className="text-white/70 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readingTime} мин
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                  {article.title}
                </h1>
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                  {article.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-500 dark:text-gray-500">
              <span className="inline-flex items-center gap-1">
                <FolderOpen className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb]" />
                {article.category}
              </span>
              <span className="w-px h-4 bg-gray-300 dark:bg-gray-700" />
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>
              <span className="w-px h-4 bg-gray-300 dark:bg-gray-700" />
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readingTime} мин чтения
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3">
              {article.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {article.description}
            </p>
          </header>
        )}

        {/* ✅ КОНТЕНТ СТАТЬИ - ЧИСТО И ПРОСТО */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: article.content }}
          itemProp="articleBody"
        />

        {/* FAQ */}
        {article.faq && article.faq.length > 0 && (
          <section
            className="mt-10 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            aria-labelledby="faq-title"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <h2
              id="faq-title"
              className="text-2xl font-bold text-black dark:text-white mb-4"
            >
              Часто задаваемые вопросы
            </h2>
            <div className="space-y-4">
              {article.faq.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <h3
                    className="text-lg font-semibold text-black dark:text-white mb-2"
                    itemProp="name"
                  >
                    {item.question}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="text"
                  >
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer
          className="mt-8 flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-800"
          aria-label="Поделиться статьей"
        >
          <span className="text-sm text-gray-500 dark:text-gray-500">
            Поделиться:
          </span>
          <ShareButton
            title={article.title}
            description={article.description}
            slug={article.slug}
          />
        </footer>
      </article>

      {relatedArticles.length > 0 && (
        <section
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
          aria-labelledby="related-articles-title"
        >
          <h2
            id="related-articles-title"
            className="text-2xl font-bold text-black dark:text-white mb-6 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            Похожие статьи
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            role="list"
            aria-label="Список похожих статей"
          >
            {relatedArticles.map((related) => (
              <article
                key={related.id}
                role="listitem"
                className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <Link
                  href={`/blog/${related.slug}`}
                  aria-label={`Читать статью: ${related.title}`}
                  className="block h-full"
                >
                  <h4 className="font-bold text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                    {related.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <time dateTime={related.date}>
                        {formatDate(related.date)}
                      </time>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {related.readingTime} мин
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
