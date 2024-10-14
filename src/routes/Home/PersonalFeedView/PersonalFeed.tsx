import ArticlesGrid from '../components/ArticlesGrid'
import { usePersonalFeedData } from '@/api/queries/usePersonalFeedData'
import CenterLayout from '@/components/Layout/CenterLayout'
import { PersonalFeedPreference } from '@/types'

const PersonalFeedView = ({ feedPreferences }: { feedPreferences: PersonalFeedPreference }) => {
   const { data, isLoading, isError } = usePersonalFeedData(feedPreferences)

   if (isLoading) {
      return <div>Loading...</div>
   }

   if (isError) {
      return <div>Error</div>
   }

   console.log('dataaaaaa', data)
   return (
      <CenterLayout variant='wide'>
         <ArticlesGrid listOfArticles={data} />
      </CenterLayout>
   )
}

export default PersonalFeedView
