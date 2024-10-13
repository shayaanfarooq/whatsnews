import { GuardianContentResponse } from './GuardianApiTypes'
import { NewApiResponse } from './NewsApiTypes'
import { NewsSource } from '@/util/constants'

export interface ContentParams {
   search?: string
   page: number
   categories?: string[]
   date?: Date
}

export type ContentResponse = NewApiResponse | GuardianContentResponse

export interface Article {
   api: NewsSource
   author: string
   imageUrl: string
   title: string
   date: string
   content: string
   source: string
}
