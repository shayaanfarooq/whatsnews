import { useQuery } from '@tanstack/react-query'

import { fetchSingleGuardianArticle } from '../client/guardianClient'
import { fetchSingleNewsApiArticle } from '../client/newsApiClient'
import { convertGuardianSingleItemToArticle } from '../util/guardianUtil'
import { convertNewsApiEverythingResToAritcle } from '../util/newsApiUtil'
import { queryKeys } from '../util/queryKeys'
import { Article, SingleArticleResponse } from '@/types'
import { GuardianSingleItem } from '@/types/GuardianApiTypes'
import { NewApiResponse } from '@/types/NewsApiTypes'
import { NewsSource } from '@/util/constants'

// using guardians api to fetch list of categories
export const useSingleArticle = ({ api, id }: { api: NewsSource; id: string }) => {
   return useQuery<SingleArticleResponse, unknown, Article>({
      queryKey: [queryKeys.singleArticle, api, id],
      queryFn: () =>
         api === NewsSource.Guardian
            ? fetchSingleGuardianArticle(id)
            : fetchSingleNewsApiArticle(id),
      enabled: !!api && !!id,
      // converts to Article
      select: (data) =>
         api === NewsSource.Guardian
            ? convertGuardianSingleItemToArticle(data as GuardianSingleItem)
            : (convertNewsApiEverythingResToAritcle(data as NewApiResponse)[0] as Article)
   })
}
