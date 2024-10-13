import { useAtomValue } from 'jotai'

import FeedSelector from './FeedSelector'
import Header from './Header'
import PersonalFeed from './PersonalFeed'
import TopStories from './TopStories'
import { selectedFeedAtom } from '@/atoms/homeAtoms'
import { HomeTab } from '@/util/constants'

const HomePage = () => {
   const selectedFeed = useAtomValue(selectedFeedAtom)
   return (
      <div>
         <Header />
         <FeedSelector />
         {selectedFeed === HomeTab.TopStories ? <TopStories /> : <PersonalFeed />}
      </div>
   )
}

export default HomePage
