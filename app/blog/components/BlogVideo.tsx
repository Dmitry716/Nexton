"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BlogVideoProps {
  src: string;
  poster?: string;
  title: string;
  description?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export function BlogVideo({
  src,
  poster,
  title,
  description,
  className = "",
  autoPlay = false,
  muted = false,
  loop = false,
}: BlogVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = "metadata";
    }
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-lg ${className}`}
      role="figure"
      aria-label={title}
    >
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#1e3a5f] dark:border-[#7a9bcb] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Загрузка видео...
            </div>
          </div>
        </div>
      )}

      {isError ? (
        <div className="w-full aspect-video flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <div className="text-center p-6">
            <span className="text-5xl block mb-3">🚗</span>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Видео временно недоступно
            </p>
            {poster && (
              <div className="relative w-full max-w-md mx-auto mt-4 aspect-video rounded-xl overflow-hidden">
                <Image
                  src={poster}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative w-full aspect-video group">
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            poster={poster}
            preload="metadata"
            playsInline
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            onLoadedData={handleLoadedData}
            onError={handleError}
            aria-label={title}
          >
            <source src={src} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>

          <button
            onClick={handlePlay}
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-300 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
            aria-label={
              isPlaying ? "Поставить на паузу" : "Воспроизвести видео"
            }
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 hover:shadow-[#1e3a5f]/30">
              {isPlaying ? (
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-gray-800 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </div>
          </button>

          <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-3 inline-block border border-white/10">
              <p className="text-white text-sm font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                {title}
              </p>
              {description && (
                <p className="text-white/70 text-xs mt-0.5">{description}</p>
              )}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            HD
          </div>
        </div>
      )}
    </div>
  );
}
