"use client"

import { AlertCircle } from "lucide-react"
import type { FormData, FormErrors } from "@/types/license"

interface QuestionSectionProps {
  formData: FormData
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void
  formErrors: FormErrors
  setFormErrors: (errors: FormErrors | ((prev: FormErrors) => FormErrors)) => void
}

export function QuestionSection({ formData, setFormData, formErrors, setFormErrors }: QuestionSectionProps) {
  return (
    <section className="lg:w-1/3 flex flex-col" aria-label="سوالات انتخاب پروانه">
      <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 flex-1 overflow-y-auto border dark:border-slate-600">
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-6">سوالات</h2>

        {/* Work Type Selection */}
        <fieldset className="mb-6">
          <legend className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
            نوع اثر شما چیست؟
          </legend>
          {formErrors.workType && (
            <div className="text-red-600 dark:text-red-400 text-sm mb-2 flex items-center gap-1">
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
                className="flex items-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-600 p-2 rounded"
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
                  className="ml-2 text-emerald-600 focus:ring-emerald-500 dark:text-emerald-400 dark:focus:ring-emerald-400"
                  aria-describedby={formErrors.workType ? "workType-error" : undefined}
                />
                <span className="text-emerald-700 dark:text-emerald-300">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Conditional Questions Based on Work Type */}
        {formData.workType && (
          <div className="space-y-6">
            {/* Commercial Use */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
                آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟
              </label>
              <div className="space-y-2">
                {[
                  { value: true, label: "بله، استفاده تجاری مجاز است" },
                  { value: false, label: "خیر، فقط استفاده غیرتجاری" },
                ].map((option) => (
                  <label
                    key={String(option.value)}
                    className="flex items-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-600 p-2 rounded"
                  >
                    <input
                      type="radio"
                      name="commercialUse"
                      checked={formData.commercialUse === option.value}
                      onChange={() => setFormData((prev) => ({ ...prev, commercialUse: option.value }))}
                      className="ml-2 text-emerald-600 focus:ring-emerald-500 dark:text-emerald-400 dark:focus:ring-emerald-400"
                    />
                    <span className="text-emerald-700 dark:text-emerald-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Derivatives */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
                آیا می‌خواهید دیگران بتوانند اثر شما را تغییر دهند؟
              </label>
              <div className="space-y-2">
                {[
                  { value: true, label: "بله، تغییر و بهبود مجاز است" },
                  { value: false, label: "خیر، فقط استفاده بدون تغییر" },
                ].map((option) => (
                  <label
                    key={String(option.value)}
                    className="flex items-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-600 p-2 rounded"
                  >
                    <input
                      type="radio"
                      name="derivatives"
                      checked={formData.derivatives === option.value}
                      onChange={() => setFormData((prev) => ({ ...prev, derivatives: option.value }))}
                      className="ml-2 text-emerald-600 focus:ring-emerald-500 dark:text-emerald-400 dark:focus:ring-emerald-400"
                    />
                    <span className="text-emerald-700 dark:text-emerald-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Share Alike - only if derivatives allowed */}
            {formData.derivatives === true && (
              <div>
                <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
                  آیا می‌خواهید نسخه‌های تغییر یافته نیز با همین پروانه منتشر شوند؟
                </label>
                <div className="space-y-2">
                  {[
                    { value: true, label: "بله، باید با همین پروانه منتشر شوند" },
                    { value: false, label: "خیر، می‌توانند پروانه دیگری داشته باشند" },
                  ].map((option) => (
                    <label
                      key={String(option.value)}
                      className="flex items-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-600 p-2 rounded"
                    >
                      <input
                        type="radio"
                        name="shareAlike"
                        checked={formData.shareAlike === option.value}
                        onChange={() => setFormData((prev) => ({ ...prev, shareAlike: option.value }))}
                        className="ml-2 text-emerald-600 focus:ring-emerald-500 dark:text-emerald-400 dark:focus:ring-emerald-400"
                      />
                      <span className="text-emerald-700 dark:text-emerald-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Attribution */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
                آیا می‌خواهید دیگران نام شما را ذکر کنند؟
              </label>
              <div className="space-y-2">
                {[
                  { value: true, label: "بله، ذکر نام الزامی است" },
                  { value: false, label: "خیر، نیازی به ذکر نام نیست" },
                ].map((option) => (
                  <label
                    key={String(option.value)}
                    className="flex items-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-600 p-2 rounded"
                  >
                    <input
                      type="radio"
                      name="attribution"
                      checked={formData.attribution === option.value}
                      onChange={() => setFormData((prev) => ({ ...prev, attribution: option.value }))}
                      className="ml-2 text-emerald-600 focus:ring-emerald-500 dark:text-emerald-400 dark:focus:ring-emerald-400"
                    />
                    <span className="text-emerald-700 dark:text-emerald-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Software-specific questions */}
            {formData.workType === "software" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
                    آیا حمایت از حق اختراع برای شما مهم است؟
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: true, label: "بله، حمایت از حق اختراع مهم است" },
                      { value: false, label: "خیر، اهمیتی ندارد" },
                    ].map((option) => (
                      <label
                        key={String(option.value)}
                        className="flex items-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-600 p-2 rounded"
                      >
                        <input
                          type="radio"
                          name="patentGrant"
                          checked={formData.patentGrant === option.value}
                          onChange={() => setFormData((prev) => ({ ...prev, patentGrant: option.value }))}
                          className="ml-2 text-emerald-600 focus:ring-emerald-500 dark:text-emerald-400 dark:focus:ring-emerald-400"
                        />
                        <span className="text-emerald-700 dark:text-emerald-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
                    سازگاری با پروانه GPL چقدر مهم است؟
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "essential", label: "ضروری است" },
                      { value: "important", label: "مهم است" },
                      { value: "unimportant", label: "اهمیتی ندارد" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-600 p-2 rounded"
                      >
                        <input
                          type="radio"
                          name="gplCompatible"
                          checked={formData.gplCompatible === option.value}
                          onChange={() => setFormData((prev) => ({ ...prev, gplCompatible: option.value as any }))}
                          className="ml-2 text-emerald-600 focus:ring-emerald-500 dark:text-emerald-400 dark:focus:ring-emerald-400"
                        />
                        <span className="text-emerald-700 dark:text-emerald-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
