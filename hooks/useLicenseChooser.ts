"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import type { FormData, CopyrightData, UserFeedback, FormErrors, License } from "@/types/license"
import { licenses } from "@/data/licenses"

export function useLicenseChooser() {
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
      .filter((license) => {
        // Commercial use filter
        if (formData.commercialUse === false && license.commercial !== true) return false
        if (formData.commercialUse === true && license.commercial !== true) return false

        // Derivatives filter
        if (formData.derivatives === false && license.derivatives !== true) return false
        if (formData.derivatives === true && license.derivatives !== true) return false

        // Share-alike filter
        if (formData.shareAlike === true && !license.shareAlike) return false
        if (formData.shareAlike === false && license.shareAlike) return false

        // Attribution filter
        if (formData.attribution === false && license.attribution) return false

        // Patent grant filter
        if (formData.patentGrant === true && !license.patentGrant) return false

        // GPL compatibility filter
        if (formData.gplCompatible === "essential" && !license.gplCompatible) return false

        // Network copyleft filter
        if (formData.networkCopyleft === true && license.copyleft !== "network") return false

        return true
      })
      .sort((a, b) => {
        // Prioritize based on user preferences
        let scoreA = 0
        let scoreB = 0

        // Prefer permissive licenses if user wants commercial use
        if (formData.commercialUse === true) {
          if (a.permissive) scoreA += 2
          if (b.permissive) scoreB += 2
        }

        // Prefer copyleft if user wants share-alike
        if (formData.shareAlike === true) {
          if (a.copyleft !== "none") scoreA += 2
          if (b.copyleft !== "none") scoreB += 2
        }

        return scoreB - scoreA
      })
  }, [formData])

  return {
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
  }
}
