import type { License, CopyrightData } from "@/types/license"

export function generateLicenseText(license: License, copyrightData: CopyrightData): string {
  let text = license.template

  // Replace placeholders
  license.templatePlaceholders.forEach((placeholder) => {
    const value = copyrightData[placeholder as keyof CopyrightData] || `{{${placeholder}}}`
    text = text.replace(new RegExp(`{{${placeholder}}}`, "g"), value)
  })

  return text
}

export function generateReadmeSnippet(license: License, copyrightData: CopyrightData): string {
  const projectName = copyrightData.title || "پروژه شما"
  const authorName = copyrightData.author || "نام شما"

  return `## پروانه

این پروژه تحت پروانه ${license.name} منتشر شده است.

برای اطلاعات بیشتر، فایل [LICENSE](LICENSE) را مطالعه کنید.

---

© ${copyrightData.year} ${authorName}. تمام حقوق محفوظ است.`
}

export function generateShareableUrl(): string {
  const params = new URLSearchParams()
  const currentParams = new URLSearchParams(window.location.search)

  // Copy existing params
  currentParams.forEach((value, key) => {
    params.set(key, value)
  })

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}

export function downloadFile(content: string, filename: string, mimeType = "text/plain"): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
