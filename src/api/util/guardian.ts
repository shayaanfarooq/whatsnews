import { Article } from '@/types'
import { GuardianContentResponse } from '@/types/GuardianApiTypes'

export const convertGuardianContentToArticle = (data: GuardianContentResponse): Article[] => {
   console.log('inside convert guardian ', data)
   return data.results.map((result) => ({
      author: '',
      content: '',
      date: result.webPublicationDate,
      title: result.webTitle,
      imageUrl: '',
      source: 'Guardian'
   }))
}
