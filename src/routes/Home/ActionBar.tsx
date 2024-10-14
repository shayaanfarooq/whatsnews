import { useAtom } from 'jotai'
import { Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import FeedPreferenceButton from './FeedPreferenceButton'
import { selectedFeedAtom } from '@/atoms/homeAtoms'
import CenterLayout from '@/components/Layout/CenterLayout'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { HomeTab } from '@/util/constants'

// home view tabs, update preferences cta
const ActionBar = () => {
   const [selectedFeed, setSelectedFeed] = useAtom(selectedFeedAtom)
   const handleTabChange = (newValue: string) => {
      setSelectedFeed(newValue as HomeTab)
   }

   return (
      <div className='sticky top-[60px] z-40 bg-zinc-900 p-6 md:top-[unset] md:block'>
         <CenterLayout>
            <div className='flex w-full justify-between'>
               {/* View selection tabs */}
               <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
                  <Tabs
                     value={selectedFeed}
                     onValueChange={handleTabChange}
                     className='w-full md:w-fit'
                  >
                     <TabsList className='w-full'>
                        <TabsTrigger value={HomeTab.TopStories} className='w-full'>
                           {HomeTab.TopStories}
                        </TabsTrigger>
                        <TabsTrigger value={HomeTab.PersonalFeed} className='w-full'>
                           {HomeTab.PersonalFeed}
                        </TabsTrigger>
                     </TabsList>
                  </Tabs>

                  {/* Set preference button */}
                  <div className='flex w-full justify-between'>
                     {<FeedPreferenceButton />}
                     {/* Search CTA */}
                     <NavLink to='/search' className={cn('group block md:hidden')}>
                        <Button>
                           <Search
                              className={'text-zinc-50 transition-all group-hover:text-primary'}
                           />
                        </Button>
                     </NavLink>
                  </div>
               </div>

               {/* Search CTA */}
               <NavLink to='/search' className={cn('group hidden md:block')}>
                  <Button>
                     <Search className='text-zinc-50 transition-all group-hover:text-primary' />
                  </Button>
               </NavLink>
            </div>
         </CenterLayout>
      </div>
   )
}

export default ActionBar
