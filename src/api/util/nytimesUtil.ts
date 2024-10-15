import { format, subDays } from 'date-fns'
import qs from 'qs'

import { Article, ContentParams } from '@/types'
import { NYTimesResponse, NyTimesEverythingParams } from '@/types/NyTimesApiTypes'
import { NewsSource } from '@/util/constants'

const NY_TIMES_API_KEY = import.meta.env.VITE_NY_TIMES_API_KEY
export const nyTimesCategories = [
   'arts',
   'automobiles',
   'books / review',
   'business',
   'fashion',
   'food',
   'health',
   'home',
   'insider',
   'magazine',
   'movies',
   'nyregion',
   'obituaries',
   'opinion',
   'politics',
   'realestate',
   'science',
   'sports',
   'sundayreview',
   'technology',
   'theater',
   't - magazine',
   'travel',
   'upshot',
   'us',
   'world'
]

// converts params to params for ny times
export const parseToNyTimesParams = ({
   search,
   categories,
   date,
   fromDate,
   page
}: ContentParams) => {
   const categoriesToQ = categories?.join(' OR ') ?? ''

   const params: NyTimesEverythingParams = {
      q: `${search ? search : ''}${categoriesToQ ? `${categoriesToQ}` : ''}`.slice(0, 500), //max length 500,
      page: page,
      end_date: date ? format(date, 'yyyy-MM-dd') : undefined,
      begin_date: fromDate ? format(fromDate, 'yyyy-MM-dd') : undefined,
      'api-key': NY_TIMES_API_KEY
   }

   return qs.stringify(params)
}

// returns params when doing single item search via /articlesearch api
export const parseToSingleNyTimesParams = (id: string) => {
   const query: NyTimesEverythingParams = {
      q: id,
      'api-key': NY_TIMES_API_KEY
   }
   return qs.stringify(query)
}

// return news api params for topstories
export const parseToTopStoriesNyTimesParams = () => {
   const query: NyTimesEverythingParams = {
      q: nyTimesCategories.join(' OR '), // combining all categorie
      begin_date: format(subDays(new Date(), 30), 'yyyy-MM-dd'), // yesterday
      end_date: format(new Date(), 'yyyy-MM-dd'), // today
      'api-key': NY_TIMES_API_KEY
   }
   return qs.stringify(query)
}

// converts news api response to common Article type
export const convertNyTimesEverythingResToAritcle = (data: NYTimesResponse): Article[] => {
   return data.response.docs.map((article) => ({
      id: article.headline.main,
      api: NewsSource.NyTimes,
      author: article.byline.person[0]?.firstname + (article.byline.person[0]?.lastname ?? ''),
      content: article.lead_paragraph,
      date: article.pub_date,
      title: article.headline.main,
      imageUrl: article.multimedia[0]?.url,
      source: article.source,
      fullStory: article.web_url
   }))
}
