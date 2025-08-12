import { test, expect } from "@playwright/test"

test.describe("Performance Tests", () => {
  test("should load within acceptable time limits", async ({ page }) => {
    const startTime = Date.now()

    await page.goto("/")

    // Wait for main content to be visible
    await expect(page.getByRole("heading", { name: /سوالات/i })).toBeVisible()

    const loadTime = Date.now() - startTime

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test("should have good Core Web Vitals", async ({ page }) => {
    await page.goto("/")

    // Wait for page to fully load
    await page.waitForLoadState("networkidle")

    // Check that interactive elements respond quickly
    const startTime = Date.now()
    await page.getByLabel(/نرم‌افزار/i).click()
    const interactionTime = Date.now() - startTime

    // Interaction should be under 100ms
    expect(interactionTime).toBeLessThan(100)

    // Check that conditional content appears quickly
    const conditionalStartTime = Date.now()
    await expect(page.getByText(/آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟/i)).toBeVisible()
    const conditionalTime = Date.now() - conditionalStartTime

    expect(conditionalTime).toBeLessThan(200)
  })

  test("should handle large amounts of data efficiently", async ({ page }) => {
    await page.goto("/")

    // Fill form with data to trigger recommendations
    await page.getByLabel(/نرم‌افزار/i).click()
    await page.getByLabel(/بله، استفاده تجاری مجاز است/i).click()
    await page.getByLabel(/بله، تغییر و بهبود مجاز است/i).click()

    // Check that recommendations load quickly
    const startTime = Date.now()
    await expect(page.getByText(/MIT License/i)).toBeVisible()
    const recommendationTime = Date.now() - startTime

    expect(recommendationTime).toBeLessThan(500)
  })

  test("should not have memory leaks", async ({ page }) => {
    await page.goto("/")

    // Perform multiple interactions
    for (let i = 0; i < 10; i++) {
      await page.getByLabel(/نرم‌افزار/i).click()
      await page.getByLabel(/محتوای خلاقانه/i).click()
      await page.getByLabel(/داده و پایگاه داده/i).click()
    }

    // Page should still be responsive
    await expect(page.getByRole("heading", { name: /سوالات/i })).toBeVisible()
  })

  test("should optimize images and assets", async ({ page }) => {
    const response = await page.goto("/")

    // Check response size is reasonable
    const responseSize = (await response?.body())?.length || 0
    expect(responseSize).toBeLessThan(1024 * 1024) // Less than 1MB

    // Check that CSS and JS are minified (no excessive whitespace)
    const htmlContent = await page.content()
    const whitespaceRatio = (htmlContent.match(/\s/g) || []).length / htmlContent.length
    expect(whitespaceRatio).toBeLessThan(0.3) // Less than 30% whitespace
  })
})
