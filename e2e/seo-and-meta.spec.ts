import { test, expect } from "@playwright/test"

test.describe("SEO and Meta Tags", () => {
  test("should have proper meta tags", async ({ page }) => {
    await page.goto("/")

    // Check title
    await expect(page).toHaveTitle(/انتخابگر پروانه متن‌باز فارسی/)

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute("content", expect.stringContaining("پروانه"))

    // Check language attribute
    const htmlElement = page.locator("html")
    await expect(htmlElement).toHaveAttribute("lang", "fa")
    await expect(htmlElement).toHaveAttribute("dir", "rtl")

    // Check charset
    const charset = page.locator("meta[charset]")
    await expect(charset).toHaveAttribute("charset", "utf-8")

    // Check viewport
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute("content", expect.stringContaining("width=device-width"))
  })

  test("should have proper Open Graph tags", async ({ page }) => {
    await page.goto("/")

    // Check OG title
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute("content", expect.stringContaining("انتخابگر پروانه"))

    // Check OG description
    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute("content", expect.stringContaining("پروانه"))

    // Check OG type
    const ogType = page.locator('meta[property="og:type"]')
    await expect(ogType).toHaveAttribute("content", "website")

    // Check OG locale
    const ogLocale = page.locator('meta[property="og:locale"]')
    await expect(ogLocale).toHaveAttribute("content", "fa_IR")
  })

  test("should have proper Twitter Card tags", async ({ page }) => {
    await page.goto("/")

    // Check Twitter card type
    const twitterCard = page.locator('meta[name="twitter:card"]')
    await expect(twitterCard).toHaveAttribute("content", "summary_large_image")

    // Check Twitter title
    const twitterTitle = page.locator('meta[name="twitter:title"]')
    await expect(twitterTitle).toHaveAttribute("content", expect.stringContaining("انتخابگر پروانه"))
  })

  test("should have structured data", async ({ page }) => {
    await page.goto("/")

    // Check for JSON-LD structured data
    const structuredData = page.locator('script[type="application/ld+json"]')
    await expect(structuredData).toBeAttached()

    const jsonContent = await structuredData.textContent()
    const parsedData = JSON.parse(jsonContent || "{}")

    expect(parsedData["@type"]).toBe("WebApplication")
    expect(parsedData.name).toContain("انتخابگر پروانه")
    expect(parsedData.inLanguage).toBe("fa")
  })

  test("should have proper canonical URL", async ({ page }) => {
    await page.goto("/")

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute("href", expect.stringContaining("http"))
  })

  test("should have PWA manifest", async ({ page }) => {
    await page.goto("/")

    const manifest = page.locator('link[rel="manifest"]')
    await expect(manifest).toHaveAttribute("href", "/manifest.json")

    // Check manifest content
    const manifestResponse = await page.request.get("/manifest.json")
    expect(manifestResponse.ok()).toBeTruthy()

    const manifestData = await manifestResponse.json()
    expect(manifestData.name).toContain("انتخابگر پروانه")
    expect(manifestData.lang).toBe("fa")
    expect(manifestData.dir).toBe("rtl")
  })

  test("should have proper favicon and icons", async ({ page }) => {
    await page.goto("/")

    // Check favicon
    const favicon = page.locator('link[rel="icon"]')
    await expect(favicon).toBeAttached()

    // Check apple touch icon
    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]')
    await expect(appleTouchIcon).toBeAttached()
  })
})
