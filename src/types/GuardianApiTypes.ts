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
