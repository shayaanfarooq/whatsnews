import { ContentParams } from '@/types'
import { GuardianContentResponse, GuardianSectionResponse } from '@/types/GuardianApiTypes'
import { PAGE_SIZE_PER_REQUEST } from '@/util/constants'
import axios from 'axios'

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

export const fetchGuardianContent = async (params: ContentParams) => {
   const search = params.search
   const url = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&q=${search}&page-size=${PAGE_SIZE_PER_REQUEST}`

   const response = await axios.get<{ response: GuardianContentResponse }>(url)
   console.log('respopnse.data=======', response.data)
   return response.data.response
}

export const fetchGuardianSections = async () => {
   const url = `https://content.guardianapis.com/sections?api-key=${GUARDIAN_API_KEY}`

   const response = await axios.get<{ response: GuardianSectionResponse }>(url)
   console.log('respopnse.data=======', response.data)
   return response.data.response
}
