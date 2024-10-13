import { ContentParams } from '@/types'
import { GuardianContentResponse, GuardianSectionResponse } from '@/types/GuardianApiTypes'
import axios from 'axios'
import { parseToGuardianParams } from '../util/guardian'

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

export const fetchGuardianContent = async (params: ContentParams) => {
   const queryString = parseToGuardianParams(params)
   const url = `https://content.guardianapis.com/search?${queryString}`
   const response = await axios.get<{ response: GuardianContentResponse }>(url)
   return response.data.response
}

export const fetchGuardianSections = async () => {
   const url = `https://content.guardianapis.com/sections?api-key=${GUARDIAN_API_KEY}`
   const response = await axios.get<{ response: GuardianSectionResponse }>(url)
   return response.data.response
}
