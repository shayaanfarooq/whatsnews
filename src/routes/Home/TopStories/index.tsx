import ArticleCard from './ArticleCard'
import { useTopStoriesData } from '@/api/queries/useTopStoriesData'
import CenterLayout from '@/components/Layout/CenterLayout'
import { cn } from '@/lib/utils'
import { articlesSorter } from '@/util/sort'

const TopStories = () => {
   const { data: topStories, isLoading, isError } = useTopStoriesData()

   if (isError) {
      return <div>Error</div>
   }

   if (isLoading) {
      return <div>Loading...</div>
   }

   console.log('data for topstories', topStories)
   return (
      <CenterLayout variant='wide'>
         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8'>
            {topStories
               .sort((a, b) => articlesSorter(a, b, 'date'))
               .map((article, index) => {
                  return (
                     <ArticleCard
                        key={`topstory-${article.title}`}
                        article={article}
                        className={cn(index % 5 === 0 && 'col-span-2')}
                     />
                  )
               })}
         </div>
      </CenterLayout>
   )
}

export default TopStories
