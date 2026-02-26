import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import PWAPrompt from "@/components/PWAPrompt";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "Ремонт систем охлаждения и автокондиционеров в Полоцке | Nexton",
    template: "%s | Nexton Полоцк",
  },
  description:
    "Профессиональный ремонт систем охлаждения, автокондиционеров, радиаторов в Полоцке. Заправка кондиционеров, ремонт Webasto, аргонная сварка. Работаем с 2010 года. Звоните: +375297115091",
  keywords: [
    "ремонт систем охлаждения Полоцк",
    "ремонт автокондиционеров Полоцк",
    "заправка кондиционера Полоцк",
    "ремонт радиаторов Полоцк",
    "Webasto Полоцк",
    "аргонная сварка Полоцк",
    "ремонт отопителей Полоцк",
    "Nexton Полоцк",
  ],
  metadataBase: new URL("https://nexton.vip"),
  openGraph: {
    title: "Ремонт систем охлаждения и автокондиционеров в Полоцке",
    description:
      "Профессиональный ремонт систем охлаждения, автокондиционеров, радиаторов.",
    url: "https://nexton.vip",
    siteName: "Nexton Полоцк",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "ru_RU",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nexton",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Базовые мета-теги */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* PWA - самое важное! */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Nexton" />
        <meta name="theme-color" content="#1e3a5f" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Для iOS иконки */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/icon-180x180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/icon-167x167.png"
        />

        {/* Для поисковиков - чтобы видели PWA */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="application-name" content="Nexton" />

        {/* Дополнительные фавиконы (для обратной совместимости) */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              name: "Nexton",
              url: "https://nexton.vip",
              telephone: "+375297115091",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Строительная 21в/3, блок 9, бокс 3",
                addressLocality: "Полоцк",
                addressCountry: "BY",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen bg-white dark:bg-black pt-20">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <PWAPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}
