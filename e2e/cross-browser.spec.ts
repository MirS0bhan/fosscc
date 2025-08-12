import { test, expect, devices } from "@playwright/test"

const browsers = ["chromium", "firefox", "webkit"]

browsers.forEach((browserName) => {
  test.describe(`Cross-browser tests - ${browserName}`, () => {
    test(`should work correctly in ${browserName}`, async ({ page }) => {
      await page.goto("/")

      // Basic functionality test
      await expect(page.getByRole("heading", { name: /سوالات/i })).toBeVisible()

      // Form interaction test
      await page.getByLabel(/نرم‌افزار/i).click()
      await expect(page.getByLabel(/نرم‌افزار/i)).toBeChecked()

      // Conditional content test
      await expect(page.getByText(/آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟/i)).toBeVisible()

      // Form filling test
      await page.getByLabel(/عنوان پروژه/i).fill("تست مرورگر")
      await expect(page.getByLabel(/عنوان پروژه/i)).toHaveValue("تست مرورگر")
    })

    test(`should handle Persian text correctly in ${browserName}`, async ({ page }) => {
      await page.goto("/")

      // Check Persian text rendering
      const persianText = page.getByText(/نوع اثر شما چیست؟/i)
      await expect(persianText).toBeVisible()

      // Check RTL layout
      const htmlElement = page.locator("html")
      await expect(htmlElement).toHaveAttribute("dir", "rtl")
    })

    test(`should support keyboard navigation in ${browserName}`, async ({ page }) => {
      await page.goto("/")

      // Tab navigation test
      await page.keyboard.press("Tab")
      const focusedElement = page.locator(":focus")
      await expect(focusedElement).toBeVisible()

      // Arrow key navigation in radio group
      await page.keyboard.press("ArrowDown")
      const nextFocusedElement = page.locator(":focus")
      await expect(nextFocusedElement).toBeVisible()
    })
  })
})

// Mobile device tests
const mobileDevices = [devices["iPhone 12"], devices["Pixel 5"], devices["iPad"]]

mobileDevices.forEach((device) => {
  test.describe(`Mobile device tests - ${device.name}`, () => {
    test.use({ ...device })

    test(`should work on ${device.name}`, async ({ page }) => {
      await page.goto("/")

      // Check mobile layout
      await expect(page.getByRole("heading", { name: /سوالات/i })).toBeVisible()

      // Test touch interactions
      await page.getByLabel(/نرم‌افزار/i).tap()
      await expect(page.getByLabel(/نرم‌افزار/i)).toBeChecked()

      // Test form filling on mobile
      await page.getByLabel(/عنوان پروژه/i).tap()
      await page.getByLabel(/عنوان پروژه/i).fill("پروژه موبایل")
      await expect(page.getByLabel(/عنوان پروژه/i)).toHaveValue("پروژه موبایل")
    })
  })
})
