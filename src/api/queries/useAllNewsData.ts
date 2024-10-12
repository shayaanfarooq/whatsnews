import { NewsSource } from '@/util/constants'
import { UseQueryOptions, useQueries } from '@tanstack/react-query'
import { fetchNewsApiEverything } from '../client/newsApi'
import { fetchGuardianContent } from '../client/guardianApi'
import { Article, ContentParams, ContentResponse } from '@/types'
import { convertNewsApiEverythingResToAritcle } from '../util/newApi'
import { NewApiResponse } from '@/types/NewsApiTypes'
import { convertGuardianContentToArticle } from '../util/guardian'
import { GuardianContentResponse } from '@/types/GuardianApiTypes'
import { isBefore } from 'date-fns'

export const useAllNewsData = (sources: NewsSource[], params: ContentParams) => {
   const enabled = !!params.category || !!params.search
   return useQueries({
      queries: sources.map((source): UseQueryOptions<ContentResponse, unknown, Article[]> => {
         switch (source) {
            case NewsSource.NewsApi:
               // news api
               return {
                  queryKey: ['newsapi-content', params],
                  queryFn: () => fetchNewsApiEverything(params),
                  select: (data) => convertNewsApiEverythingResToAritcle(data as NewApiResponse),
                  enabled: enabled
               }

            default:
               // guardian
               return {
                  queryKey: ['guardian-content', params],
                  queryFn: () => fetchGuardianContent(params),
                  select: (data) =>
                     convertGuardianContentToArticle(data as GuardianContentResponse),
                  enabled: enabled
               }
         }
      }),
      combine: (results) => {
         // combine all news data into one
         return {
            data: results
               .map((result) => result.data) // extracting data of each result
               .filter((article) => article !== undefined) // filtering out undefined
               .flat() // converting into a flat array
               .sort((articleA, articleB) => {
                  // sorting newest first so the sources aren't sequential in order
                  if (articleA && articleB) {
                     const dateA = new Date(articleA.date)
                     const dateB = new Date(articleB.date)
                     return isBefore(dateB, dateA) ? -1 : 1
                  }
                  return 0
               }) as Article[],
            pending: results.some((result) => result.isPending),
            isLoading: results.some((result) => result.isLoading),
            isError: results.some((result) => result.isError)
         }
      }
   })
}
