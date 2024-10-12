import { ContentParams } from '@/types'
import { NewApiResponse } from '@/types/NewsApiTypes'
import { PAGE_SIZE_PER_REQUEST } from '@/util/constants'
import axios from 'axios'

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY

export const fetchNewsApiEverything = async (params: ContentParams) => {
   // todo- params parse
   const search = params.search ? params.search : 'the'
   const url = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}&q=${search}&pageSize=${PAGE_SIZE_PER_REQUEST}`

   const response = await axios.get<NewApiResponse>(url)
   return response.data
}
