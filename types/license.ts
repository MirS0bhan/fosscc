export interface License {
  id: string
  name: string
  spdxId: string
  category: "software" | "content" | "data" | "font"
  tags: string[]
  officialUrl: string
  summaryFa: string
  templatePlaceholders: string[]
  template: string
  permissive?: boolean
  copyleft?: "none" | "weak" | "strong" | "network"
  commercial?: boolean
  derivatives?: boolean
  shareAlike?: boolean
  attribution?: boolean
  patentGrant?: boolean
  gplCompatible?: boolean
}

export interface FormData {
  workType: "software" | "content" | "data" | "font" | ""
  commercialUse: boolean | null
  derivatives: boolean | null
  shareAlike: boolean | null
  attribution: boolean | null
  freedomLevel: "permissive" | "weak-copyleft" | "strong-copyleft" | "public-domain" | ""
  patentGrant: boolean | null
  gplCompatible: "essential" | "important" | "unimportant" | ""
  networkCopyleft: boolean | null
  dbAttribution: boolean | null
  dbShareAlike: boolean | null
  contentType: "text" | "image" | "audio" | "video" | "mixed" | ""
  allowDerivatives: boolean | null
  dataType: "research" | "government" | "scientific" | "cultural" | "other" | ""
  opennessLevel: "public-domain" | "attribution" | "share-alike" | ""
  fontType: "display" | "text" | "web" | "print" | ""
  allowEmbedding: boolean | null
}

export interface CopyrightData {
  title: string
  author: string
  year: string
  organization: string
  website: string
  email: string
  version: string
  jurisdiction: string
  attributionText: string
}

export interface UserFeedback {
  type: "success" | "error" | "info"
  message: string
  visible: boolean
}

export interface FormErrors {
  [key: string]: string
}
