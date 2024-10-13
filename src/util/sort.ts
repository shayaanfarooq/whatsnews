import { isBefore } from 'date-fns'

import { Article } from '@/types'

// extend for direction or other sortby keys
export const articlesSorter = (articleA: Article, articleB: Article, sortBy: string) => {
   switch (sortBy) {
      case 'date':
         // sorting newest first so the sources aren't sequential in order
         if (articleA && articleB) {
            const dateA = new Date(articleA.date)
            const dateB = new Date(articleB.date)
            return isBefore(dateB, dateA) ? -1 : 1
         }
         return 0

      default:
         break
   }
   return 0
}
