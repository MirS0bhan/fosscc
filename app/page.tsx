"use client"

import { useState, useEffect, useMemo } from "react"

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
    summaryFa: "مجوز بسیار سهیل و سهیل‌گیر که تنها الزام نسبت‌دهی دارد",
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
    summaryFa: "مجوز سهیل‌گیر با حمایت از حق اختراع و الزامات بیشتر",
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
            reasons.push("مجوز سهیل‌گیر")
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

  return <div>{/* License Chooser UI components go here */}</div>
}
