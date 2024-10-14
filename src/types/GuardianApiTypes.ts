/* 
  Types extracted from the guardian api
*/

// Params

export interface GuardianParams {
   'api-key': string
   q?: string
   'from-date'?: string
   'to-date'?: string | undefined
   page?: number
   'page-size'?: number
   section?: string
   'show-tags'?: string
   'show-fields'?: string
}

// Fields - requested by show-fields
export interface GuardianFields {
   /* limiting score here- there are more */
   body: string
   thumbnail: string
   headline: string
}

// Tags - requested by show-tags
export interface GuardianTag {
   /* limiting score here- there are more */
   id: string
   webTitle: string
}

// Content
export interface GuardianContentResult {
   id: string
   type: string
   sectionId: string
   sectionName: string
   webPublicationDate: string
   webTitle: string
   webUrl: string
   isHosted: false
   pillarId: string
   pillarName: string
   tags: GuardianTag[]
   fields: GuardianFields
}

export interface GuardianContentResponse {
   status: string
   userTier: string
   total: number
   startIndex: number
   pageSize: number
   currentPage: number
   pages: number
   orderBy: string
   results: GuardianContentResult[]
}

// Section

export interface GuardianSectionResponse {
   status: string
   userTier: string
   total: number
   results: {
      id: string
      webTitle: string
      webUrl: string
      apiUrl: string
      editions: {
         id: string
         webTitle: string
         webUrl: string
         apiUrl: string
         code: string
      }[]
   }[]
}

// Single Item
export interface GuardianSingleItem {
   status: string
   userTier: string
   total: number
   content: {
      id: string
      type: string
      sectionId: string
      sectionName: string
      webPublicationDate: string
      webTitle: string
      webUrl: string
      apiUrl: string
      isHosted: boolean
      pillarId: string
      pillarName: string
      tags: GuardianTag[]
      fields: GuardianFields
   }
}
