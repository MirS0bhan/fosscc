import type { License, CopyrightData, FormData } from "@/types/license"

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

export function filterLicenses(licenses: License[], formData: FormData): License[] {
  if (!formData.workType) {
    return []
  }

  return licenses.filter((license) => {
    // Filter by work type
    if (license.category !== formData.workType) {
      return false
    }

    // Filter by commercial use preference
    if (formData.commercialUse !== null && license.commercial !== formData.commercialUse) {
      return false
    }

    // Filter by derivatives preference
    if (formData.derivatives !== null && license.derivatives !== formData.derivatives) {
      return false
    }

    // Filter by share-alike preference
    if (formData.shareAlike !== null && license.shareAlike !== formData.shareAlike) {
      return false
    }

    // Filter by attribution preference
    if (formData.attribution !== null && license.attribution !== formData.attribution) {
      return false
    }

    // Filter by patent grant preference (software only)
    if (
      formData.workType === "software" &&
      formData.patentGrant !== null &&
      license.patentGrant !== formData.patentGrant
    ) {
      return false
    }

    // Filter by GPL compatibility (software only)
    if (formData.workType === "software" && formData.gplCompatible && formData.gplCompatible !== "") {
      if (formData.gplCompatible === "essential" && !license.gplCompatible) {
        return false
      }
    }

    return true
  })
}

export function scoreLicenseCompatibility(license: License, formData: FormData): number {
  let score = 0

  // Base score for matching work type
  if (license.category === formData.workType) {
    score += 10
  }

  // Score for matching preferences
  if (formData.commercialUse !== null && license.commercial === formData.commercialUse) {
    score += 5
  }

  if (formData.derivatives !== null && license.derivatives === formData.derivatives) {
    score += 5
  }

  if (formData.shareAlike !== null && license.shareAlike === formData.shareAlike) {
    score += 3
  }

  if (formData.attribution !== null && license.attribution === formData.attribution) {
    score += 3
  }

  // Software-specific scoring
  if (formData.workType === "software") {
    if (formData.patentGrant !== null && license.patentGrant === formData.patentGrant) {
      score += 4
    }

    if (formData.gplCompatible === "essential" && license.gplCompatible) {
      score += 3
    } else if (formData.gplCompatible === "important" && license.gplCompatible) {
      score += 2
    }
  }

  return score
}

export function validateFormData(formData: FormData): { [key: string]: string } {
  const errors: { [key: string]: string } = {}

  if (!formData.workType) {
    errors.workType = "لطفاً نوع اثر را انتخاب کنید"
  }

  if (formData.workType && formData.commercialUse === null) {
    errors.commercialUse = "لطفاً گزینه‌ای را انتخاب کنید"
  }

  if (formData.workType && formData.derivatives === null) {
    errors.derivatives = "لطفاً گزینه‌ای را انتخاب کنید"
  }

  if (formData.workType && formData.attribution === null) {
    errors.attribution = "لطفاً گزینه‌ای را انتخاب کنید"
  }

  return errors
}

export function validateCopyrightData(copyrightData: CopyrightData): { [key: string]: string } {
  const errors: { [key: string]: string } = {}

  if (!copyrightData.title.trim()) {
    errors.title = "لطفاً عنوان پروژه را وارد کنید"
  }

  if (!copyrightData.author.trim()) {
    errors.author = "لطفاً نام نویسنده را وارد کنید"
  }

  if (!copyrightData.year.trim()) {
    errors.year = "لطفاً سال را وارد کنید"
  } else if (!/^\d{4}$/.test(copyrightData.year)) {
    errors.year = "لطفاً سال را به صورت چهار رقمی وارد کنید"
  }

  return errors
}

export function parseUrlParams(): Partial<FormData> {
  const params = new URLSearchParams(window.location.search)
  const formData: Partial<FormData> = {}

  if (params.has("workType")) {
    formData.workType = params.get("workType") as FormData["workType"]
  }

  if (params.has("commercialUse")) {
    formData.commercialUse = params.get("commercialUse") === "true"
  }

  if (params.has("derivatives")) {
    formData.derivatives = params.get("derivatives") === "true"
  }

  if (params.has("shareAlike")) {
    formData.shareAlike = params.get("shareAlike") === "true"
  }

  if (params.has("attribution")) {
    formData.attribution = params.get("attribution") === "true"
  }

  if (params.has("patentGrant")) {
    formData.patentGrant = params.get("patentGrant") === "true"
  }

  if (params.has("gplCompatible")) {
    formData.gplCompatible = params.get("gplCompatible") as FormData["gplCompatible"]
  }

  return formData
}

export function updateUrlParams(formData: FormData): void {
  const params = new URLSearchParams()

  if (formData.workType) {
    params.set("workType", formData.workType)
  }

  if (formData.commercialUse !== null) {
    params.set("commercialUse", formData.commercialUse.toString())
  }

  if (formData.derivatives !== null) {
    params.set("derivatives", formData.derivatives.toString())
  }

  if (formData.shareAlike !== null) {
    params.set("shareAlike", formData.shareAlike.toString())
  }

  if (formData.attribution !== null) {
    params.set("attribution", formData.attribution.toString())
  }

  if (formData.patentGrant !== null) {
    params.set("patentGrant", formData.patentGrant.toString())
  }

  if (formData.gplCompatible) {
    params.set("gplCompatible", formData.gplCompatible)
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`
  window.history.replaceState({}, "", newUrl)
}
