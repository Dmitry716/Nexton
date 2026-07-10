"use client";

import { useState, useEffect } from "react";
import { Play, Calendar, Eye } from "lucide-react";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  views?: string;
}

interface YoutubeItem {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { high: { url: string } };
    publishedAt: string;
  };
}

// Демо-видео (если API не работает или нет ключа)
const DEMO_VIDEOS: Video[] = [
  {
    id: "demo1",
    title: "Ремонт автокондиционера BMW X5 в Полоцке",
    thumbnail: "https://img.youtube.com/vi/placeholder/mqdefault.jpg",
    publishedAt: "2026-07-01",
  },
  {
    id: "demo2",
    title: "Заправка кондиционера — как мы работаем",
    thumbnail: "https://img.youtube.com/vi/placeholder/mqdefault.jpg",
    publishedAt: "2026-06-15",
  },
  {
    id: "demo3",
    title: "Восстановление геометрии кузова на стапеле",
    thumbnail: "https://img.youtube.com/vi/placeholder/mqdefault.jpg",
    publishedAt: "2026-06-01",
  },
];

export default function YoutubeGallery() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/youtube");
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const formattedVideos = data.items.map((item: YoutubeItem) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(
              "ru-RU",
            ),
          }));
          setVideos(formattedVideos);
        } else {
          setVideos(DEMO_VIDEOS);
        }
      } catch {
        setVideos(DEMO_VIDEOS);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-xl aspect-video" />
            <div className="mt-3 h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="mt-2 h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <a
          key={video.id}
          href={`https://youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300 hover:shadow-xl hover:shadow-[#1e3a5f]/10 dark:hover:shadow-[#7a9bcb]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] focus-visible:ring-offset-2"
          aria-label={`Смотреть видео: ${video.title} (откроется в новом окне)`}
        >
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <Image
              src={video.thumbnail}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                <Play className="w-6 h-6 text-[#1e3a5f] ml-1" />
              </div>
            </div>
          </div>

          <div className="p-4">
            <h4 className="text-sm font-bold text-black dark:text-white line-clamp-2 group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors duration-300">
              {video.title}
            </h4>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {video.publishedAt}
              </span>
              {video.views && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {video.views}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
