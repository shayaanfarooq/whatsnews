import { useQuery } from '@tanstack/react-query'

import { fetchSingleGuardianArticle } from '../client/guardianClient'
import { fetchSingleNewsApiArticle } from '../client/newsApiClient'
import { fetchSingleNyTimesArticle } from '../client/nytimesClient'
import { convertGuardianSingleItemToArticle } from '../util/guardianUtil'
import { convertNewsApiEverythingResToAritcle } from '../util/newsApiUtil'
import { convertNyTimesSearchResToAritcle } from '../util/nytimesUtil'
import { queryKeys } from '../util/queryKeys'
import { Article, SingleArticleResponse, SingleArticleResponsePromises } from '@/types'
import { GuardianSingleItem } from '@/types/GuardianApiTypes'
import { NewApiResponse } from '@/types/NewsApiTypes'
import { NyTimesResponse as NyTimesResponse } from '@/types/NyTimesApiTypes'
import { NewsSource } from '@/util/constants'

const getQueryFn = (api: NewsSource, id: string): (() => SingleArticleResponsePromises) => {
   switch (api) {
      case NewsSource.NewsApi:
         return () => fetchSingleNewsApiArticle(id)
      case NewsSource.Guardian:
         return () => fetchSingleGuardianArticle(id)
      default:
         return () => fetchSingleNyTimesArticle(id)
   }
}

const convertSingleArticle = (api: NewsSource, data: SingleArticleResponse): Article => {
   switch (api) {
      case NewsSource.Guardian:
         return convertGuardianSingleItemToArticle(data as GuardianSingleItem)
      case NewsSource.NewsApi:
         return convertNewsApiEverythingResToAritcle(data as NewApiResponse)[0]
      default:
         return convertNyTimesSearchResToAritcle(data as NyTimesResponse)[0]
   }
}

// fetching single article from correct api using id
export const useSingleArticleData = ({ api, id }: { api: NewsSource; id: string }) => {
   return useQuery<SingleArticleResponse, unknown, Article>({
      queryKey: [queryKeys.singleArticle, api, id],
      queryFn: getQueryFn(api, id),
      enabled: !!api && !!id,
      select: (data) => convertSingleArticle(api, data)
   })
}
