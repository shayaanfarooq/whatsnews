import { GuardianContentResponse, GuardianSingleItem } from './GuardianApiTypes'
import { NewApiResponse } from './NewsApiTypes'
import { NewsSource } from '@/util/constants'

/* 
   Common types used around the app  
*/

export interface ContentParams {
   search?: string
   page: number
   categories?: string[]
   date?: Date
   fromDate?: Date
   pageSize?: number
}

// unionised for all apis to use in use query custom hooks
export type ContentResponse = NewApiResponse | GuardianContentResponse
export type SingleArticleResponse = GuardianSingleItem | NewApiResponse

// common Article type for WhatsNews
export interface Article {
   id: string
   api: NewsSource
   author: string
   imageUrl: string
   title: string
   date: string
   content: string
   source: string
   fullStory?: string
}

// Personal feed preferences
export interface PersonalFeedPreference {
   sources: string[]
   categories: string[]
}
