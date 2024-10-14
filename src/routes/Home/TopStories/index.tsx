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

   console.log('data for topstories', topStories)
   return (
      <CenterLayout variant='wide'>
         <ArticlesGrid listOfArticles={topStories} />
      </CenterLayout>
   )
}

export default TopStories
