import Image from "next/image";
import {
  getCategoryImage,
  getCategoryImageThumb,
} from "@/data/categoryImages";
import { getCategoryVideo } from "@/data/categoryMedia";

interface CategoryCoverProps {
  categoryId: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  variant?: "thumb" | "full";
}

export default function CategoryCover({
  categoryId,
  alt,
  className = "relative h-36 w-full overflow-hidden bg-gray-100 dark:bg-gray-900",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  variant = "thumb",
}: CategoryCoverProps) {
  const video = getCategoryVideo(categoryId);
  const img =
    variant === "full"
      ? getCategoryImage(categoryId)
      : getCategoryImageThumb(categoryId);

  if (video) {
    return (
      <div className={className}>
        <video
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    );
  }

  if (!img) return null;

  return (
    <div className={className}>
      <Image
        src={img}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={sizes}
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
