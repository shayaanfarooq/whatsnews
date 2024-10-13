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
   tags: {
      // * limiting scope here - just going to fetch contributor
      id: 'profile/rowena-mason'
      webTitle: 'Rowena Mason'
   }[]
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
