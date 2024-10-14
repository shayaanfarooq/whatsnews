import { usePersonalFeedData } from '@/api/queries/usePersonalFeedData'
import ArticlesGrid from '@/components/ArticleCardGrid'
import CenterLayout from '@/components/Layout/CenterLayout'
import Message from '@/components/Message'
import { PersonalFeedPreference } from '@/types'

const PersonalFeedView = ({ feedPreferences }: { feedPreferences: PersonalFeedPreference }) => {
   const { data, isLoading, isError } = usePersonalFeedData(feedPreferences)

   if (isError) {
      return (
         <Message
            heading='There was an error while fetching your personal feed'
            body='Please try again later'
         />
      )
   }

   return (
      <div className='px-4 pb-6'>
         <CenterLayout>
            <ArticlesGrid listOfArticles={data} isLoading={isLoading} />
         </CenterLayout>
      </div>
   )
}

export default PersonalFeedView
