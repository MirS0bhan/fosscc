import { filterLicenses, generateLicenseText, generateReadmeSnippet } from "@/utils/licenseUtils"
import type { License, FormData, CopyrightData } from "@/types/license"

// Mock license data
const mockLicenses: License[] = [
  {
    id: "mit",
    name: "MIT License",
    spdxId: "MIT",
    category: "software",
    tags: ["permissive"],
    officialUrl: "https://opensource.org/licenses/MIT",
    summaryFa: "پروانه‌ای بسیار آزاد",
    templatePlaceholders: ["[year]", "[fullname]"],
    template: "Copyright (c) [year] [fullname]",
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: true,
    patentGrant: false,
    gplCompatible: true,
  },
  {
    id: "gpl-3.0",
    name: "GNU General Public License v3.0",
    spdxId: "GPL-3.0",
    category: "software",
    tags: ["copyleft"],
    officialUrl: "https://www.gnu.org/licenses/gpl-3.0.html",
    summaryFa: "پروانه‌ای با کپی‌لفت قوی",
    templatePlaceholders: ["[year]", "[fullname]"],
    template: "Copyright (C) [year] [fullname]",
    permissive: false,
    copyleft: "strong",
    commercial: true,
    derivatives: true,
    shareAlike: true,
    attribution: true,
    patentGrant: true,
    gplCompatible: true,
  },
]

describe("licenseUtils", () => {
  describe("filterLicenses", () => {
    it("returns empty array for empty form data", () => {
      const formData: FormData = {
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

      const result = filterLicenses(mockLicenses, formData)
      expect(result).toHaveLength(0)
    })

    it("filters by work type", () => {
      const formData: FormData = {
        workType: "software",
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

      const result = filterLicenses(mockLicenses, formData)
      expect(result).toHaveLength(2)
      expect(result.every((license) => license.category === "software")).toBe(true)
    })

    it("filters by commercial use preference", () => {
      const formData: FormData = {
        workType: "software",
        commercialUse: true,
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

      const result = filterLicenses(mockLicenses, formData)
      expect(result.every((license) => license.commercial === true)).toBe(true)
    })

    it("filters by share-alike preference", () => {
      const formData: FormData = {
        workType: "software",
        commercialUse: null,
        derivatives: null,
        shareAlike: true,
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

      const result = filterLicenses(mockLicenses, formData)
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe("gpl-3.0")
    })

    it("filters by patent grant preference", () => {
      const formData: FormData = {
        workType: "software",
        commercialUse: null,
        derivatives: null,
        shareAlike: null,
        attribution: null,
        freedomLevel: "",
        patentGrant: true,
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

      const result = filterLicenses(mockLicenses, formData)
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe("gpl-3.0")
    })
  })

  describe("generateLicenseText", () => {
    const mockCopyrightData: CopyrightData = {
      title: "Test Project",
      author: "John Doe",
      year: "2024",
      organization: "Test Org",
      website: "https://example.com",
      email: "test@example.com",
      version: "1.0.0",
      jurisdiction: "US",
      attributionText: "Test attribution",
    }

    it("replaces placeholders in license template", () => {
      const result = generateLicenseText(mockLicenses[0], mockCopyrightData)

      expect(result).toContain("2024")
      expect(result).toContain("John Doe")
      expect(result).not.toContain("[year]")
      expect(result).not.toContain("[fullname]")
    })

    it("handles missing copyright data gracefully", () => {
      const emptyCopyrightData: CopyrightData = {
        title: "",
        author: "",
        year: "",
        organization: "",
        website: "",
        email: "",
        version: "",
        jurisdiction: "",
        attributionText: "",
      }

      const result = generateLicenseText(mockLicenses[0], emptyCopyrightData)

      expect(result).toContain("[year]")
      expect(result).toContain("[fullname]")
    })
  })

  describe("generateReadmeSnippet", () => {
    const mockCopyrightData: CopyrightData = {
      title: "Test Project",
      author: "John Doe",
      year: "2024",
      organization: "",
      website: "",
      email: "",
      version: "",
      jurisdiction: "",
      attributionText: "",
    }

    it("generates proper README snippet", () => {
      const result = generateReadmeSnippet(mockLicenses[0], mockCopyrightData)

      expect(result).toContain("## License")
      expect(result).toContain("MIT License")
      expect(result).toContain("Test Project")
      expect(result).toContain("John Doe")
    })

    it("includes license badge", () => {
      const result = generateReadmeSnippet(mockLicenses[0], mockCopyrightData)

      expect(result).toContain("![License: MIT]")
      expect(result).toContain("https://img.shields.io/badge/License-MIT")
    })

    it("handles Persian text correctly", () => {
      const result = generateReadmeSnippet(mockLicenses[0], mockCopyrightData)

      expect(result).toContain("پروانه‌ای بسیار آزاد")
    })
  })
})
