import Link from "next/link";
import { Home, MapPin } from "lucide-react";
import { cities } from "@/data/cities";

export default function CityNotFound() {
  const cityList = cities.map(c => c.name).join(", ");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
        <div className="w-24 h-1 bg-[#1e3a5f] dark:bg-[#7a9bcb] mx-auto mb-6 rounded-full" />
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Город не найден
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Мы пока не работаем в этом городе.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
          Доступные города: <span className="font-medium text-black dark:text-white">{cityList}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2b4c7c] dark:bg-[#7a9bcb] dark:hover:bg-[#5a7bb0] text-white dark:text-black px-8 py-3 rounded-xl font-semibold transition-all"
          >
            <Home className="w-5 h-5" />
            На главную
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 border-2 border-[#1e3a5f] dark:border-[#7a9bcb] text-[#1e3a5f] dark:text-[#7a9bcb] hover:bg-[#1e3a5f] hover:text-white dark:hover:bg-[#7a9bcb] dark:hover:text-black px-8 py-3 rounded-xl font-semibold transition-all"
          >
            <MapPin className="w-5 h-5" />
            Выбрать город
          </Link>
        </div>
      </div>
    </div>
  );
}
