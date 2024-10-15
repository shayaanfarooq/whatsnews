import axios from 'axios'

import {
   parseToNyTimesParams,
   parseToSingleNyTimesParams,
   parseToTopStoriesNyTimesParams
} from '../util/nytimesUtil'
import { ContentParams } from '@/types'
import { NyTimesResponse } from '@/types/NyTimesApiTypes'

// list via search
export const fetchNyTimesSearchContent = async (params: ContentParams) => {
   const queryString = parseToNyTimesParams(params)
   const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${queryString}`
   const response = await axios.get<NyTimesResponse>(url)
   return response.data
}

// single item - uses the same api route as /everything with different params
export const fetchSingleNyTimesArticle = async (id: string) => {
   const queryString = parseToSingleNyTimesParams(id)
   const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${queryString}`
   const response = await axios.get<NyTimesResponse>(url)
   return response.data
}

// top stories - uses the same api route as /everything due to limited search on 'top-stories'. Uses Today as date.
export const fetchNyTimesTopStories = async () => {
   const queryString = parseToTopStoriesNyTimesParams()
   const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${queryString}`
   const response = await axios.get<NyTimesResponse>(url)
   return response.data
}
