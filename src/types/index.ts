import { GuardianContentResponse } from './GuardianApiTypes'
import { NewApiResponse } from './NewsApiTypes'

export interface ContentParams {
   search?: string
   page?: string
   category?: string[]
   date?: Date
}

export type ContentResponse = NewApiResponse | GuardianContentResponse

export interface Article {
   author: string
   imageUrl: string
   title: string
   date: string
   content: string
   source: string
}
