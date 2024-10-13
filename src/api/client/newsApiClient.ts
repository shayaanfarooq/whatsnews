import axios from 'axios'

import { parseForSingleNewsApiArticle, parseToNewsApiParams } from '../util/newsApiUtil'
import { ContentParams } from '@/types'
import { NewApiResponse } from '@/types/NewsApiTypes'

// list via search
export const fetchNewsApiEverything = async (params: ContentParams) => {
   const queryString = parseToNewsApiParams(params)
   const url = `https://newsapi.org/v2/everything?${queryString}`
   const response = await axios.get<NewApiResponse>(url)
   return response.data
}

// single item - uses the same api route as /everything with different params
export const fetchSingleNewsApiArticle = async (id: string) => {
   const queryString = parseForSingleNewsApiArticle(id)
   const url = `https://newsapi.org/v2/everything?${queryString}`
   const response = await axios.get<NewApiResponse>(url)
   return response.data
}
