import { useAtom } from 'jotai'

import { selectedFeedAtom } from '@/atoms/homeAtoms'
import CenterLayout from '@/components/Layout/CenterLayout'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HomeTab } from '@/util/constants'

const FeedSelector = () => {
   const [selectedFeed, setSelectedFeed] = useAtom(selectedFeedAtom)
   const handleTabChange = (newValue: string) => {
      setSelectedFeed(newValue as HomeTab)
   }

   return (
      <div className='bg-zinc-900 p-6'>
         <CenterLayout>
            <Tabs value={selectedFeed} onValueChange={handleTabChange} className='md:w-fit w-full'>
               <TabsList>
                  <TabsTrigger value={HomeTab.TopStories}>{HomeTab.TopStories}</TabsTrigger>
                  <TabsTrigger value={HomeTab.PersonalFeed}>{HomeTab.PersonalFeed}</TabsTrigger>
               </TabsList>
            </Tabs>
         </CenterLayout>
      </div>
   )
}

export default FeedSelector
