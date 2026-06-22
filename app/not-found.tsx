import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4 py-20">
      <div className="text-center max-w-2xl">
        {/* 404 с градиентом */}
        <h1 className="text-9xl sm:text-[12rem] font-bold leading-none mb-4">
          <span className="gradient-text">404</span>
        </h1>
        
        <div className="w-24 h-1 bg-[#1e3a5f] dark:bg-[#7a9bcb] mx-auto mb-6 rounded-full"></div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4">
          Страница не найдена
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#2b4c7c] dark:bg-[#7a9bcb] dark:hover:bg-[#5a7bb0] text-white dark:text-black px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#1e3a5f]/20 dark:hover:shadow-[#7a9bcb]/20"
          >
            <Home className="w-5 h-5" />
            На главную
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#1e3a5f] dark:border-[#7a9bcb] text-[#1e3a5f] dark:text-[#7a9bcb] hover:bg-[#1e3a5f] hover:text-white dark:hover:bg-[#7a9bcb] dark:hover:text-black px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            К услугам
          </Link>
        </div>

        {/* Декоративные элементы */}
        <div className="mt-12 flex justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1e3a5f] dark:bg-[#7a9bcb] opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-[#1e3a5f] dark:bg-[#7a9bcb] opacity-30"></div>
          <div className="w-2 h-2 rounded-full bg-[#1e3a5f] dark:bg-[#7a9bcb] opacity-10"></div>
        </div>
      </div>
    </div>
  );
}
