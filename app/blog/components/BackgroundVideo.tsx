"use client";

import { useState, useRef } from "react";

interface BackgroundVideoProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundVideo({
  src,
  className = "",
  children,
}: BackgroundVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Видео фон */}
      {!isError ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/20 to-[#2b4c7c]/20 dark:from-[#7a9bcb]/10 dark:to-[#5a7bb0]/10" />
      )}

      {/* Затемнение */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/50"
        aria-hidden="true"
      />

      {/* Контент поверх */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
