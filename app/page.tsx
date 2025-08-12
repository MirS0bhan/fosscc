"use client"

import { AlertCircle, CheckCircle, Copy, Download, Share2, RotateCcw } from "lucide-react"
import { useLicenseChooser } from "@/hooks/useLicenseChooser"
import { QuestionSection } from "@/components/QuestionSection"
import { generateLicenseText, generateReadmeSnippet, generateShareableUrl, downloadFile } from "@/utils/licenseUtils"

export default function LicenseChooser() {
  const {
    formData,
    setFormData,
    copyrightData,
    setCopyrightData,
    selectedLicense,
    setSelectedLicense,
    feedback,
    formErrors,
    setFormErrors,
    isLoading,
    setIsLoading,
    recommendedLicenses,
    validateForm,
    showFeedback,
  } = useLicenseChooser()

  const copyToClipboard = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showFeedback("success", successMessage)
    } catch (err) {
      showFeedback("error", "خطا در کپی کردن")
    }
  }

  const resetForm = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید فرم را بازنشانی کنید؟")) {
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
      showFeedback("success", "فرم بازنشانی شد")
    }
  }

  const shareConfiguration = () => {
    const shareableUrl = generateShareableUrl()
    if (navigator.share) {
      navigator.share({
        title: "License Chooser Configuration",
        text: "Here is the configuration for your license:",
        url: shareableUrl,
      })
    } else {
      copyToClipboard(shareableUrl, "لینک کپی شد")
    }
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
        <header className="text-center mb-8 relative">
          <a
            href="https://github.com/MirS0bhan/fosscc/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-0 top-0 p-2 text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
            aria-label="مشاهده پروژه در گیت‌هاب"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <h1 className="text-4xl text-emerald-800 mb-4 font-sans font-black">گزینش‌گر پروانه آزاد</h1>
          <p className="text-emerald-600 text-lg max-w-3xl mx-auto">
            بهترین پروانه برای پروژه خود را با پاسخ به چند پرسش ساده انتخاب کنید
          </p>
        </header>

        {/* Main Layout - Equal Height Columns */}
        <main className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
          {/* Questions Column */}
          <QuestionSection
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
          />

          {/* Copyright Details Column */}
          <section className="lg:w-1/3 flex flex-col" aria-label="جزئیات کپی‌رایت">
            <div className="bg-white rounded-xl shadow-lg p-6 flex-1 overflow-y-auto">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">جزئیات کپی‌رایت</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-emerald-700 mb-2">
                    نام پروژه
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={copyrightData.title}
                    onChange={(e) => setCopyrightData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="نام پروژه خود را وارد کنید"
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-emerald-700 mb-2">
                    نام نویسنده *
                  </label>
                  {formErrors.author && (
                    <div className="text-red-600 text-sm mb-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.author}
                    </div>
                  )}
                  <input
                    type="text"
                    id="author"
                    value={copyrightData.author}
                    onChange={(e) => {
                      setCopyrightData((prev) => ({ ...prev, author: e.target.value }))
                      setFormErrors((prev) => ({ ...prev, author: "" }))
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.author ? "border-red-300" : "border-emerald-300"
                    }`}
                    placeholder="نام خود را وارد کنید"
                    required
                    aria-describedby={formErrors.author ? "author-error" : undefined}
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-emerald-700 mb-2">
                    سال *
                  </label>
                  {formErrors.year && (
                    <div className="text-red-600 text-sm mb-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.year}
                    </div>
                  )}
                  <input
                    type="text"
                    id="year"
                    value={copyrightData.year}
                    onChange={(e) => {
                      setCopyrightData((prev) => ({ ...prev, year: e.target.value }))
                      setFormErrors((prev) => ({ ...prev, year: "" }))
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      formErrors.year ? "border-red-300" : "border-emerald-300"
                    }`}
                    placeholder="2024"
                    required
                    aria-describedby={formErrors.year ? "year-error" : undefined}
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  aria-label="بازنشانی فرم"
                >
                  <RotateCcw className="w-4 h-4" />
                  بازنشانی
                </button>
                <button
                  onClick={shareConfiguration}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                  aria-label="اشتراک‌گذاری تنظیمات"
                >
                  <Share2 className="w-4 h-4" />
                  اشتراک
                </button>
              </div>
            </div>
          </section>

          {/* License Recommendations Column */}
          <section className="lg:w-1/3 flex flex-col" aria-label="پیشنهادات پروانه">
            <div className="bg-white rounded-xl shadow-lg p-6 flex-1 overflow-y-auto">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">پیشنهادات پروانه</h2>

              {recommendedLicenses.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <p className="text-emerald-600">لطفاً ابتدا سوالات را پاسخ دهید</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendedLicenses.map((license) => (
                    <div
                      key={license.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedLicense?.id === license.id
                          ? "border-emerald-500 bg-emerald-50 shadow-md"
                          : "border-emerald-200 hover:border-emerald-300 hover:bg-emerald-25"
                      }`}
                      onClick={() => setSelectedLicense(license)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selectedLicense?.id === license.id}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setSelectedLicense(license)
                        }
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-emerald-800">{license.name}</h3>
                        <div className="flex flex-wrap gap-1">
                          {license.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-emerald-600 text-sm mb-3">{license.summaryFa}</p>
                      <a
                        href={license.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-500 hover:text-emerald-700 text-sm underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        مشاهده متن کامل پروانه
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* License Generation */}
              {selectedLicense && (
                <div className="mt-6 pt-6 border-t border-emerald-200">
                  <h3 className="font-bold text-emerald-800 mb-4">تولید فایل پروانه</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        const errors = validateForm()
                        if (Object.keys(errors).length > 0) {
                          setFormErrors(errors)
                          showFeedback("error", "لطفاً ابتدا خطاهای فرم را برطرف کنید")
                          return
                        }
                        const licenseText = generateLicenseText(selectedLicense, copyrightData)
                        copyToClipboard(licenseText, "متن پروانه کپی شد")
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      کپی متن پروانه
                    </button>
                    <button
                      onClick={() => {
                        const errors = validateForm()
                        if (Object.keys(errors).length > 0) {
                          setFormErrors(errors)
                          showFeedback("error", "لطفاً ابتدا خطاهای فرم را برطرف کنید")
                          return
                        }
                        const licenseText = generateLicenseText(selectedLicense, copyrightData)
                        downloadFile(licenseText, "LICENSE", "text/plain")
                        showFeedback("success", "فایل پروانه دانلود شد")
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      دانلود فایل LICENSE
                    </button>
                    <button
                      onClick={() => {
                        const errors = validateForm()
                        if (Object.keys(errors).length > 0) {
                          setFormErrors(errors)
                          showFeedback("error", "لطفاً ابتدا خطاهای فرم را برطرف کنید")
                          return
                        }
                        const readmeSnippet = generateReadmeSnippet(selectedLicense, copyrightData)
                        copyToClipboard(readmeSnippet, "کد README کپی شد")
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      کپی کد README
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer className="mt-8 pt-6 border-t border-emerald-200 text-center">
          <p className="text-sm text-emerald-600">تمام محتوای این وب‌سایت تحت پروانه CC0 (مالکیت عمومی) منتشر شده است</p>
        </footer>
      </div>
    </div>
  )
}
