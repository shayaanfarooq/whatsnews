import { FC } from 'react'

import ArticleCard from './ArticleCard'
import SkeletonCard from '@/components/Skeletons/CardSkeleton'
import { cn } from '@/lib/utils'
import { Article } from '@/types'
import { articlesSorter } from '@/util/sort'

interface ArticlesGridProps {
   listOfArticles: Article[]
   isLoading?: boolean
}

const ArticlesGrid: FC<ArticlesGridProps> = ({ listOfArticles, isLoading = false }) => {
   return (
      <div className='grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3 xl:grid-cols-4'>
         {isLoading
            ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                 <SkeletonCard
                    key={`skeleton-card-${num}`}
                    className={cn(num % 5 === 0 && 'lg:col-span-2')}
                 />
              ))
            : listOfArticles
                 .sort((a, b) => articlesSorter(a, b, 'date'))
                 .map((article, index) => {
                    return (
                       <ArticleCard
                          key={`articles-grid-${article.title}-${index}`}
                          article={article}
                          className={cn(index % 5 === 0 && 'lg:col-span-2')} // every 5th card is has 2 cols to give a less uniform effect
                       />
                    )
                 })}
      </div>
   )
}

export default ArticlesGrid
