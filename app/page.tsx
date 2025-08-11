"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { AlertCircle, CheckCircle, Copy, Download, Share2, RotateCcw } from "lucide-react"

// License data structure
interface License {
  id: string
  name: string
  spdxId: string
  category: "software" | "content" | "data" | "font"
  tags: string[]
  officialUrl: string
  summaryFa: string
  templatePlaceholders: string[]
  template: string
  permissive?: boolean
  copyleft?: "none" | "weak" | "strong" | "network"
  commercial?: boolean
  derivatives?: boolean
  shareAlike?: boolean
  attribution?: boolean
  patentGrant?: boolean
  gplCompatible?: boolean
}

// License database
const licenses: License[] = [
  // Software licenses
  {
    id: "mit",
    name: "MIT License",
    spdxId: "MIT",
    category: "software",
    tags: ["سهیل‌گیر", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://opensource.org/licenses/MIT",
    summaryFa: "پروانه بسیار سهیل و سهیل‌گیر که تنها الزام نسبت‌دهی دارد",
    templatePlaceholders: ["year", "author"],
    template: `MIT License

Copyright (c) {{year}} {{author}}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: true,
    patentGrant: false,
    gplCompatible: true,
  },
  {
    id: "apache-2.0",
    name: "Apache License 2.0",
    spdxId: "Apache-2.0",
    category: "software",
    tags: ["سهیل‌گیر", "Patent Grant", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://www.apache.org/licenses/LICENSE-2.0",
    summaryFa: "پروانه سهیل‌گیر با حمایت از حق اختراع و الزامات بیشتر",
    templatePlaceholders: ["year", "author"],
    template: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Copyright {{year}} {{author}}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: true,
    patentGrant: true,
    gplCompatible: true,
  },
  {
    id: "gpl-3.0",
    name: "GNU General Public License v3.0",
    spdxId: "GPL-3.0-or-later",
    category: "software",
    tags: ["کپی‌لفت قوی", "اجازهٔ تجاری", "آثار مشتق مجاز", "انتشار مشابه"],
    officialUrl: "https://www.gnu.org/licenses/gpl-3.0.html",
    summaryFa: "پروانه کپی‌لفت قوی که الزام انتشار کد مشتقات دارد",
    templatePlaceholders: ["year", "author", "project"],
    template: `{{project}}
Copyright (C) {{year}} {{author}}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`,
    permissive: false,
    copyleft: "strong",
    commercial: true,
    derivatives: true,
    shareAlike: true,
    attribution: true,
    patentGrant: true,
    gplCompatible: true,
  },
  {
    id: "agpl-3.0",
    name: "GNU Affero General Public License v3.0",
    spdxId: "AGPL-3.0-or-later",
    category: "software",
    tags: ["کپی‌لفت شبکه", "اجازهٔ تجاری", "آثار مشتق مجاز", "انتشار مشابه"],
    officialUrl: "https://www.gnu.org/licenses/agpl-3.0.html",
    summaryFa: "پروانه کپی‌لفت که استفاده شبکه‌ای را نیز شامل می‌شود",
    templatePlaceholders: ["year", "author", "project"],
    template: `{{project}}
Copyright (C) {{year}} {{author}}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`,
    permissive: false,
    copyleft: "network",
    commercial: true,
    derivatives: true,
    shareAlike: true,
    attribution: true,
    patentGrant: true,
    gplCompatible: true,
  },
  // Creative Commons licenses
  {
    id: "cc0",
    name: "CC0 1.0 Universal",
    spdxId: "CC0-1.0",
    category: "content",
    tags: ["Public Domain", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    summaryFa: "انتشار در مالکیت عمومی بدون هیچ محدودیتی",
    templatePlaceholders: ["author", "project"],
    template: `CC0 1.0 Universal

{{author}} has dedicated the work "{{project}}" to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.

You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: false,
    patentGrant: false,
    gplCompatible: true,
  },
  {
    id: "cc-by-4.0",
    name: "Creative Commons Attribution 4.0",
    spdxId: "CC-BY-4.0",
    category: "content",
    tags: ["الزام نسبت‌دهی", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://creativecommons.org/licenses/by/4.0/",
    summaryFa: "اجازه استفاده آزاد با الزام نسبت‌دهی",
    templatePlaceholders: ["author", "project"],
    template: `"{{project}}" by {{author}} is licensed under CC BY 4.0

This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: true,
    patentGrant: false,
    gplCompatible: false,
  },
  {
    id: "cc-by-sa-4.0",
    name: "Creative Commons Attribution-ShareAlike 4.0",
    spdxId: "CC-BY-SA-4.0",
    category: "content",
    tags: ["الزام نسبت‌دهی", "انتشار مشابه", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    summaryFa: "اجازه استفاده آزاد با الزام نسبت‌دهی و انتشار مشابه",
    templatePlaceholders: ["author", "project"],
    template: `"{{project}}" by {{author}} is licensed under CC BY-SA 4.0

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.`,
    permissive: false,
    copyleft: "strong",
    commercial: true,
    derivatives: true,
    shareAlike: true,
    attribution: true,
    patentGrant: false,
    gplCompatible: false,
  },
  // Data licenses
  {
    id: "pddl",
    name: "Public Domain Dedication and License",
    spdxId: "PDDL-1.0",
    category: "data",
    tags: ["Public Domain", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://opendatacommons.org/licenses/pddl/",
    summaryFa: "انتشار داده‌ها در مالکیت عمومی",
    templatePlaceholders: ["author", "project"],
    template: `This {{project}} made available by {{author}} is licensed under the Public Domain Dedication and License v1.0 whose full text can be found at: http://www.opendatacommons.org/licenses/pddl/1.0/`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: false,
    patentGrant: false,
    gplCompatible: true,
  },
  {
    id: "odbl",
    name: "Open Database License",
    spdxId: "ODbL-1.0",
    category: "data",
    tags: ["الزام نسبت‌دهی", "انتشار مشابه", "اجازهٔ تجاری"],
    officialUrl: "https://opendatacommons.org/licenses/odbl/",
    summaryFa: "پروانه کپی‌لفت برای پایگاه‌های داده",
    templatePlaceholders: ["author", "project"],
    template: `This {{project}} made available by {{author}} is licensed under the Open Database License: http://opendatacommons.org/licenses/odbl/1.0/. Any rights in individual contents of the database are licensed under the Database Contents License: http://opendatacommons.org/licenses/dbcl/1.0/`,
    permissive: false,
    copyleft: "strong",
    commercial: true,
    derivatives: true,
    shareAlike: true,
    attribution: true,
    patentGrant: false,
    gplCompatible: false,
  },
  // Font license
  {
    id: "ofl",
    name: "SIL Open Font License 1.1",
    spdxId: "OFL-1.1",
    category: "font",
    tags: ["الزام نسبت‌دهی", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://scripts.sil.org/OFL",
    summaryFa: "پروانه استاندارد برای قلم‌های آزاد",
    templatePlaceholders: ["author", "project"],
    template: `Copyright (c) {{author}}, with Reserved Font Name {{project}}.

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL`,
    permissive: true,
    copyleft: "weak",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: true,
    patentGrant: false,
    gplCompatible: true,
  },
]

interface FormData {
  workType: "software" | "content" | "data" | "font" | ""
  commercialUse: boolean | null
  derivatives: boolean | null
  shareAlike: boolean | null
  attribution: boolean | null
  freedomLevel: "permissive" | "weak-copyleft" | "strong-copyleft" | "public-domain" | ""
  patentGrant: boolean | null
  gplCompatible: "essential" | "important" | "unimportant" | ""
  networkCopyleft: boolean | null
  dbAttribution: boolean | null
  dbShareAlike: boolean | null
  contentType: "text" | "image" | "audio" | "video" | "mixed" | ""
  allowDerivatives: boolean | null
  dataType: "research" | "government" | "scientific" | "cultural" | "other" | ""
  opennessLevel: "public-domain" | "attribution" | "share-alike" | ""
  fontType: "display" | "text" | "web" | "print" | ""
  allowEmbedding: boolean | null
}

interface CopyrightData {
  title: string
  author: string
  year: string
  organization: string
  website: string
  email: string
  version: string
  jurisdiction: string
  attributionText: string
}

interface UserFeedback {
  type: "success" | "error" | "info"
  message: string
  visible: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function LicenseChooser() {
  const [formData, setFormData] = useState<FormData>({
    workType: "",
    commercialUse: null,
    derivatives: null,
    shareAlike: null,
    attribution: null,
    freedomLevel: "",
    patentGrant: null,
    gplCompatible: "",
    networkCopyleft: null,
    dbAttribution: null,
    dbShareAlike: null,
    contentType: "",
    allowDerivatives: null,
    dataType: "",
    opennessLevel: "",
    fontType: "",
    allowEmbedding: null,
  })

  const [copyrightData, setCopyrightData] = useState<CopyrightData>({
    title: "",
    author: "",
    year: new Date().getFullYear().toString(),
    organization: "",
    website: "",
    email: "",
    version: "",
    jurisdiction: "",
    attributionText: "",
  })

  const [selectedLicense, setSelectedLicense] = useState<License | null>(null)

  const [feedback, setFeedback] = useState<UserFeedback>({
    type: "info",
    message: "",
    visible: false,
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = useCallback((): FormErrors => {
    const errors: FormErrors = {}

    if (!formData.workType) {
      errors.workType = "لطفاً نوع اثر خود را انتخاب کنید"
    }

    if (!copyrightData.author.trim()) {
      errors.author = "نام نویسنده الزامی است"
    }

    if (!copyrightData.year.trim() || !/^\d{4}$/.test(copyrightData.year)) {
      errors.year = "سال باید چهار رقم باشد"
    }

    return errors
  }, [formData.workType, copyrightData.author, copyrightData.year])

  const showFeedback = useCallback((type: UserFeedback["type"], message: string) => {
    setFeedback({ type, message, visible: true })
    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, visible: false }))
    }, 5000)
  }, [])

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("license-chooser-state")
    if (saved) {
      try {
        const { formData: savedForm, copyrightData: savedCopyright } = JSON.parse(saved)
        setFormData(savedForm)
        setCopyrightData(savedCopyright)
      } catch (e) {
        console.error("Failed to load saved state:", e)
      }
    }

    // Load from URL params
    const params = new URLSearchParams(window.location.search)
    if (params.has("workType")) {
      setFormData((prev) => ({
        ...prev,
        workType: (params.get("workType") as any) || "",
      }))
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(
      "license-chooser-state",
      JSON.stringify({
        formData,
        copyrightData,
      }),
    )
  }, [formData, copyrightData])

  // Calculate recommended licenses
  const recommendedLicenses = useMemo(() => {
    if (!formData.workType) return []

    const filtered = licenses.filter((license) => license.category === formData.workType)

    return filtered
      .map((license) => {
        let score = 0
        const reasons: string[] = []

        // Commercial use
        if (formData.commercialUse === true && license.commercial) {
          score += 10
          reasons.push("اجازه استفاده تجاری")
        } else if (formData.commercialUse === false && !license.commercial) {
          score += 10
          reasons.push("منع استفاده تجاری")
        }

        // Derivatives
        if (formData.derivatives === true && license.derivatives) {
          score += 10
          reasons.push("اجازه آثار مشتق")
        } else if (formData.derivatives === false && !license.derivatives) {
          score += 10
          reasons.push("منع آثار مشتق")
        }

        // ShareAlike
        if (formData.shareAlike === true && license.shareAlike) {
          score += 8
          reasons.push("الزام انتشار مشابه")
        } else if (formData.shareAlike === false && !license.shareAlike) {
          score += 8
          reasons.push("بدون الزام انتشار مشابه")
        }

        // Attribution
        if (formData.attribution === true && license.attribution) {
          score += 5
          reasons.push("الزام نسبت‌دهی")
        } else if (formData.attribution === false && !license.attribution) {
          score += 5
          reasons.push("بدون الزام نسبت‌دهی")
        }

        // Freedom level for software
        if (formData.workType === "software") {
          if (formData.freedomLevel === "permissive" && license.permissive) {
            score += 15
            reasons.push("پروانه سهیل‌گیر")
          } else if (formData.freedomLevel === "strong-copyleft" && license.copyleft === "strong") {
            score += 15
            reasons.push("کپی‌لفت قوی")
          } else if (formData.freedomLevel === "weak-copyleft" && license.copyleft === "weak") {
            score += 15
            reasons.push("کپی‌لفت ضعیف")
          } else if (formData.freedomLevel === "public-domain" && license.copyleft === "none" && !license.attribution) {
            score += 15
            reasons.push("مالکیت عمومی")
          }

          // Patent grant
          if (formData.patentGrant === true && license.patentGrant) {
            score += 12
            reasons.push("حمایت از حق اختراع")
          }

          // GPL compatibility
          if (formData.gplCompatible === "essential" && license.gplCompatible) {
            score += 10
            reasons.push("سازگار با GPL")
          }

          // Network copyleft
          if (formData.networkCopyleft === true && license.copyleft === "network") {
            score += 12
            reasons.push("کپی‌لفت شبکه")
          }
        }

        return {
          license,
          score,
          reasons,
        }
      })
      .sort((a, b) => b.score - a.score)
  }, [formData])

  const generateLicenseText = (license: License) => {
    let text = license.template

    // Replace placeholders
    license.templatePlaceholders.forEach((placeholder) => {
      const value = copyrightData[placeholder as keyof CopyrightData] || `{{${placeholder}}}`
      text = text.replace(new RegExp(`{{${placeholder}}}`, "g"), value)
    })

    return text
  }

  const generateReadmeSnippet = (license: License) => {
    return `## پروانه

این پروژه تحت پروانه ${license.name} منتشر شده است. برای جزئیات بیشتر فایل [LICENSE](LICENSE) را مطالعه کنید.

### نحوه استفاده

${license.attribution ? `هنگام استفاده از این ${formData.workType === "software" ? "نرم‌افزار" : formData.workType === "content" ? "محتوا" : formData.workType === "data" ? "داده" : "قلم"}، لطفاً به نویسنده نسبت دهید:` : ""}

${
  license.attribution
    ? `\`\`\`
${copyrightData.attributionText || `${copyrightData.title} توسط ${copyrightData.author} تحت پروانه ${license.name}`}
\`\`\``
    : ""
}

${license.shareAlike ? "اگر این اثر را تغییر دادید، باید آن را تحت همین پروانه منتشر کنید." : ""}

برای اطلاعات بیشتر: ${license.officialUrl}
`
  }

  const copyToClipboard = async (text: string) => {
    try {
      setIsLoading(true)
      await navigator.clipboard.writeText(text)
      showFeedback("success", "متن با موفقیت کپی شد")
    } catch (err) {
      console.error("Failed to copy:", err)
      showFeedback("error", "خطا در کپی کردن متن")
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        showFeedback("success", "متن کپی شد")
      } catch (fallbackErr) {
        showFeedback("error", "امکان کپی کردن وجود ندارد")
      }
      document.body.removeChild(textArea)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadFile = (content: string, filename: string) => {
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      showFeedback("error", "لطفاً ابتدا اطلاعات مورد نیاز را تکمیل کنید")
      return
    }

    try {
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.setAttribute("aria-label", `دانلود فایل ${filename}`)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      showFeedback("success", "فایل با موفقیت دانلود شد")
    } catch (err) {
      console.error("Download failed:", err)
      showFeedback("error", "خطا در دانلود فایل")
    }
  }

  const generateShareableUrl = () => {
    const params = new URLSearchParams()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        params.set(key, value.toString())
      }
    })
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`
  }

  const resetForm = () => {
    setFormData({
      workType: "",
      commercialUse: null,
      derivatives: null,
      shareAlike: null,
      attribution: null,
      freedomLevel: "",
      patentGrant: null,
      gplCompatible: "",
      networkCopyleft: null,
      dbAttribution: null,
      dbShareAlike: null,
      contentType: "",
      allowDerivatives: null,
      dataType: "",
      opennessLevel: "",
      fontType: "",
      allowEmbedding: null,
    })
    setCopyrightData({
      title: "",
      author: "",
      year: new Date().getFullYear().toString(),
      organization: "",
      website: "",
      email: "",
      version: "",
      jurisdiction: "",
      attributionText: "",
    })
    setSelectedLicense(null)
    localStorage.removeItem("license-chooser-state")
  }

  const generateLicenseFile = (license: License) => {
    const licenseText = generateLicenseText(license)
    downloadFile(licenseText, "LICENSE")
  }

  const shareConfiguration = () => {
    const shareableUrl = generateShareableUrl()
    navigator.share({
      title: "License Chooser Configuration",
      text: "Here is the configuration for your license:",
      url: shareableUrl,
    })
  }

  const shareNative = (shareableUrl: string) => {
    navigator.share({
      title: "License Chooser Configuration",
      text: "Here is the configuration for your license:",
      url: shareableUrl,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "انتخاب‌گر پروانه آزاد",
            description: "ابزار انتخاب بهترین پروانه آزاد برای پروژه‌های نرم‌افزاری، محتوای خلاقانه، داده و فونت",
            url: typeof window !== "undefined" ? window.location.href : "",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web Browser",
            inLanguage: "fa",
          }),
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {feedback.visible && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
              feedback.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : feedback.type === "error"
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
            }`}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              {feedback.type === "success" && <CheckCircle className="w-5 h-5" />}
              {feedback.type === "error" && <AlertCircle className="w-5 h-5" />}
              <span>{feedback.message}</span>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl text-emerald-800 mb-4 font-sans font-black">گزینش‌گر پروانه آزاد</h1>
          <p className="text-emerald-600 text-lg max-w-3xl mx-auto">
            بهترین پروانه برای پروژه خود را با پاسخ به چند پرسش ساده انتخاب کنید
          </p>
        </header>

        {/* Main Layout - Equal Height Columns */}
        <main className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
          {/* Questions Column */}
          <section className="lg:w-1/3 flex flex-col" aria-label="سوالات انتخاب پروانه">
            <div className="bg-white rounded-xl shadow-lg p-6 flex-1 overflow-y-auto">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">سوالات</h2>

              {/* Work Type Selection */}
              <fieldset className="mb-6">
                <legend className="block text-sm font-medium text-emerald-700 mb-3">نوع اثر شما چیست؟</legend>
                {formErrors.workType && (
                  <div className="text-red-600 text-sm mb-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.workType}
                  </div>
                )}
                <div className="space-y-2" role="radiogroup" aria-required="true">
                  {[
                    { value: "software", label: "نرم‌افزار" },
                    { value: "content", label: "محتوای خلاقانه" },
                    { value: "data", label: "داده و پایگاه داده" },
                    { value: "font", label: "فونت" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer hover:bg-emerald-50 p-2 rounded"
                    >
                      <input
                        type="radio"
                        name="workType"
                        value={option.value}
                        checked={formData.workType === option.value}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, workType: e.target.value as any }))
                          setFormErrors((prev) => ({ ...prev, workType: "" }))
                        }}
                        className="ml-2 text-emerald-600 focus:ring-emerald-500"
                        aria-describedby={formErrors.workType ? "workType-error" : undefined}
                      />
                      <span className="text-emerald-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Conditional Questions Based on Work Type */}
              {formData.workType && (
                <div className="space-y-6">
                  {/* Commercial Use */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-3">
                      آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: true, label: "بله، استفاده تجاری مجاز است" },
                        { value: false, label: "خیر، فقط استفاده غیرتجاری" },
                      ].map((option) => (
                        <label key={option.value.toString()} className="flex items-center">
                          <input
                            type="radio"
                            name="commercialUse"
                            checked={formData.commercialUse === option.value}
                            onChange={() => setFormData((prev) => ({ ...prev, commercialUse: option.value }))}
                            className="ml-2 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-emerald-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Derivatives */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-3">
                      آیا می‌خواهید دیگران بتوانند اثر شما را تغییر دهند؟
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: true, label: "بله، تغییر و بهبود مجاز است" },
                        { value: false, label: "خیر، فقط استفاده بدون تغییر" },
                      ].map((option) => (
                        <label key={option.value.toString()} className="flex items-center">
                          <input
                            type="radio"
                            name="derivatives"
                            checked={formData.derivatives === option.value}
                            onChange={() => setFormData((prev) => ({ ...prev, derivatives: option.value }))}
                            className="ml-2 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-emerald-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* ShareAlike - only if derivatives allowed */}
                  {formData.derivatives === true && (
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-3">
                        آیا می‌خواهید آثار مشتق نیز با همین پروانه منتشر شوند؟
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: true, label: "بله، باید با همین پروانه باشد" },
                          { value: false, label: "خیر، می‌تواند پروانه دیگری داشته باشد" },
                        ].map((option) => (
                          <label key={option.value.toString()} className="flex items-center">
                            <input
                              type="radio"
                              name="shareAlike"
                              checked={formData.shareAlike === option.value}
                              onChange={() => setFormData((prev) => ({ ...prev, shareAlike: option.value }))}
                              className="ml-2 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-emerald-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Software-specific questions */}
                  {formData.workType === "software" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-3">
                          چه سطحی از آزادی می‌خواهید؟
                        </label>
                        <div className="space-y-2">
                          {[
                            { value: "permissive", label: "سهیل‌گیر (MIT, BSD)" },
                            { value: "weak-copyleft", label: "کپی‌لفت ضعیف (LGPL)" },
                            { value: "strong-copyleft", label: "کپی‌لفت قوی (GPL)" },
                            { value: "public-domain", label: "مالکیت عمومی" },
                          ].map((option) => (
                            <label key={option.value} className="flex items-center">
                              <input
                                type="radio"
                                name="freedomLevel"
                                value={option.value}
                                checked={formData.freedomLevel === option.value}
                                onChange={(e) => setFormData((prev) => ({ ...prev, freedomLevel: e.target.value }))}
                                className="ml-2 text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="text-emerald-700">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              <button
                onClick={() => {
                  if (window.confirm("آیا مطمئن هستید که می‌خواهید فرم را پاک کنید؟")) {
                    resetForm()
                    showFeedback("info", "فرم پاک شد")
                  }
                }}
                className="mt-6 w-full bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2"
                aria-label="پاک کردن تمام اطلاعات فرم"
              >
                <RotateCcw className="w-4 h-4" />
                پاک کردن فرم
              </button>
            </div>
          </section>

          {/* Copyright Details Column */}
          <section className="lg:w-1/3 flex flex-col" aria-label="جزئیات حق‌تکثیر">
            <div className="bg-white rounded-xl shadow-lg p-6 flex-1 overflow-y-auto">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">جزئیات حق‌تکثیر</h2>

              <form className="space-y-4" noValidate>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-emerald-700 mb-2">
                    عنوان اثر
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={copyrightData.title}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="نام پروژه یا اثر"
                    aria-describedby="title-help"
                  />
                  <div id="title-help" className="text-xs text-emerald-600 mt-1">
                    نام پروژه یا اثر خود را وارد کنید
                  </div>
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-emerald-700 mb-2">
                    نام نویسنده/سازنده <span className="text-red-500">*</span>
                  </label>
                  {formErrors.author && (
                    <div className="text-red-600 text-sm mb-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.author}
                    </div>
                  )}
                  <input
                    id="author"
                    type="text"
                    value={copyrightData.author}
                    onChange={(e) => {
                      setCopyrightData((prev) => ({ ...prev, author: e.target.value }))
                      setFormErrors((prev) => ({ ...prev, author: "" }))
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.author ? "border-red-300" : "border-emerald-300"
                    }`}
                    placeholder="نام شما"
                    required
                    aria-required="true"
                    aria-invalid={!!formErrors.author}
                    aria-describedby={formErrors.author ? "author-error" : "author-help"}
                  />
                  <div id="author-help" className="text-xs text-emerald-600 mt-1">
                    نام شخص یا سازمان صاحب اثر
                  </div>
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-emerald-700 mb-2">
                    سال <span className="text-red-500">*</span>
                  </label>
                  {formErrors.year && (
                    <div className="text-red-600 text-sm mb-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.year}
                    </div>
                  )}
                  <input
                    id="year"
                    type="text"
                    value={copyrightData.year}
                    onChange={(e) => {
                      setCopyrightData((prev) => ({ ...prev, year: e.target.value }))
                      setFormErrors((prev) => ({ ...prev, year: "" }))
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.year ? "border-red-300" : "border-emerald-300"
                    }`}
                    placeholder="1403"
                    required
                    aria-required="true"
                    aria-invalid={!!formErrors.year}
                    pattern="\d{4}"
                    maxLength={4}
                  />
                </div>

                {/* ... existing optional fields ... */}

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">سازمان (اختیاری)</label>
                  <input
                    type="text"
                    value={copyrightData.organization}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="نام شرکت یا سازمان"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">وبگاه (اختیاری)</label>
                  <input
                    type="url"
                    value={copyrightData.website}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, website: e.target.value }))}
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">ایمیل (اختیاری)</label>
                  <input
                    type="email"
                    value={copyrightData.email}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="your@email.com"
                  />
                </div>
              </form>
            </div>
          </section>

          {/* License Recommendations Column */}
          <section className="lg:w-1/3 flex flex-col" aria-label="پیشنهادات پروانه">
            <div className="bg-white rounded-xl shadow-lg p-6 flex-1 overflow-y-auto">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">پیشنهاد پروانه</h2>

              {recommendedLicenses.length === 0 ? (
                <div className="text-center py-8 text-emerald-600">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>لطفاً ابتدا سوالات را پاسخ دهید تا بهترین پروانه برای شما پیشنهاد شود</p>
                </div>
              ) : (
                <div className="space-y-4" role="list">
                  {recommendedLicenses.map((item, index) => (
                    <article
                      key={item.license.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedLicense?.id === item.license.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-emerald-200 hover:border-emerald-300 hover:bg-emerald-25"
                      }`}
                      onClick={() => setSelectedLicense(item.license)}
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setSelectedLicense(item.license)
                        }
                      }}
                      aria-label={`انتخاب پروانه ${item.license.name}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-emerald-800">{item.license.name}</h3>
                        <span className="text-sm bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                          امتیاز: {item.score}
                        </span>
                      </div>
                      <p className="text-emerald-600 text-sm mb-2">{item.license.summaryFa}</p>
                      {item.reasons.length > 0 && (
                        <div className="text-xs text-emerald-500">
                          <strong>دلایل پیشنهاد:</strong> {item.reasons.join("، ")}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}

              {selectedLicense && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => copyToClipboard(generateLicenseText(selectedLicense))}
                    disabled={isLoading}
                    className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    aria-label="کپی متن پروانه"
                  >
                    <Copy className="w-4 h-4" />
                    {isLoading ? "در حال کپی..." : "کپی متن پروانه"}
                  </button>

                  <button
                    onClick={() => downloadFile(generateLicenseText(selectedLicense), "LICENSE")}
                    className="w-full bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2"
                    aria-label="دانلود فایل پروانه"
                  >
                    <Download className="w-4 h-4" />
                    دانلود فایل LICENSE
                  </button>

                  <button
                    onClick={() => {
                      const shareableUrl = generateShareableUrl()
                      if (navigator.share) {
                        shareNative(shareableUrl)
                      } else {
                        copyToClipboard(shareableUrl)
                        showFeedback("success", "لینک اشتراک‌گذاری کپی شد")
                      }
                    }}
                    className="w-full bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2"
                    aria-label="اشتراک‌گذاری تنظیمات"
                  >
                    <Share2 className="w-4 h-4" />
                    اشتراک‌گذاری
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
