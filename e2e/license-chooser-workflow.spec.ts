import { test, expect } from "@playwright/test"

test.describe("License Chooser Workflow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("should complete full software license selection workflow", async ({ page }) => {
    // Check initial page load
    await expect(page.getByRole("heading", { name: /سوالات/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: /اطلاعات کپی‌رایت/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: /پروانه‌های پیشنهادی/i })).toBeVisible()

    // Select software work type
    await page.getByLabel(/نرم‌افزار/i).click()

    // Wait for conditional questions to appear
    await expect(page.getByText(/آیا می‌خواهید دیگران بتوانند از اثر شما استفاده تجاری کنند؟/i)).toBeVisible()

    // Answer questions
    await page.getByLabel(/بله، استفاده تجاری مجاز است/i).click()
    await page.getByLabel(/بله، تغییر و بهبود مجاز است/i).click()
    await page.getByLabel(/بله، ذکر نام الزامی است/i).click()
    await page.getByLabel(/بله، حمایت از حق اختراع مهم است/i).click()
    await page.getByLabel(/مهم است/i).click()

    // Fill copyright information
    await page.getByLabel(/عنوان پروژه/i).fill("پروژه تست")
    await page.getByLabel(/نام نویسنده/i).fill("احمد محمدی")
    await page.getByLabel(/سال/i).fill("2024")

    // Check that recommendations appear
    await expect(page.getByText(/Apache License 2.0/i)).toBeVisible()

    // Generate license
    await page
      .getByRole("button", { name: /تولید پروانه/i })
      .first()
      .click()

    // Check success feedback
    await expect(page.getByText(/پروانه با موفقیت تولید شد/i)).toBeVisible()

    // Verify license text contains copyright info
    const licenseText = page.getByText(/Copyright.*احمد محمدی/i)
    await expect(licenseText).toBeVisible()
  })

  test("should handle Creative Commons license selection", async ({ page }) => {
    // Select content work type
    await page.getByLabel(/محتوای خلاقانه/i).click()

    // Answer CC-specific questions
    await page.getByLabel(/خیر، فقط استفاده غیرتجاری/i).click()
    await page.getByLabel(/بله، تغییر و بهبود مجاز است/i).click()
    await page.getByLabel(/بله، باید با همین پروانه منتشر شوند/i).click()
    await page.getByLabel(/بله، ذکر نام الزامی است/i).click()

    // Fill copyright information
    await page.getByLabel(/عنوان اثر/i).fill("اثر هنری تست")
    await page.getByLabel(/نام هنرمند/i).fill("فاطمه احمدی")

    // Check CC license recommendations
    await expect(page.getByText(/CC BY-NC-SA/i)).toBeVisible()

    // Generate license
    await page
      .getByRole("button", { name: /تولید پروانه/i })
      .first()
      .click()

    // Verify CC license content
    await expect(page.getByText(/Creative Commons/i)).toBeVisible()
  })

  test("should validate required fields", async ({ page }) => {
    // Try to generate without selecting work type
    await page
      .getByRole("button", { name: /تولید پروانه/i })
      .first()
      .click()

    // Check validation errors
    await expect(page.getByText(/لطفاً نوع اثر را انتخاب کنید/i)).toBeVisible()

    // Select work type but leave copyright empty
    await page.getByLabel(/نرم‌افزار/i).click()
    await page.getByLabel(/بله، استفاده تجاری مجاز است/i).click()

    // Try to generate with incomplete copyright info
    await page
      .getByRole("button", { name: /تولید پروانه/i })
      .first()
      .click()

    // Check copyright validation
    await expect(page.getByText(/لطفاً عنوان پروژه را وارد کنید/i)).toBeVisible()
  })

  test("should support license download functionality", async ({ page }) => {
    // Complete license selection
    await page.getByLabel(/نرم‌افزار/i).click()
    await page.getByLabel(/بله، استفاده تجاری مجاز است/i).click()
    await page.getByLabel(/بله، تغییر و بهبود مجاز است/i).click()
    await page.getByLabel(/بله، ذکر نام الزامی است/i).click()

    await page.getByLabel(/عنوان پروژه/i).fill("پروژه تست")
    await page.getByLabel(/نام نویسنده/i).fill("احمد محمدی")
    await page.getByLabel(/سال/i).fill("2024")

    // Generate license
    await page
      .getByRole("button", { name: /تولید پروانه/i })
      .first()
      .click()

    // Test download functionality
    const downloadPromise = page.waitForDownload()
    await page.getByRole("button", { name: /دانلود LICENSE/i }).click()
    const download = await downloadPromise

    expect(download.suggestedFilename()).toBe("LICENSE")
  })

  test("should persist form data in localStorage", async ({ page }) => {
    // Fill form data
    await page.getByLabel(/نرم‌افزار/i).click()
    await page.getByLabel(/بله، استفاده تجاری مجاز است/i).click()
    await page.getByLabel(/عنوان پروژه/i).fill("پروژه ماندگار")

    // Reload page
    await page.reload()

    // Check that data persisted
    await expect(page.getByLabel(/نرم‌افزار/i)).toBeChecked()
    await expect(page.getByLabel(/بله، استفاده تجاری مجاز است/i)).toBeChecked()
    await expect(page.getByLabel(/عنوان پروژه/i)).toHaveValue("پروژه ماندگار")
  })

  test("should handle URL sharing", async ({ page }) => {
    // Fill form data
    await page.getByLabel(/نرم‌افزار/i).click()
    await page.getByLabel(/بله، استفاده تجاری مجاز است/i).click()

    // Get shareable URL
    await page.getByRole("button", { name: /اشتراک‌گذاری/i }).click()

    // Check that URL contains form data
    const url = page.url()
    expect(url).toContain("workType=software")
    expect(url).toContain("commercialUse=true")
  })
})
