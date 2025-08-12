import { renderHook, act } from "@testing-library/react"
import { useLicenseChooser } from "@/hooks/useLicenseChooser"

describe("useLicenseChooser", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Clear URL search params
    delete (window as any).location
    ;(window as any).location = { search: "" }
  })

  describe("Initial State", () => {
    it("initializes with empty form data", () => {
      const { result } = renderHook(() => useLicenseChooser())

      expect(result.current.formData.workType).toBe("")
      expect(result.current.formData.commercialUse).toBeNull()
      expect(result.current.formData.derivatives).toBeNull()
    })

    it("initializes with empty copyright data", () => {
      const { result } = renderHook(() => useLicenseChooser())

      expect(result.current.copyrightData.title).toBe("")
      expect(result.current.copyrightData.author).toBe("")
      expect(result.current.copyrightData.year).toBe("")
    })

    it("initializes with no user feedback", () => {
      const { result } = renderHook(() => useLicenseChooser())

      expect(result.current.userFeedback.visible).toBe(false)
      expect(result.current.userFeedback.message).toBe("")
    })
  })

  describe("Form Data Management", () => {
    it("updates form data correctly", () => {
      const { result } = renderHook(() => useLicenseChooser())

      act(() => {
        result.current.setFormData((prev) => ({ ...prev, workType: "software" }))
      })

      expect(result.current.formData.workType).toBe("software")
    })

    it("updates copyright data correctly", () => {
      const { result } = renderHook(() => useLicenseChooser())

      act(() => {
        result.current.setCopyrightData((prev) => ({ ...prev, title: "Test Project" }))
      })

      expect(result.current.copyrightData.title).toBe("Test Project")
    })
  })

  describe("License Recommendations", () => {
    it("returns empty recommendations initially", () => {
      const { result } = renderHook(() => useLicenseChooser())

      expect(result.current.recommendedLicenses).toHaveLength(0)
    })

    it("returns software licenses when software work type is selected", () => {
      const { result } = renderHook(() => useLicenseChooser())

      act(() => {
        result.current.setFormData((prev) => ({
          ...prev,
          workType: "software",
          commercialUse: true,
          derivatives: true,
          attribution: true,
        }))
      })

      expect(result.current.recommendedLicenses.length).toBeGreaterThan(0)
      expect(result.current.recommendedLicenses.every((license) => license.category === "software")).toBe(true)
    })
  })

  describe("Error Handling", () => {
    it("validates required fields", () => {
      const { result } = renderHook(() => useLicenseChooser())

      act(() => {
        result.current.validateForm()
      })

      expect(result.current.formErrors.workType).toBeTruthy()
    })

    it("clears errors when valid data is provided", () => {
      const { result } = renderHook(() => useLicenseChooser())

      // First trigger validation error
      act(() => {
        result.current.validateForm()
      })

      expect(result.current.formErrors.workType).toBeTruthy()

      // Then provide valid data
      act(() => {
        result.current.setFormData((prev) => ({ ...prev, workType: "software" }))
        result.current.setFormErrors((prev) => ({ ...prev, workType: "" }))
      })

      expect(result.current.formErrors.workType).toBe("")
    })
  })

  describe("User Feedback", () => {
    it("shows success feedback", () => {
      const { result } = renderHook(() => useLicenseChooser())

      act(() => {
        result.current.showFeedback("success", "پروانه با موفقیت تولید شد")
      })

      expect(result.current.userFeedback.visible).toBe(true)
      expect(result.current.userFeedback.type).toBe("success")
      expect(result.current.userFeedback.message).toBe("پروانه با موفقیت تولید شد")
    })

    it("hides feedback", () => {
      const { result } = renderHook(() => useLicenseChooser())

      // First show feedback
      act(() => {
        result.current.showFeedback("success", "Test message")
      })

      expect(result.current.userFeedback.visible).toBe(true)

      // Then hide it
      act(() => {
        result.current.hideFeedback()
      })

      expect(result.current.userFeedback.visible).toBe(false)
    })
  })

  describe("Persistence", () => {
    it("saves form data to localStorage", () => {
      const { result } = renderHook(() => useLicenseChooser())

      act(() => {
        result.current.setFormData((prev) => ({ ...prev, workType: "software" }))
      })

      const savedData = localStorage.getItem("licenseChooserFormData")
      expect(savedData).toBeTruthy()

      const parsedData = JSON.parse(savedData!)
      expect(parsedData.workType).toBe("software")
    })

    it("loads form data from localStorage", () => {
      // Pre-populate localStorage
      const testData = { workType: "content", commercialUse: true }
      localStorage.setItem("licenseChooserFormData", JSON.stringify(testData))

      const { result } = renderHook(() => useLicenseChooser())

      expect(result.current.formData.workType).toBe("content")
      expect(result.current.formData.commercialUse).toBe(true)
    })
  })
})
