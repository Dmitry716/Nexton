import { redirect } from "next/navigation";
import { services } from "@/data/services";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Редирект на Полоцк (город по умолчанию)
  redirect(`/polotsk/usluga/${slug}`);
}
