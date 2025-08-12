import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "jest-axe"
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

describe("QuestionSection", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Rendering", () => {
    it("renders the main heading", () => {
      render(<QuestionSection {...defaultProps} />)
      expect(screen.getByRole("heading", { name: /سوالات/i })).toBeInTheDocument()
    })

    it("renders work type selection fieldset", () => {
      render(<QuestionSection {...defaultProps} />)
      expect(screen.getByRole("group", { name: /نوع اثر شما چیست؟/i })).toBeInTheDocument()
    })

    it("renders all work type options", () => {
      render(<QuestionSection {...defaultProps} />)

      expect(screen.getByLabelText(/نرم‌افزار/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/محتوای خلاقانه/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/داده و پایگاه داده/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/فونت/i)).toBeInTheDocument()
    })

    it("does not render conditional questions initially", () => {
      render(<QuestionSection {...defaultProps} />)

      expect(screen.queryByText(/آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟/i)).not.toBeInTheDocument()
    })
  })

  describe("Work Type Selection", () => {
    it("calls setFormData when work type is selected", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const softwareOption = screen.getByLabelText(/نرم‌افزار/i)
      await user.click(softwareOption)

      expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function))
    })

    it("clears work type error when selection is made", async () => {
      const user = userEvent.setup()
      const propsWithError = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      render(<QuestionSection {...propsWithError} />)

      const softwareOption = screen.getByLabelText(/نرم‌افزار/i)
      await user.click(softwareOption)

      expect(mockSetFormErrors).toHaveBeenCalledWith(expect.any(Function))
    })

    it("shows error message when work type has error", () => {
      const propsWithError = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      render(<QuestionSection {...propsWithError} />)

      expect(screen.getByText(/لطفاً نوع اثر را انتخاب کنید/i)).toBeInTheDocument()
      expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument() // AlertCircle icon
    })
  })

  describe("Conditional Questions", () => {
    it("shows common questions when work type is selected", () => {
      const propsWithWorkType = {
        ...defaultProps,
        formData: { ...mockFormData, workType: "software" as const },
      }

      render(<QuestionSection {...propsWithWorkType} />)

      expect(screen.getByText(/آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟/i)).toBeInTheDocument()
      expect(screen.getByText(/آیا می‌خواهید دیگران بتوانند اثر شما را تغییر دهند؟/i)).toBeInTheDocument()
      expect(screen.getByText(/آیا می‌خواهید دیگران نام شما را ذکر کنند؟/i)).toBeInTheDocument()
    })

    it("shows software-specific questions when software is selected", () => {
      const propsWithSoftware = {
        ...defaultProps,
        formData: { ...mockFormData, workType: "software" as const },
      }

      render(<QuestionSection {...propsWithSoftware} />)

      expect(screen.getByText(/آیا حمایت از حق اختراع برای شما مهم است؟/i)).toBeInTheDocument()
      expect(screen.getByText(/سازگاری با پروانه GPL چقدر مهم است؟/i)).toBeInTheDocument()
    })

    it("shows share-alike question only when derivatives are allowed", () => {
      const propsWithDerivatives = {
        ...defaultProps,
        formData: {
          ...mockFormData,
          workType: "software" as const,
          derivatives: true,
        },
      }

      render(<QuestionSection {...propsWithDerivatives} />)

      expect(screen.getByText(/آیا می‌خواهید نسخه‌های تغییر یافته نیز با همین پروانه منتشر شوند؟/i)).toBeInTheDocument()
    })

    it("hides share-alike question when derivatives are not allowed", () => {
      const propsWithoutDerivatives = {
        ...defaultProps,
        formData: {
          ...mockFormData,
          workType: "software" as const,
          derivatives: false,
        },
      }

      render(<QuestionSection {...propsWithoutDerivatives} />)

      expect(
        screen.queryByText(/آیا می‌خواهید نسخه‌های تغییر یافته نیز با همین پروانه منتشر شوند؟/i),
      ).not.toBeInTheDocument()
    })
  })

  describe("Form Interactions", () => {
    it("updates commercial use preference", async () => {
      const user = userEvent.setup()
      const propsWithWorkType = {
        ...defaultProps,
        formData: { ...mockFormData, workType: "software" as const },
      }

      render(<QuestionSection {...propsWithWorkType} />)

      const commercialYes = screen.getByLabelText(/بله، استفاده تجاری مجاز است/i)
      await user.click(commercialYes)

      expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function))
    })

    it("updates derivatives preference", async () => {
      const user = userEvent.setup()
      const propsWithWorkType = {
        ...defaultProps,
        formData: { ...mockFormData, workType: "content" as const },
      }

      render(<QuestionSection {...propsWithWorkType} />)

      const derivativesYes = screen.getByLabelText(/بله، تغییر و بهبود مجاز است/i)
      await user.click(derivativesYes)

      expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function))
    })

    it("updates attribution preference", async () => {
      const user = userEvent.setup()
      const propsWithWorkType = {
        ...defaultProps,
        formData: { ...mockFormData, workType: "data" as const },
      }

      render(<QuestionSection {...propsWithWorkType} />)

      const attributionYes = screen.getByLabelText(/بله، ذکر نام الزامی است/i)
      await user.click(attributionYes)

      expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function))
    })
  })

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<QuestionSection {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("has proper ARIA labels", () => {
      render(<QuestionSection {...defaultProps} />)

      expect(screen.getByLabelText(/سوالات انتخاب پروانه/i)).toBeInTheDocument()
      expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-required", "true")
    })

    it("associates error messages with form fields", () => {
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

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const firstRadio = screen.getByLabelText(/نرم‌افزار/i)

      // Tab to first radio button
      await user.tab()
      expect(firstRadio).toHaveFocus()

      // Use arrow keys to navigate
      await user.keyboard("{ArrowDown}")
      expect(screen.getByLabelText(/محتوای خلاقانه/i)).toHaveFocus()
    })
  })

  describe("RTL Support", () => {
    it("renders with proper RTL styling classes", () => {
      const { container } = render(<QuestionSection {...defaultProps} />)

      // Check for RTL-specific classes
      expect(container.querySelector(".ml-2")).toBeInTheDocument() // Right margin for RTL
    })
  })

  describe("Error Handling", () => {
    it("displays multiple errors correctly", () => {
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

    it("clears errors when valid selections are made", async () => {
      const user = userEvent.setup()
      const propsWithError = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      render(<QuestionSection {...propsWithError} />)

      const softwareOption = screen.getByLabelText(/نرم‌افزار/i)
      await user.click(softwareOption)

      expect(mockSetFormErrors).toHaveBeenCalledWith(expect.any(Function))
    })
  })
})
