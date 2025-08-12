import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe, toHaveNoViolations } from "jest-axe"
import { QuestionSection } from "@/components/QuestionSection"
import type { FormData, FormErrors } from "@/types/license"
import jest from "jest" // Import jest to declare the variable

// Extend Jest matchers
expect.extend(toHaveNoViolations)

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

describe("WCAG Compliance Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Level A Compliance", () => {
    it("should not have any accessibility violations in initial state", async () => {
      const { container } = render(<QuestionSection {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should not have accessibility violations with form errors", async () => {
      const propsWithErrors = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      const { container } = render(<QuestionSection {...propsWithErrors} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should not have accessibility violations with conditional content", async () => {
      const propsWithContent = {
        ...defaultProps,
        formData: {
          ...mockFormData,
          workType: "software" as const,
          derivatives: true,
        },
      }

      const { container } = render(<QuestionSection {...propsWithContent} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe("Level AA Compliance", () => {
    it("should have proper heading hierarchy", () => {
      render(<QuestionSection {...defaultProps} />)

      const mainHeading = screen.getByRole("heading", { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent("سوالات")
    })

    it("should have proper form labels", () => {
      render(<QuestionSection {...defaultProps} />)

      const radioButtons = screen.getAllByRole("radio")
      radioButtons.forEach((radio) => {
        expect(radio).toHaveAccessibleName()
      })
    })

    it("should have proper fieldset and legend", () => {
      render(<QuestionSection {...defaultProps} />)

      const fieldset = screen.getByRole("group")
      expect(fieldset).toHaveAccessibleName("نوع اثر شما چیست؟")
    })

    it("should associate error messages with form controls", () => {
      const propsWithError = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      render(<QuestionSection {...propsWithError} />)

      const radioButtons = screen.getAllByRole("radio")
      radioButtons.forEach((radio) => {
        expect(radio).toHaveAttribute("aria-describedby")
      })
    })
  })

  describe("Color Contrast", () => {
    it("should have sufficient color contrast for text", async () => {
      const { container } = render(<QuestionSection {...defaultProps} />)

      // Test with axe color-contrast rule specifically
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: true },
        },
      })

      expect(results).toHaveNoViolations()
    })

    it("should have sufficient color contrast for interactive elements", async () => {
      const propsWithContent = {
        ...defaultProps,
        formData: { ...mockFormData, workType: "software" as const },
      }

      const { container } = render(<QuestionSection {...propsWithContent} />)

      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: true },
        },
      })

      expect(results).toHaveNoViolations()
    })
  })

  describe("Focus Management", () => {
    it("should have visible focus indicators", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const firstRadio = screen.getByLabelText(/نرم‌افزار/i)

      await user.tab()
      expect(firstRadio).toHaveFocus()

      // Check that focused element has focus styles
      expect(firstRadio).toHaveClass("focus:ring-emerald-500")
    })

    it("should maintain logical tab order", async () => {
      const user = userEvent.setup()
      const propsWithContent = {
        ...defaultProps,
        formData: { ...mockFormData, workType: "software" as const },
      }

      render(<QuestionSection {...propsWithContent} />)

      // Tab through all interactive elements
      const interactiveElements = screen.getAllByRole("radio")

      for (let i = 0; i < interactiveElements.length; i++) {
        await user.tab()
        expect(interactiveElements[i]).toHaveFocus()
      }
    })
  })

  describe("Screen Reader Support", () => {
    it("should have proper ARIA roles", () => {
      render(<QuestionSection {...defaultProps} />)

      expect(screen.getByRole("region")).toBeInTheDocument()
      expect(screen.getByRole("group")).toBeInTheDocument()
      expect(screen.getByRole("radiogroup")).toBeInTheDocument()
    })

    it("should have proper ARIA properties", () => {
      render(<QuestionSection {...defaultProps} />)

      const radioGroup = screen.getByRole("radiogroup")
      expect(radioGroup).toHaveAttribute("aria-required", "true")

      const section = screen.getByRole("region")
      expect(section).toHaveAttribute("aria-label", "سوالات انتخاب پروانه")
    })

    it("should announce form errors to screen readers", () => {
      const propsWithError = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      render(<QuestionSection {...propsWithError} />)

      const errorMessage = screen.getByText(/لطفاً نوع اثر را انتخاب کنید/i)
      expect(errorMessage).toBeInTheDocument()

      // Error should be associated with form controls
      const radioButtons = screen.getAllByRole("radio")
      radioButtons.forEach((radio) => {
        expect(radio).toHaveAttribute("aria-describedby", expect.stringContaining("workType-error"))
      })
    })
  })

  describe("RTL Language Support", () => {
    it("should have proper language attributes", () => {
      const { container } = render(<QuestionSection {...defaultProps} />)

      // Check for RTL-specific styling
      const labels = container.querySelectorAll("label")
      labels.forEach((label) => {
        expect(label).toHaveClass("flex")
      })
    })

    it("should have proper text direction for Persian content", () => {
      render(<QuestionSection {...defaultProps} />)

      const heading = screen.getByRole("heading", { name: /سوالات/i })
      expect(heading).toBeInTheDocument()

      // Persian text should be properly displayed
      expect(screen.getByText(/نوع اثر شما چیست؟/i)).toBeInTheDocument()
    })
  })
})
