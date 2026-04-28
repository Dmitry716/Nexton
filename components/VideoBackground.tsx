"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc?: string;
  opacity?: number;
}

export default function VideoBackground({
  videoSrc,
  posterSrc,
  opacity = 0.35,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (videoRef.current && !useFallback) {
      videoRef.current.playbackRate = 0.7;
    }
  }, [useFallback]);

  const handleError = () => setUseFallback(true);

  if (useFallback && posterSrc) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={posterSrc}
          alt=""
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover scale-105"
          style={{
            opacity,
            filter: "contrast(1.1) brightness(1.1)",
          }}
        />
      </div>
    );
  }

  if (useFallback && !posterSrc) {
    return (
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-950 dark:to-black"
        style={{ opacity }}
      />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterSrc}
        onError={handleError}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover scale-105"
        style={{
          opacity,
          filter: "contrast(1.1) brightness(1.1)",
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
