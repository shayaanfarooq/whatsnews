import { NewsSource, defaultSources } from '@/util/constants'
import { UseQueryOptions, useQueries } from '@tanstack/react-query'
import { fetchNewsApiEverything } from '../client/newsApi'
import { fetchGuardianContent } from '../client/guardianApi'
import { Article, ContentParams, ContentResponse } from '@/types'
import { convertNewsApiEverythingResToAritcle } from '../util/newsApi'
import { NewApiResponse } from '@/types/NewsApiTypes'
import { convertGuardianContentToArticle } from '../util/guardian'
import { GuardianContentResponse } from '@/types/GuardianApiTypes'
import { isBefore } from 'date-fns'
import { queryKeys } from '../util/queryKeys'

export const useAllNewsData = (sources: string[], params: ContentParams) => {
   const enabled = !!params.categories || !!params.search
   const finalSources = sources.length === 0 ? defaultSources : sources
   return useQueries({
      queries: finalSources.map((source): UseQueryOptions<ContentResponse, unknown, Article[]> => {
         switch (source) {
            case NewsSource.NewsApi:
               // news api
               return {
                  queryKey: [queryKeys.newsApiContent, params],
                  queryFn: () => fetchNewsApiEverything(params),
                  select: (data) => convertNewsApiEverythingResToAritcle(data as NewApiResponse),
                  enabled: enabled
               }

            case NewsSource.Guardian:
               // guardian
               return {
                  queryKey: [queryKeys.guardianContent, params],
                  queryFn: () => fetchGuardianContent(params),
                  select: (data) =>
                     convertGuardianContentToArticle(data as GuardianContentResponse),
                  enabled: enabled
               }

            default:
               return { queryKey: [] }
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
