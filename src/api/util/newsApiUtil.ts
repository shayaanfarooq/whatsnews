import { format } from 'date-fns'
import qs from 'qs'

import { Article, ContentParams } from '@/types'
import { NewApiResponse, NewsApiEverythingParams } from '@/types/NewsApiTypes'
import { NewsSource, PAGE_SIZE_PER_REQUEST } from '@/util/constants'

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY

// converts params to params for news api
export const parseToNewsApiParams = ({ search, categories, date, page }: ContentParams) => {
   const categoriesToQ = categories?.join(' OR ') ?? ''

   const params: NewsApiEverythingParams = {
      q: `${search ? search : ''}${categoriesToQ ? ` OR ${categoriesToQ}` : ''}`.slice(0, 500), //max length 500,
      page: page,
      pageSize: PAGE_SIZE_PER_REQUEST,
      to: date ? format(date, 'yyyy-MM-dd') : undefined,
      apiKey: NEWS_API_KEY
   }

   return qs.stringify(params)
}

// converts news api response to common Article type
export const convertNewsApiEverythingResToAritcle = (data: NewApiResponse): Article[] => {
   return data.articles.map((article) => ({
      id: article.title,
      api: NewsSource.NewsApi,
      author: article.author,
      content: article.content,
      date: article.publishedAt,
      title: article.title,
      imageUrl: article.urlToImage,
      source: article.source.name,
      fullStory: article.url
   }))
}

// returns params when doing single item search via /everything api
export const parseForSingleNewsApiArticle = (id: string) => {
   const query: NewsApiEverythingParams = {
      q: id,
      searchIn: 'title',
      apiKey: NEWS_API_KEY
   }
   return qs.stringify(query)
}
