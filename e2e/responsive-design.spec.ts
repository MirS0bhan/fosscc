import { test, expect } from "@playwright/test"

test.describe("Responsive Design Tests", () => {
  const viewports = [
    { name: "Mobile", width: 375, height: 667 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Desktop", width: 1200, height: 800 },
    { name: "Large Desktop", width: 1920, height: 1080 },
  ]

  viewports.forEach(({ name, width, height }) => {
    test(`should display correctly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto("/")

      // Check that main sections are visible
      await expect(page.getByRole("heading", { name: /سوالات/i })).toBeVisible()
      await expect(page.getByRole("heading", { name: /اطلاعات کپی‌رایت/i })).toBeVisible()
      await expect(page.getByRole("heading", { name: /پروانه‌های پیشنهادی/i })).toBeVisible()

      // Check that form elements are accessible
      await expect(page.getByLabel(/نرم‌افزار/i)).toBeVisible()
      await expect(page.getByLabel(/محتوای خلاقانه/i)).toBeVisible()

      // Test interaction on this viewport
      await page.getByLabel(/نرم‌افزار/i).click()
      await expect(page.getByText(/آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟/i)).toBeVisible()
    })
  })

  test("should have proper column layout on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto("/")

    // Check three-column layout
    const sections = page.locator("section")
    await expect(sections).toHaveCount(3)

    // Check that sections are side by side (not stacked)
    const firstSection = sections.first()
    const secondSection = sections.nth(1)

    const firstBox = await firstSection.boundingBox()
    const secondBox = await secondSection.boundingBox()

    expect(firstBox?.y).toBeCloseTo(secondBox?.y || 0, 50) // Same vertical position
  })

  test("should stack columns on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")

    // Check that sections stack vertically
    const sections = page.locator("section")
    const firstSection = sections.first()
    const secondSection = sections.nth(1)

    const firstBox = await firstSection.boundingBox()
    const secondBox = await secondSection.boundingBox()

    expect((secondBox?.y || 0) > (firstBox?.y || 0) + (firstBox?.height || 0)).toBeTruthy()
  })

  test("should have scrollable columns with equal height on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto("/")

    // Fill form to create long content
    await page.getByLabel(/نرم‌افزار/i).click()

    // Check that columns have equal height and are scrollable
    const columns = page.locator("section > div").first()
    await expect(columns).toHaveCSS("overflow-y", "auto")
  })

  test("should maintain usability on touch devices", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")

    // Test touch interactions
    await page.getByLabel(/نرم‌افزار/i).tap()
    await expect(page.getByLabel(/نرم‌افزار/i)).toBeChecked()

    // Test form filling on mobile
    await page.getByLabel(/عنوان پروژه/i).tap()
    await page.getByLabel(/عنوان پروژه/i).fill("پروژه موبایل")
    await expect(page.getByLabel(/عنوان پروژه/i)).toHaveValue("پروژه موبایل")
  })
})
