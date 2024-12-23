import { UseQueryOptions, useQueries } from '@tanstack/react-query'
import { subDays } from 'date-fns'

import { fetchGuardianContent } from '../client/guardianClient'
import { fetchNewsApiEverything } from '../client/newsApiClient'
import { fetchNyTimesSearchContent } from '../client/nytimesClient'
import { convertGuardianContentToArticle } from '../util/guardianUtil'
import { convertNewsApiEverythingResToAritcle } from '../util/newsApiUtil'
import { convertNyTimesSearchResToAritcle } from '../util/nytimesUtil'
import { queryKeys } from '../util/queryKeys'
import { Article, ContentParams, ContentResponse, PersonalFeedPreference } from '@/types'
import { GuardianContentResponse } from '@/types/GuardianApiTypes'
import { NewApiResponse } from '@/types/NewsApiTypes'
import { NyTimesResponse as NyTimesResponse } from '@/types/NyTimesApiTypes'
import { NewsSource, defaultSources } from '@/util/constants'

// basically a category wise parallel search
export const usePersonalFeedData = ({ sources, categories }: PersonalFeedPreference) => {
   const enabled = !!sources && !!categories
   const finalSources = sources.length === 0 ? defaultSources : sources
   const params: ContentParams = {
      page: 1,
      categories: categories,
      date: new Date(),
      fromDate: subDays(new Date(), 30),
      pageSize: 50
   }
   return useQueries({
      queries: finalSources.map((source): UseQueryOptions<ContentResponse, unknown, Article[]> => {
         switch (source) {
            case NewsSource.NewsApi:
               // news api
               return {
                  queryKey: [queryKeys.newsApiPersonalFeed, categories],
                  queryFn: () => fetchNewsApiEverything(params),
                  select: (data) => convertNewsApiEverythingResToAritcle(data as NewApiResponse),
                  enabled: enabled
               }

            case NewsSource.Guardian:
               // guardian
               return {
                  queryKey: [queryKeys.guardianPersonalFeed, categories],
                  queryFn: () => fetchGuardianContent(params),
                  select: (data) =>
                     convertGuardianContentToArticle(data as GuardianContentResponse),
                  enabled: enabled
               }
            case NewsSource.NyTimes:
               // new york times
               return {
                  queryKey: [queryKeys.nytimesPersonalFeed, categories],
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
            isPending: results.some((result) => result.isPending)
         }
      }
   })
}
