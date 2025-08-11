import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "مجوزیار — انتخاب‌گر مجوزهای آزاد/باز",
  description: "به انتخاب بهترین مجوز برای نرم‌افزار، محتوا، داده یا قلم کمک می‌کنیم",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' fontSize='90'>⚖️</text></svg>"
        />
      </head>
      <body className="font-vazir">{children}</body>
    </html>
  )
}
