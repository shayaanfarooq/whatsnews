import { UseQueryOptions, useQueries } from '@tanstack/react-query'

import { fetchGuardianTopStories } from '../client/guardianClient'
import { fetchNewsApiTopStories } from '../client/newsApiClient'
import { convertGuardianContentToArticle } from '../util/guardianUtil'
import { convertNewsApiEverythingResToAritcle } from '../util/newsApiUtil'
import { queryKeys } from '../util/queryKeys'
import { Article, ContentResponse } from '@/types'
import { GuardianContentResponse } from '@/types/GuardianApiTypes'
import { NewApiResponse } from '@/types/NewsApiTypes'
import { NewsSource, defaultSources } from '@/util/constants'

// top stories parallel dynamic queries
export const useTopStoriesData = () => {
   return useQueries({
      queries: defaultSources.map(
         (source): UseQueryOptions<ContentResponse, unknown, Article[]> => {
            switch (source) {
               case NewsSource.NewsApi:
                  // news api
                  return {
                     queryKey: [queryKeys.newsApiTopStories],
                     queryFn: () => fetchNewsApiTopStories(),
                     select: (data) => convertNewsApiEverythingResToAritcle(data as NewApiResponse),
                     staleTime: 3600000
                  }

               case NewsSource.Guardian:
                  // guardian
                  return {
                     queryKey: [queryKeys.guardianTopStories],
                     queryFn: () => fetchGuardianTopStories(),
                     select: (data) =>
                        convertGuardianContentToArticle(data as GuardianContentResponse),
                     staleTime: 3600000
                  }

               default:
                  return { queryKey: [] }
            }
         }
      ),
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
