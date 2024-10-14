import { useTopStoriesData } from '@/api/queries/useTopStoriesData'
import ArticlesGrid from '@/components/ArticleCardGrid'
import CenterLayout from '@/components/Layout/CenterLayout'

const TopStories = () => {
   const { data: topStories, isLoading, isError } = useTopStoriesData()

   if (isError) {
      return <div>Error</div>
   }

   return (
      <div className='px-4'>
         <CenterLayout className='pb-6'>
            <ArticlesGrid listOfArticles={topStories} isLoading={isLoading} />
         </CenterLayout>
      </div>
   )
}

export default TopStories
