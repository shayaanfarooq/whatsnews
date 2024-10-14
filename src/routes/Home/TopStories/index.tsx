import ArticlesGrid from '../components/ArticlesGrid'
import { useTopStoriesData } from '@/api/queries/useTopStoriesData'
import CenterLayout from '@/components/Layout/CenterLayout'

const TopStories = () => {
   const { data: topStories, isLoading, isError } = useTopStoriesData()

   if (isError) {
      return <div>Error</div>
   }

   if (isLoading) {
      return <div>Loading...</div>
   }

   return (
      <div className='px-4'>
         <CenterLayout>
            <ArticlesGrid listOfArticles={topStories} />
         </CenterLayout>
      </div>
   )
}

export default TopStories
