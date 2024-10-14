import { useAtom } from 'jotai'
import { Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import FeedPreferenceButton from './FeedPreferenceButton'
import { selectedFeedAtom } from '@/atoms/homeAtoms'
import CenterLayout from '@/components/Layout/CenterLayout'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HomeTab } from '@/util/constants'

const ActionBar = () => {
   const [selectedFeed, setSelectedFeed] = useAtom(selectedFeedAtom)
   const handleTabChange = (newValue: string) => {
      setSelectedFeed(newValue as HomeTab)
   }

   return (
      <div className='bg-zinc-900 p-6'>
         <CenterLayout variant='wide'>
            <div className='flex justify-between'>
               {/* Feed selection */}
               <div className='flex items-center gap-4'>
                  <Tabs
                     value={selectedFeed}
                     onValueChange={handleTabChange}
                     className='md:w-fit w-full'
                  >
                     <TabsList>
                        <TabsTrigger value={HomeTab.TopStories}>{HomeTab.TopStories}</TabsTrigger>
                        <TabsTrigger value={HomeTab.PersonalFeed}>
                           {HomeTab.PersonalFeed}
                        </TabsTrigger>
                     </TabsList>
                  </Tabs>

                  {selectedFeed === HomeTab.PersonalFeed && <FeedPreferenceButton />}
               </div>

               {/* Search CTA */}
               <NavLink to='/search' className='group'>
                  <Button>
                     <Search className='text-zinc-50 group-hover:text-primary transition-all' />
                  </Button>
               </NavLink>
            </div>
         </CenterLayout>
      </div>
   )
}

export default ActionBar
