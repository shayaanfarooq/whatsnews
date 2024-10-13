import axios from 'axios'

import {
   getCommonGuardianParams,
   parseToGuardianParams,
   parseToTopStoriesGuardianParams
} from '../util/guardianUtil'
import { ContentParams } from '@/types'
import {
   GuardianContentResponse,
   GuardianSectionResponse,
   GuardianSingleItem
} from '@/types/GuardianApiTypes'

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

// sections (categories)
export const fetchGuardianSections = async () => {
   const url = `https://content.guardianapis.com/sections?api-key=${GUARDIAN_API_KEY}`
   const response = await axios.get<{ response: GuardianSectionResponse }>(url)
   return response.data.response
}

// list via search
export const fetchGuardianContent = async (params: ContentParams) => {
   const queryString = parseToGuardianParams(params)
   const url = `https://content.guardianapis.com/search?${queryString}`
   const response = await axios.get<{ response: GuardianContentResponse }>(url)
   return response.data.response
}

export const fetchGuardianTopStories = async () => {
   const queryString = parseToTopStoriesGuardianParams()
   const url = `https://content.guardianapis.com/search?${queryString}`
   const response = await axios.get<{ response: GuardianContentResponse }>(url)
   return response.data.response
}

// single item
export const fetchSingleGuardianArticle = async (id: string) => {
   const queryString = getCommonGuardianParams()
   const url = `https://content.guardianapis.com/${id}?${queryString}`
   const response = await axios.get<{ response: GuardianSingleItem }>(url)
   return response.data.response
}
