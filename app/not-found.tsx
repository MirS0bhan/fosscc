"use client"

import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl font-bold text-muted-foreground">۴۰۴</div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">صفحه یافت نشد</h1>
          <p className="text-muted-foreground">متأسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد یا منتقل شده است.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            بازگشت به خانه
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <Search className="h-4 w-4" />
            بازگشت به صفحه قبل
          </button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>برای انتخاب پروانه مناسب پروژه خود به صفحه اصلی بازگردید.</p>
        </div>
      </div>
    </div>
  )
}
