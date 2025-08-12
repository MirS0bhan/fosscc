"use client"

import { useEffect } from "react"
import ErrorBoundary from "./ErrorBoundary"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html lang="fa" dir="rtl">
      <body>
        <ErrorBoundary>
          <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full text-center space-y-6">
              <h1 className="text-2xl font-bold text-foreground">خطای سیستمی</h1>
              <p className="text-muted-foreground">
                متأسفانه خطای غیرمنتظره‌ای رخ داده است. لطفاً صفحه را مجدداً بارگذاری کنید.
              </p>
              <button
                onClick={reset}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
