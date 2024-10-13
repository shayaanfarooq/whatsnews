import { useTopStoriesData } from '@/api/queries/useTopStoriesData'

const TopStories = () => {
   const { data, isLoading, isError } = useTopStoriesData()

   if (isError) {
      return <div>Error</div>
   }

   if (isLoading) {
      return <div>Loading...</div>
   }

   console.log('data for topstories', data)
   return <div>TopStories</div>
}

export default TopStories
