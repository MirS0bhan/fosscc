"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Page error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">خطا در بارگذاری صفحه</h1>
          <p className="text-muted-foreground">متأسفانه نمی‌توانیم این صفحه را بارگذاری کنیم. لطفاً دوباره تلاش کنید.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            تلاش مجدد
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <Home className="h-4 w-4" />
            بازگشت به خانه
          </button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-left">
            <summary className="cursor-pointer text-sm font-medium text-destructive mb-2">
              جزئیات خطا (حالت توسعه)
            </summary>
            <pre className="text-xs font-mono text-destructive whitespace-pre-wrap">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
