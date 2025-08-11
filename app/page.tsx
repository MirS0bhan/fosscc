"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Download, Copy, Share2, RotateCcw, ExternalLink, FileText, Code, Database, Type } from "lucide-react"

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
    tags: ["سهل‌گیر", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://opensource.org/licenses/MIT",
    summaryFa: "مجوز بسیار ساده و سهل‌گیر که تنها الزام نسبت‌دهی دارد",
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
    tags: ["سهل‌گیر", "Patent Grant", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://www.apache.org/licenses/LICENSE-2.0",
    summaryFa: "مجوز سهل‌گیر با حمایت از حق اختراع و الزامات بیشتر",
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
    summaryFa: "مجوز کپی‌لفت قوی که الزام انتشار کد مشتقات دارد",
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
    summaryFa: "مجوز کپی‌لفت که استفاده شبکه‌ای را نیز شامل می‌شود",
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
    summaryFa: "مجوز کپی‌لفت برای پایگاه‌های داده",
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
    summaryFa: "مجوز استاندارد برای قلم‌های آزاد",
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
  commercial: boolean | null
  derivatives: boolean | null
  shareAlike: boolean | null
  attribution: boolean | null
  freedomLevel: "permissive" | "weak-copyleft" | "strong-copyleft" | "public-domain" | ""
  patentGrant: boolean | null
  gplCompatible: "essential" | "important" | "unimportant" | ""
  networkCopyleft: boolean | null
  dbAttribution: boolean | null
  dbShareAlike: boolean | null
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

export default function LicenseChooser() {
  const [formData, setFormData] = useState<FormData>({
    workType: "",
    commercial: null,
    derivatives: null,
    shareAlike: null,
    attribution: null,
    freedomLevel: "",
    patentGrant: null,
    gplCompatible: "",
    networkCopyleft: null,
    dbAttribution: null,
    dbShareAlike: null,
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
        if (formData.commercial === true && license.commercial) {
          score += 10
          reasons.push("اجازه استفاده تجاری")
        } else if (formData.commercial === false && !license.commercial) {
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
            reasons.push("مجوز سهل‌گیر")
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
    return `## مجوز

این پروژه تحت مجوز ${license.name} منتشر شده است. برای جزئیات بیشتر فایل [LICENSE](LICENSE) را مطالعه کنید.

### نحوه استفاده

${license.attribution ? `هنگام استفاده از این ${formData.workType === "software" ? "نرم‌افزار" : formData.workType === "content" ? "محتوا" : formData.workType === "data" ? "داده" : "قلم"}، لطفاً به نویسنده نسبت دهید:` : ""}

${
  license.attribution
    ? `\`\`\`
${copyrightData.attributionText || `${copyrightData.title} توسط ${copyrightData.author} تحت مجوز ${license.name}`}
\`\`\``
    : ""
}

${license.shareAlike ? "اگر این اثر را تغییر دادید، باید آن را تحت همین مجوز منتشر کنید." : ""}

برای اطلاعات بیشتر: ${license.officialUrl}
`
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
      commercial: null,
      derivatives: null,
      shareAlike: null,
      attribution: null,
      freedomLevel: "",
      patentGrant: null,
      gplCompatible: "",
      networkCopyleft: null,
      dbAttribution: null,
      dbShareAlike: null,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مجوزیار</h1>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 dark:text-gray-300">
                به انتخاب بهترین مجوز برای نرم‌افزار، محتوا، داده یا قلم کمک می‌کنیم
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Questions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  پرسش‌ها
                </CardTitle>
                <CardDescription>با پاسخ به این سوالات، مناسب‌ترین مجوز را پیدا کنید</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Work Type */}
                <div className="space-y-3">
                  <Label>نوع اثر</Label>
                  <RadioGroup
                    value={formData.workType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, workType: value as any }))}
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="software" id="software" />
                      <Label htmlFor="software" className="flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        نرم‌افزار
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="content" id="content" />
                      <Label htmlFor="content" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        محتوا/رسانه
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="data" id="data" />
                      <Label htmlFor="data" className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        داده/پایگاه داده
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="font" id="font" />
                      <Label htmlFor="font" className="flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        قلم/فونت
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.workType && (
                  <>
                    {/* Commercial Use */}
                    <div className="space-y-3">
                      <Label>استفادهٔ تجاری مجاز است؟</Label>
                      <RadioGroup
                        value={formData.commercial?.toString() || ""}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            commercial: value === "" ? null : value === "true",
                          }))
                        }
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="true" id="commercial-yes" />
                          <Label htmlFor="commercial-yes">بلی</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="false" id="commercial-no" />
                          <Label htmlFor="commercial-no">خیر</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Derivatives */}
                    <div className="space-y-3">
                      <Label>اجازهٔ آثار مشتق؟</Label>
                      <RadioGroup
                        value={formData.derivatives?.toString() || ""}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            derivatives: value === "" ? null : value === "true",
                          }))
                        }
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="true" id="derivatives-yes" />
                          <Label htmlFor="derivatives-yes">بلی</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="false" id="derivatives-no" />
                          <Label htmlFor="derivatives-no">خیر</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* ShareAlike - only if derivatives allowed */}
                    {formData.derivatives === true && (
                      <div className="space-y-3">
                        <Label>الزام انتشار مشابه (ShareAlike)؟</Label>
                        <RadioGroup
                          value={formData.shareAlike?.toString() || ""}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              shareAlike: value === "" ? null : value === "true",
                            }))
                          }
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="true" id="sharealike-yes" />
                            <Label htmlFor="sharealike-yes">بلی</Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="false" id="sharealike-no" />
                            <Label htmlFor="sharealike-no">خیر</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {/* Attribution */}
                    {formData.workType !== "font" && (
                      <div className="space-y-3">
                        <Label>الزام نسبت‌دهی؟</Label>
                        <RadioGroup
                          value={formData.attribution?.toString() || ""}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              attribution: value === "" ? null : value === "true",
                            }))
                          }
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="true" id="attribution-yes" />
                            <Label htmlFor="attribution-yes">بلی</Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="false" id="attribution-no" />
                            <Label htmlFor="attribution-no">خیر</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {/* Software-specific questions */}
                    {formData.workType === "software" && (
                      <>
                        <div className="space-y-3">
                          <Label>سطح آزادی</Label>
                          <Select
                            value={formData.freedomLevel}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, freedomLevel: value as any }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="permissive">سهل‌گیر (Permissive)</SelectItem>
                              <SelectItem value="weak-copyleft">کپی‌لفت ضعیف</SelectItem>
                              <SelectItem value="strong-copyleft">کپی‌لفت قوی</SelectItem>
                              <SelectItem value="public-domain">مالکیت عمومی</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label>نیاز به اعطای حق اختراع (Patent Grant)؟</Label>
                          <RadioGroup
                            value={formData.patentGrant?.toString() || ""}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                patentGrant: value === "" ? null : value === "true",
                              }))
                            }
                          >
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <RadioGroupItem value="true" id="patent-yes" />
                              <Label htmlFor="patent-yes">بلی</Label>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <RadioGroupItem value="false" id="patent-no" />
                              <Label htmlFor="patent-no">خیر</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-3">
                          <Label>سازگاری با GPL مهم است؟</Label>
                          <Select
                            value={formData.gplCompatible}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, gplCompatible: value as any }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="essential">ضروری</SelectItem>
                              <SelectItem value="important">مهم</SelectItem>
                              <SelectItem value="unimportant">بی‌اهمیت</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label>انتشار تغییرات روی سرور/شبکه (SaaS) هم مشمول باشد؟</Label>
                          <RadioGroup
                            value={formData.networkCopyleft?.toString() || ""}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                networkCopyleft: value === "" ? null : value === "true",
                              }))
                            }
                          >
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <RadioGroupItem value="true" id="network-yes" />
                              <Label htmlFor="network-yes">بلی</Label>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <RadioGroupItem value="false" id="network-no" />
                              <Label htmlFor="network-no">خیر</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="flex gap-2">
                  <Button onClick={resetForm} variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 ml-2" />
                    بازنشانی
                  </Button>
                  <Button onClick={() => copyToClipboard(generateShareableUrl())} variant="outline" size="sm">
                    <Share2 className="w-4 h-4 ml-2" />
                    اشتراک پیوند
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Column 2: Copyright Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>جزئیات حق‌نشر</CardTitle>
                <CardDescription>اطلاعات مورد نیاز برای تولید متن مجوز</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان اثر *</Label>
                  <Input
                    id="title"
                    value={copyrightData.title}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="نام پروژه یا اثر"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">نام پدیدآور/دارندهٔ حق *</Label>
                  <Input
                    id="author"
                    value={copyrightData.author}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, author: e.target.value }))}
                    placeholder="نام شما یا سازمان"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">سال</Label>
                  <Input
                    id="year"
                    value={copyrightData.year}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, year: e.target.value }))}
                    placeholder="2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">نام سازمان/گروه</Label>
                  <Input
                    id="organization"
                    value={copyrightData.organization}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, organization: e.target.value }))}
                    placeholder="اختیاری"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">پیوند مخزن/وب‌سایت</Label>
                  <Input
                    id="website"
                    value={copyrightData.website}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, website: e.target.value }))}
                    placeholder="https://github.com/user/project"
                    className="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل تماس</Label>
                  <Input
                    id="email"
                    type="email"
                    value={copyrightData.email}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="ltr"
                  />
                </div>

                {formData.workType === "content" && (
                  <div className="space-y-2">
                    <Label htmlFor="attribution">متن پیشنهادی نسبت‌دهی</Label>
                    <Textarea
                      id="attribution"
                      value={copyrightData.attributionText}
                      onChange={(e) => setCopyrightData((prev) => ({ ...prev, attributionText: e.target.value }))}
                      placeholder="اثر از [نام] تحت [مجوز] با پیوند ..."
                      rows={3}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Column 3: Recommendations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>پیشنهاد مجوزها</CardTitle>
                <CardDescription>مجوزهای پیشنهادی بر اساس پاسخ‌های شما</CardDescription>
              </CardHeader>
              <CardContent>
                {!formData.workType ? (
                  <p className="text-gray-500 text-center py-8">ابتدا نوع اثر خود را انتخاب کنید</p>
                ) : recommendedLicenses.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    مجوز مناسبی یافت نشد. لطفاً پاسخ‌های خود را بررسی کنید.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {recommendedLicenses.slice(0, 5).map(({ license, score, reasons }, index) => (
                      <Card
                        key={license.id}
                        className={`cursor-pointer transition-all ${
                          selectedLicense?.id === license.id
                            ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => setSelectedLicense(license)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{license.name}</CardTitle>
                              <p className="text-sm text-gray-500 ltr">{license.spdxId}</p>
                            </div>
                            {index === 0 && <Badge variant="default">بهترین انتخاب</Badge>}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {license.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{license.summaryFa}</p>

                          {reasons.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">چرا این مجوز:</p>
                              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                {reasons.map((reason, i) => (
                                  <li key={i} className="flex items-center gap-1">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    {reason}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-xs">
                            <a
                              href={license.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                              مستندات رسمی
                            </a>
                          </div>

                          {selectedLicense?.id === license.id && (
                            <div className="mt-4 pt-4 border-t space-y-3">
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    downloadFile(generateLicenseText(license), "LICENSE")
                                  }}
                                  disabled={!copyrightData.title || !copyrightData.author}
                                >
                                  <Download className="w-4 h-4 ml-1" />
                                  دانلود LICENSE
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    copyToClipboard(generateLicenseText(license))
                                  }}
                                  disabled={!copyrightData.title || !copyrightData.author}
                                >
                                  <Copy className="w-4 h-4 ml-1" />
                                  کپی متن
                                </Button>
                              </div>

                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full bg-transparent"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  downloadFile(generateReadmeSnippet(license), "README-license.md")
                                }}
                                disabled={!copyrightData.title || !copyrightData.author}
                              >
                                دانلود نمونه README
                              </Button>

                              {(!copyrightData.title || !copyrightData.author) && (
                                <p className="text-xs text-amber-600 dark:text-amber-400">
                                  برای تولید فایل‌ها، عنوان اثر و نام پدیدآور را وارد کنید
                                </p>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">⚠️ این توصیه حقوقی نیست.</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              این ابزار تنها راهنمایی کلی ارائه می‌دهد. برای موارد پیچیده با متخصص حقوقی مشورت کنید.
            </p>
            <div className="flex justify-center items-center gap-4 text-xs text-gray-400">
              <span>نسخه 1.0</span>
              <Separator orientation="vertical" className="h-4" />
              <a
                href="https://choosealicense.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
              >
                Choose a License
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a
                href="https://creativecommons.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
              >
                Creative Commons
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
