import type React from "react"
import type { Metadata, Viewport } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
})

export const metadata: Metadata = {
  title: "پروانه‌یار — انتخاب‌گر پروانه‌های آزاد/باز",
  description:
    "به انتخاب بهترین پروانه برای نرم‌افزار، محتوا، داده یا قلم کمک می‌کنیم. ابزار جامع انتخاب پروانه‌های FOSS، Creative Commons و Open Data",
  generator: "v0.dev",
  applicationName: "انتخاب‌گر پروانه آزاد",
  referrer: "origin-when-cross-origin",
  keywords: [
    "پروانه آزاد",
    "FOSS",
    "Creative Commons",
    "Open Source License",
    "GPL",
    "MIT",
    "Apache",
    "CC",
    "Open Data",
  ],
  authors: [{ name: "v0.dev" }],
  creator: "v0.dev",
  publisher: "v0.dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://license-chooser.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    title: "پروانه‌یار — انتخاب‌گر پروانه‌های آزاد/باز",
    description: "به انتخاب بهترین پروانه برای نرم‌افزار، محتوا، داده یا قلم کمک می‌کنیم",
    siteName: "پروانه‌یار",
  },
  twitter: {
    card: "summary_large_image",
    title: "پروانه‌یار — انتخاب‌گر پروانه‌های آزاد/باز",
    description: "به انتخاب بهترین پروانه برای نرم‌افزار، محتوا، داده یا قلم کمک می‌کنیم",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#10b981" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' fontSize='90'>⚖️</text></svg>"
        />
        <link rel="apple-touch-icon" href="/placeholder.svg?height=180&width=180" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="پروانه‌یار" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${vazirmatn.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg z-50"
          >
            پرش به محتوای اصلی
          </a>
          <div id="main-content">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
