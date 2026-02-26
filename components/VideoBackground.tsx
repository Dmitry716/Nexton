"use client";

import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  opacity?: number;
}

export default function VideoBackground({
  videoSrc,
  opacity = 0.35,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
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
