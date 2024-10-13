import { UseQueryOptions, useQueries } from '@tanstack/react-query'
import { isBefore } from 'date-fns'

import { fetchGuardianContent } from '../client/guardianApi'
import { fetchNewsApiEverything } from '../client/newsApi'
import { convertGuardianContentToArticle } from '../util/guardian'
import { convertNewsApiEverythingResToAritcle } from '../util/newsApi'
import { queryKeys } from '../util/queryKeys'
import { Article, ContentParams, ContentResponse } from '@/types'
import { GuardianContentResponse } from '@/types/GuardianApiTypes'
import { NewApiResponse } from '@/types/NewsApiTypes'
import { NewsSource, defaultSources } from '@/util/constants'

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
               .flat() as Article[], // converting into a flat array
            pending: results.some((result) => result.isPending),
            isLoading: results.some((result) => result.isLoading),
            isError: results.some((result) => result.isError),
            isFetching: results.some((result) => result.isFetching),
            isPending: results.some((result) => result.isPending)
         }
      }
   })
}
