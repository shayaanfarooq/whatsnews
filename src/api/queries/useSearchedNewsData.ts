import { UseQueryOptions, useQueries } from '@tanstack/react-query'

import { fetchGuardianContent } from '../client/guardianClient'
import { fetchNewsApiEverything } from '../client/newsApiClient'
import { fetchNyTimesSearchContent } from '../client/nytimesClient'
import { convertGuardianContentToArticle } from '../util/guardianUtil'
import { convertNewsApiEverythingResToAritcle } from '../util/newsApiUtil'
import { convertNyTimesSearchResToAritcle } from '../util/nytimesUtil'
import { queryKeys } from '../util/queryKeys'
import { Article, ContentParams, ContentResponse } from '@/types'
import { GuardianContentResponse } from '@/types/GuardianApiTypes'
import { NewApiResponse } from '@/types/NewsApiTypes'
import { NyTimesResponse } from '@/types/NyTimesApiTypes'
import { NewsSource, defaultSources } from '@/util/constants'

export const useSearchedNewsData = (sources: string[], params: ContentParams) => {
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

            case NewsSource.NyTimes:
               // ny times api
               return {
                  queryKey: [queryKeys.nytimesContent, params],
                  queryFn: () => fetchNyTimesSearchContent(params),
                  select: (data) => convertNyTimesSearchResToAritcle(data as NyTimesResponse),
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
            isPending: results.some((result) => result.isPending),
            isFetched: results.filter((result) => result.isFetched).length === results.length
         }
      }
   })
}
