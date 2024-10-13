import axios from 'axios'

import { parseToNewsApiParams } from '../util/newsApi'
import { ContentParams } from '@/types'
import { NewApiResponse } from '@/types/NewsApiTypes'

export const fetchNewsApiEverything = async (params: ContentParams) => {
   const queryString = parseToNewsApiParams(params)

   console.log('query string', queryString)
   const url = `https://newsapi.org/v2/everything?${queryString}`

   const response = await axios.get<NewApiResponse>(url)
   return response.data
}
