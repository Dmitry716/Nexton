import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DetailingService } from "@/data/detailing";

type Props = {
  service: DetailingService;
  href: string;
  currency?: string;
  ariaLabel: string;
};

export default function DetailingServiceCard({
  service,
  href,
  currency = "BYN",
  ariaLabel,
}: Props) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden detailing-card hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-[#7a9bcb] focus-visible:ring-offset-2"
      aria-label={ariaLabel}
    >
      <div className="relative aspect-[3/2] bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-black dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#7a9bcb] transition-colors">
          {service.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">
            от {service.priceFrom} {currency}
          </p>
          <ArrowRight
            className="w-4 h-4 text-[#1e3a5f] dark:text-[#7a9bcb] group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
