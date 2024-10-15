import { format, subDays } from 'date-fns'
import qs from 'qs'

import { Article, ContentParams } from '@/types'
import { NyTimesResponse, NyTimesSearchParams } from '@/types/NyTimesApiTypes'
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

   const params: NyTimesSearchParams = {
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
   const query: NyTimesSearchParams = {
      q: id,
      'api-key': NY_TIMES_API_KEY
   }
   return qs.stringify(query)
}

// return news api params for topstories
export const parseToTopStoriesNyTimesParams = () => {
   const query: NyTimesSearchParams = {
      q: nyTimesCategories.join(' OR '), // combining all categorie
      begin_date: format(subDays(new Date(), 30), 'yyyy-MM-dd'), // yesterday
      end_date: format(new Date(), 'yyyy-MM-dd'), // today
      'api-key': NY_TIMES_API_KEY
   }
   return qs.stringify(query)
}

// converts news api response to common Article type
export const convertNyTimesSearchResToAritcle = (data: NyTimesResponse): Article[] => {
   return data.response.docs.map(
      ({ headline, byline, lead_paragraph, pub_date, multimedia, source, web_url }) => ({
         id: headline.main,
         api: NewsSource.NyTimes,
         author: byline.person[0]?.firstname + (byline.person[0]?.lastname ?? ''),
         content: lead_paragraph,
         date: pub_date,
         title: headline.main,
         imageUrl: multimedia[0]?.url ? `https://www.nytimes.com/${multimedia[0]?.url}` : '',
         source: source,
         fullStory: web_url
      })
   )
}
