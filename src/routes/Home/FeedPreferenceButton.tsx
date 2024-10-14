import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'

import { feedPreferencesAtom, isPersonalFeedDialogOpenAtom } from '@/atoms/homeAtoms'
import { Button } from '@/components/ui/button'

const FeedPreferenceButton = () => {
   const feedPreferences = useAtomValue(feedPreferencesAtom)
   const setIsDialogOpen = useSetAtom(isPersonalFeedDialogOpenAtom)
   return (
      <Button
         variant='link'
         className='text-zinc-50 uppercase'
         onClick={() => setIsDialogOpen(true)}
      >
         {feedPreferences ? 'Update' : 'Add'} Preferences
      </Button>
   )
}

export default FeedPreferenceButton
