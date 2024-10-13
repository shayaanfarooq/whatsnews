import { format, subDays } from 'date-fns'
import qs from 'qs'

import { Article, ContentParams } from '@/types'
import {
   GuardianContentResponse,
   GuardianParams,
   GuardianSingleItem
} from '@/types/GuardianApiTypes'
import { NewsSource, PAGE_SIZE_FOR_TOP_STORIES, PAGE_SIZE_PER_REQUEST } from '@/util/constants'

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

export const parseToGuardianParams = ({ search, categories, date, page }: ContentParams) => {
   const params: GuardianParams = {
      q: search ?? '',
      section: categories?.join('|'),
      page: page,
      'page-size': PAGE_SIZE_PER_REQUEST,
      'to-date': date ? format(date, 'yyyy-MM-dd') : undefined,
      'api-key': GUARDIAN_API_KEY,
      'show-tags': 'contributor',
      'show-fields': 'body,thumbnail'
   }

   return qs.stringify(params)
}

export const parseToTopStoriesGuardianParams = () => {
   const params: GuardianParams = {
      page: 1,
      'page-size': PAGE_SIZE_FOR_TOP_STORIES,
      'to-date': format(new Date(), 'yyyy-MM-dd'),
      'from-date': format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      'api-key': GUARDIAN_API_KEY,
      'show-tags': 'contributor',
      'show-fields': 'body,thumbnail'
   }

   return qs.stringify(params)
}

export const getCommonGuardianParams = () => {
   const params: GuardianParams = {
      'api-key': GUARDIAN_API_KEY,
      'show-tags': 'contributor',
      'show-fields': 'body,thumbnail'
   }

   return qs.stringify(params)
}

export const convertGuardianContentToArticle = (data: GuardianContentResponse): Article[] => {
   return data.results.map((result) => ({
      id: result.id,
      api: NewsSource.Guardian,
      author: result.tags[0]?.webTitle ?? '',
      content: result.fields.body,
      date: result.webPublicationDate,
      title: result.webTitle,
      imageUrl: result.fields.thumbnail ?? '',
      source: 'The Guardian',
      fullStory: result.webUrl
   }))
}

export const convertGuardianSingleItemToArticle = (singleItem: GuardianSingleItem): Article => {
   return {
      id: singleItem.content.id,
      api: NewsSource.Guardian,
      author: singleItem.content.tags[0].webTitle ?? '',
      content: singleItem.content.fields.body,
      date: singleItem.content.webPublicationDate,
      title: singleItem.content.webTitle,
      imageUrl: singleItem.content.fields.thumbnail,
      source: 'The Guardian',
      fullStory: singleItem.content.webUrl
   }
}
