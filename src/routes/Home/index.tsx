import { useAtomValue } from 'jotai'

import ActionBar from './ActionBar'
import Header from './Header'
import PersonalFeed from './PersonalFeedView'
import TopStories from './TopStories'
import { selectedFeedAtom } from '@/atoms/homeAtoms'
import { HomeTab } from '@/util/constants'

const HomePage = () => {
   const selectedFeed = useAtomValue(selectedFeedAtom)
   return (
      <div>
         <Header />
         <ActionBar />
         {selectedFeed === HomeTab.TopStories ? <TopStories /> : <PersonalFeed />}
      </div>
   )
}

export default HomePage
