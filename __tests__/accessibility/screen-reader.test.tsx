import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { QuestionSection } from "@/components/QuestionSection"
import type { FormData, FormErrors } from "@/types/license"
import jest from "jest" // Import jest to declare the variable

// Mock data
const mockFormData: FormData = {
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
}

const mockFormErrors: FormErrors = {}
const mockSetFormData = jest.fn()
const mockSetFormErrors = jest.fn()

const defaultProps = {
  formData: mockFormData,
  setFormData: mockSetFormData,
  formErrors: mockFormErrors,
  setFormErrors: mockSetFormErrors,
}

describe("Screen Reader Compatibility Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Semantic Structure", () => {
    it("should have proper landmark roles", () => {
      render(<QuestionSection {...defaultProps} />)

      const section = screen.getByRole("region")
      expect(section).toHaveAttribute("aria-label", "سوالات انتخاب پروانه")
    })

    it("should have proper heading structure", () => {
      render(<QuestionSection {...defaultProps} />)

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent("سوالات")
    })

    it("should have proper form structure", () => {
      render(<QuestionSection {...defaultProps} />)

      const fieldset = screen.getByRole("group")
      expect(fieldset).toHaveAccessibleName("نوع اثر شما چیست؟")

      const radioGroup = screen.getByRole("radiogroup")
      expect(radioGroup).toHaveAttribute("aria-required", "true")
    })
  })

  describe("Form Labels and Descriptions", () => {
    it("should have accessible names for all form controls", () => {
      render(<QuestionSection {...defaultProps} />)

      const radioButtons = screen.getAllByRole("radio")
      radioButtons.forEach((radio) => {
        expect(radio).toHaveAccessibleName()
      })
    })

    it("should associate error messages with form controls", () => {
      const propsWithError = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      render(<QuestionSection {...propsWithError} />)

      const radioButtons = screen.getAllByRole("radio")
      radioButtons.forEach((radio) => {
        expect(radio).toHaveAttribute("aria-describedby", expect.stringContaining("workType-error"))
      })
    })

    it("should provide context for conditional questions", () => {
      const propsWithContent = {
        ...defaultProps,
        formData: { ...mockFormData, workType: "software" as const },
      }

      render(<QuestionSection {...propsWithContent} />)

      // Check that conditional questions have proper labels
      expect(screen.getByText(/آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟/i)).toBeInTheDocument()
    })
  })

  describe("State Announcements", () => {
    it("should announce form validation errors", () => {
      const propsWithError = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      render(<QuestionSection {...propsWithError} />)

      const errorMessage = screen.getByText(/لطفاً نوع اثر را انتخاب کنید/i)
      expect(errorMessage).toBeInTheDocument()

      // Error should be properly associated
      const radioButtons = screen.getAllByRole("radio")
      expect(radioButtons[0]).toHaveAttribute("aria-describedby", expect.stringContaining("workType-error"))
    })

    it("should announce selection changes", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const softwareRadio = screen.getByLabelText(/نرم‌افزار/i)

      await user.click(softwareRadio)

      expect(softwareRadio).toBeChecked()
      expect(softwareRadio).toHaveAttribute("aria-checked", "true")
    })
  })

  describe("Dynamic Content", () => {
    it("should handle dynamic content appearance", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const softwareRadio = screen.getByLabelText(/نرم‌افزار/i)

      // Select software to show conditional content
      await user.click(softwareRadio)

      // Conditional content should be accessible
      expect(screen.getByText(/آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟/i)).toBeInTheDocument()
    })

    it("should handle nested conditional content", async () => {
      const user = userEvent.setup()
      const propsWithDerivatives = {
        ...defaultProps,
        formData: {
          ...mockFormData,
          workType: "software" as const,
          derivatives: true,
        },
      }

      render(<QuestionSection {...propsWithDerivatives} />)

      // Share-alike question should be visible and accessible
      expect(screen.getByText(/آیا می‌خواهید نسخه‌های تغییر یافته نیز با همین پروانه منتشر شوند؟/i)).toBeInTheDocument()
    })
  })

  describe("Persian Language Support", () => {
    it("should properly handle RTL text direction", () => {
      render(<QuestionSection {...defaultProps} />)

      // Persian text should be present and properly formatted
      expect(screen.getByText(/نوع اثر شما چیست؟/i)).toBeInTheDocument()
      expect(screen.getByText(/نرم‌افزار/i)).toBeInTheDocument()
      expect(screen.getByText(/محتوای خلاقانه/i)).toBeInTheDocument()
    })

    it("should have proper language context", () => {
      const { container } = render(<QuestionSection {...defaultProps} />)

      // Check for RTL-appropriate styling
      const labels = container.querySelectorAll("label")
      labels.forEach((label) => {
        expect(label).toHaveClass("flex")
      })
    })
  })

  describe("Error Handling for Screen Readers", () => {
    it("should provide clear error context", () => {
      const propsWithError = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      render(<QuestionSection {...propsWithError} />)

      // Error should be clearly associated and announced
      const errorElement = screen.getByText(/لطفاً نوع اثر را انتخاب کنید/i)
      expect(errorElement).toBeInTheDocument()

      // Should have proper ARIA attributes
      const radioButtons = screen.getAllByRole("radio")
      radioButtons.forEach((radio) => {
        expect(radio).toHaveAttribute("aria-describedby")
      })
    })

    it("should handle multiple errors gracefully", () => {
      const propsWithMultipleErrors = {
        ...defaultProps,
        formErrors: {
          workType: "لطفاً نوع اثر را انتخاب کنید",
          commercialUse: "لطفاً گزینه‌ای را انتخاب کنید",
        },
      }

      render(<QuestionSection {...propsWithMultipleErrors} />)

      expect(screen.getByText(/لطفاً نوع اثر را انتخاب کنید/i)).toBeInTheDocument()
    })
  })
})
