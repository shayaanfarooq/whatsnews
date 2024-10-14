/* 
  Types extracted from news api org
*/
export interface NewsApiArticle {
   source: {
      id: string
      name: string
   }
   author: string
   title: string
   url: string
   urlToImage: string
   publishedAt: string
   content: string
}

export interface NewApiResponse {
   status: 'ok' | 'error'

   totalResults: number
   articles: NewsApiArticle[]

   // in case of error
   code?: string
   message?: string
}

export interface NewsApiEverythingParams {
   apiKey: string
   q?: string
   searchIn?: 'title' | 'description' | 'content'
   from?: string
   to?: string | undefined
   page?: number
   pageSize?: number
   sortBy?: 'publishedAt' | 'popularity' | 'relevency'
}
