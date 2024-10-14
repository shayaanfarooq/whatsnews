import { FC } from 'react'

import ArticleCard from './ArticleCard'
import { cn } from '@/lib/utils'
import { Article } from '@/types'
import { articlesSorter } from '@/util/sort'

interface ArticlesGridProps {
   listOfArticles: Article[]
}

const ArticlesGrid: FC<ArticlesGridProps> = ({ listOfArticles }) => {
   return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8'>
         {listOfArticles
            .sort((a, b) => articlesSorter(a, b, 'date'))
            .map((article, index) => {
               return (
                  <ArticleCard
                     key={`articles-grid-${article.title}-${index}`}
                     article={article}
                     className={cn(index % 5 === 0 && 'col-span-2')}
                  />
               )
            })}
      </div>
   )
}

export default ArticlesGrid
