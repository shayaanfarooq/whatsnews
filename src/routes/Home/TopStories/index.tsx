import { useTopStoriesData } from '@/api/queries/useTopStoriesData'
import ArticlesGrid from '@/components/ArticleCardGrid'
import CenterLayout from '@/components/Layout/CenterLayout'
import Message from '@/components/Message'

const TopStories = () => {
   const { data: topStories, isLoading, isError } = useTopStoriesData()

   if (isError) {
      return (
         <Message
            heading='There was an error while fetching top stories'
            body='Please try again later'
         />
      )
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
