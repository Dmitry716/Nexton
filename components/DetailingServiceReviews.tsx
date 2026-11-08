import { Star } from "lucide-react";

interface Review {
  name: string;
  car: string;
  text: string;
  rating: number;
}

interface Props {
  reviews: Review[];
  serviceName: string;
}

export default function DetailingServiceReviews({
  reviews,
  serviceName,
}: Props) {
  return (
    <section aria-labelledby="reviews-title" className="mb-16">
      <h2
        id="reviews-title"
        className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 text-center"
      >
        Отзывы о {serviceName.toLowerCase()}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:shadow-md transition-all"
          >
            <div
              className="flex items-center gap-0.5 mb-3"
              aria-label={`Оценка ${review.rating} из 5`}
            >
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className={`w-4 h-4 ${
                    starIndex < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300 dark:text-gray-700"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              «{review.text}»
            </p>
            <p className="text-sm font-semibold text-black dark:text-white">
              {review.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {review.car}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
