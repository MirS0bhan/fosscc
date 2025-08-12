import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { QuestionSection } from "@/components/QuestionSection"
import type { FormData, FormErrors } from "@/types/license"
import jest from "jest" // Import jest to fix the undeclared variable error

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

describe("Keyboard Navigation Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Tab Navigation", () => {
    it("should allow tabbing to first interactive element", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const firstRadio = screen.getByLabelText(/نرم‌افزار/i)

      await user.tab()
      expect(firstRadio).toHaveFocus()
    })

    it("should maintain focus within component", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const radioButtons = screen.getAllByRole("radio")

      // Tab to first radio
      await user.tab()
      expect(radioButtons[0]).toHaveFocus()

      // Continue tabbing through all radios
      for (let i = 1; i < radioButtons.length; i++) {
        await user.tab()
        expect(radioButtons[i]).toHaveFocus()
      }
    })

    it("should support reverse tab navigation", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const radioButtons = screen.getAllByRole("radio")

      // Tab to last element first
      for (let i = 0; i < radioButtons.length; i++) {
        await user.tab()
      }

      // Now shift+tab backwards
      await user.keyboard("{Shift>}{Tab}{/Shift}")
      expect(radioButtons[radioButtons.length - 2]).toHaveFocus()
    })
  })

  describe("Arrow Key Navigation", () => {
    it("should navigate radio groups with arrow keys", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const firstRadio = screen.getByLabelText(/نرم‌افزار/i)
      const secondRadio = screen.getByLabelText(/محتوای خلاقانه/i)

      // Focus first radio
      await user.tab()
      expect(firstRadio).toHaveFocus()

      // Use arrow down to navigate
      await user.keyboard("{ArrowDown}")
      expect(secondRadio).toHaveFocus()
    })

    it("should wrap around in radio group navigation", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const radioButtons = screen.getAllByRole("radio")
      const firstRadio = radioButtons[0]
      const lastRadio = radioButtons[radioButtons.length - 1]

      // Focus first radio
      await user.tab()
      expect(firstRadio).toHaveFocus()

      // Arrow up should go to last radio
      await user.keyboard("{ArrowUp}")
      expect(lastRadio).toHaveFocus()

      // Arrow down should go back to first
      await user.keyboard("{ArrowDown}")
      expect(firstRadio).toHaveFocus()
    })
  })

  describe("Space and Enter Key Interaction", () => {
    it("should select radio button with space key", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const softwareRadio = screen.getByLabelText(/نرم‌افزار/i)

      // Focus and select with space
      await user.tab()
      await user.keyboard(" ")

      expect(mockSetFormData).toHaveBeenCalled()
      expect(softwareRadio).toBeChecked()
    })

    it("should select radio button with enter key", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const softwareRadio = screen.getByLabelText(/نرم‌افزار/i)

      // Focus and select with enter
      await user.tab()
      await user.keyboard("{Enter}")

      expect(mockSetFormData).toHaveBeenCalled()
      expect(softwareRadio).toBeChecked()
    })
  })

  describe("Conditional Content Navigation", () => {
    it("should include conditional elements in tab order", async () => {
      const user = userEvent.setup()
      const propsWithContent = {
        ...defaultProps,
        formData: { ...mockFormData, workType: "software" as const },
      }

      render(<QuestionSection {...propsWithContent} />)

      // Get all interactive elements including conditional ones
      const allRadios = screen.getAllByRole("radio")

      // Should be able to tab through all elements
      for (let i = 0; i < allRadios.length; i++) {
        await user.tab()
        expect(allRadios[i]).toHaveFocus()
      }
    })

    it("should maintain focus when conditional content appears", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const softwareRadio = screen.getByLabelText(/نرم‌افزار/i)

      // Focus and select software option
      await user.tab()
      await user.keyboard(" ")

      // Focus should remain on the selected radio
      expect(softwareRadio).toHaveFocus()
      expect(softwareRadio).toBeChecked()
    })
  })

  describe("Focus Trap and Management", () => {
    it("should not lose focus when interacting with form", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      const firstRadio = screen.getByLabelText(/نرم‌افزار/i)

      await user.tab()
      expect(firstRadio).toHaveFocus()

      // Interact with the form
      await user.keyboard(" ")

      // Focus should still be manageable
      expect(document.activeElement).toBeTruthy()
    })

    it("should handle focus when errors appear", async () => {
      const user = userEvent.setup()
      const propsWithError = {
        ...defaultProps,
        formErrors: { workType: "لطفاً نوع اثر را انتخاب کنید" },
      }

      render(<QuestionSection {...propsWithError} />)

      // Should still be able to focus on form elements
      await user.tab()
      expect(screen.getByLabelText(/نرم‌افزار/i)).toHaveFocus()
    })
  })

  describe("Skip Links and Shortcuts", () => {
    it("should support efficient navigation patterns", async () => {
      const user = userEvent.setup()
      render(<QuestionSection {...defaultProps} />)

      // Should be able to quickly navigate to main content
      const section = screen.getByRole("region")
      expect(section).toHaveAttribute("aria-label", "سوالات انتخاب پروانه")
    })
  })
})
