import Image from "next/image";
import { getLatestVideos } from "@/lib/youtube";

export default async function YoutubeGallery() {
  const videos = await getLatestVideos(6);

  if (videos.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
        Видео скоро появятся
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <a
          key={video.videoId}
          href={video.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300 hover:shadow-xl"
          aria-label={`Смотреть видео: ${video.title} (откроется на YouTube)`}
        >
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-black dark:text-white line-clamp-2 group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors text-sm sm:text-base">
              {video.title}
            </h3>
          </div>
        </a>
      ))}
    </div>
  );
}
