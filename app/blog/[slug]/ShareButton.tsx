"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  description: string;
  slug: string;
}

export function ShareButton({ title, description, slug }: ShareButtonProps) {
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    const url = `https://nexton.vip/blog/${slug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 3000);
      }
    } catch (error) {
      // Пользователь отменил или ошибка
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Ошибка при шаринге:", error);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#1e3a5f] dark:hover:bg-[#7a9bcb] transition-colors group"
        aria-label="Поделиться статьей"
        type="button"
      >
        <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
      </button>
      {isShared && (
        <span
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded whitespace-nowrap"
          role="status"
          aria-live="polite"
        >
          Ссылка скопирована!
        </span>
      )}
    </div>
  );
}
