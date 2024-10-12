import { Article } from '@/types'
import { NewApiResponse } from '@/types/NewsApiTypes'

export const convertNewsApiEverythingResToAritcle = (data: NewApiResponse): Article[] => {
   return data.articles.map((article) => ({
      author: article.author,
      content: article.content,
      date: article.publishedAt,
      title: article.title,
      imageUrl: article.urlToImage,
      source: article.source.name
   }))
}
