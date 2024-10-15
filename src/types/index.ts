import { GuardianContentResponse, GuardianSingleItem } from './GuardianApiTypes'
import { NewApiResponse } from './NewsApiTypes'
import { NyTimesResponse } from './NyTimesApiTypes'
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
export type ContentResponse = NewApiResponse | GuardianContentResponse | NyTimesResponse
export type SingleArticleResponse = GuardianSingleItem | NewApiResponse | NyTimesResponse
export type SingleArticleResponsePromises =
   | Promise<GuardianSingleItem>
   | Promise<NewApiResponse>
   | Promise<NyTimesResponse>

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
