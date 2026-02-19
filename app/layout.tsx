import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground"; // Добавьте этот импорт
import "./globals.css";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "Ремонт систем охлаждения и автокондиционеров в Полоцке | Nexton",
    template: "%s | Nexton Полоцк"
  },
  description: "Профессиональный ремонт систем охлаждения, автокондиционеров, радиаторов в Полоцке. Заправка кондиционеров, ремонт Webasto, аргонная сварка. Работаем с 2010 года. Звоните: +375297115091",
  keywords: [
    "ремонт систем охлаждения Полоцк",
    "ремонт автокондиционеров Полоцк",
    "заправка кондиционера Полоцк",
    "ремонт радиаторов Полоцк",
    "Webasto Полоцк",
    "аргонная сварка Полоцк",
    "ремонт отопителей Полоцк",
    "Nexton Полоцк",
    "ул. Строительная 21в Полоцк"
  ],
  authors: [{ name: "Nexton" }],
  creator: "Nexton",
  publisher: "Nexton",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nexton.vip'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ремонт систем охлаждения и автокондиционеров в Полоцке",
    description: "Профессиональный ремонт систем охлаждения, автокондиционеров, радиаторов. Заправка кондиционеров, ремонт Webasto, аргонная сварка.",
    url: 'https://nexton.vip',
    siteName: 'Nexton Полоцк',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexton - ремонт систем охлаждения в Полоцке',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexton Полоцк - ремонт систем охлаждения',
    description: 'Профессиональный ремонт систем охлаждения и автокондиционеров в Полоцке',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/apple-icon-180x180.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nexton',
  },
  category: 'Автосервис',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Schema.org разметка для организации с точным адресом */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              "name": "Nexton",
              "description": "Ремонт систем охлаждения и автокондиционеров в Полоцке",
              "url": "https://nexton.vip",
              "telephone": "+375297115091",
              "email": "info@nexton.vip",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Строительная 21в/3, блок 9, бокс 3",
                "addressLocality": "Полоцк",
                "addressRegion": "Витебская область",
                "postalCode": "211400",
                "addressCountry": "BY"
              },
              "openingHours": "Mo-Fr 09:00-19:00, Sa 10:00-16:00",
              "priceRange": "₽₽",
              "sameAs": [
                "https://t.me/+375297115091"
              ],
              "founder": {
                "@type": "Person",
                "name": "Nexton"
              },
              "foundingDate": "2010",
              "hasMap": "https://yandex.by/maps/?text=Полоцк%20ул.%20Строительная%2021в"
            })
          }}
        />
        
        {/* Дополнительные мета-теги */}
        <meta name="geo.region" content="BY-VI" />
        <meta name="geo.placename" content="Полоцк, ул. Строительная 21в/3" />
        <meta name="geo.position" content="55.486;28.785" />
        <meta name="ICBM" content="55.486, 28.785" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="telephone" content="+375297115091" />
        <meta name="whatsapp" content="+375297115091" />
        <meta name="telegram" content="@+375297115091" />
        <meta name="address" content="г. Полоцк, ул. Строительная 21в/3, блок 9, бокс 3" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Фон с анимацией */}
          <ParticleBackground />
        {/* Основной контент */}
          <Navbar />
          <main className="min-h-screen bg-white dark:bg-black pt-20">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}