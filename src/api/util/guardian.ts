import { Article, ContentParams } from '@/types'
import { GuardianContentResponse, GuardianParams } from '@/types/GuardianApiTypes'
import { PAGE_SIZE_PER_REQUEST } from '@/util/constants'
import { format } from 'date-fns'
import qs from 'qs'

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

export const convertGuardianContentToArticle = (data: GuardianContentResponse): Article[] => {
   return data.results.map((result) => ({
      author: result.tags[0]?.webTitle ?? '',
      content: '',
      date: result.webPublicationDate,
      title: result.webTitle,
      imageUrl: '',
      source: 'The Guardian'
   }))
}

export const parseToGuardianParams = ({ search, categories, date, page }: ContentParams) => {
   const params: GuardianParams = {
      q: search ?? '',
      section: categories?.join('|'),
      page: page,
      'page-size': PAGE_SIZE_PER_REQUEST,
      'to-date': date ? format(date, 'yyyy-MM-dd') : undefined,
      'api-key': GUARDIAN_API_KEY,
      'show-tags': 'contributor'
   }

   return qs.stringify(params)
}
