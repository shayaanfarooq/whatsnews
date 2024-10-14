import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import PersonalFeed from './PersonalFeed'
import { feedPreferencesAtom, isPersonalFeedDialogOpenAtom } from '@/atoms/homeAtoms'
import { PERSONAL_FEED_LOCAL_STORAGE_KEY } from '@/util/constants'

const PersonalFeedView = () => {
   const [feedPreferences, setFeedPreferences] = useAtom(feedPreferencesAtom)
   const setIsDialogOpen = useSetAtom(isPersonalFeedDialogOpenAtom)

   // initializing preferences from local storage or opening dialog if no preferences found
   useEffect(() => {
      const localStoragePreference = localStorage.getItem(PERSONAL_FEED_LOCAL_STORAGE_KEY)
      if (localStoragePreference) {
         try {
            const preferences = JSON.parse(localStoragePreference)
            setFeedPreferences(preferences)
         } catch {
            setIsDialogOpen(true)
         }
      } else {
         setIsDialogOpen(true)
      }
   }, [setIsDialogOpen, setFeedPreferences])

   return (
      <div>
         {feedPreferences ? (
            <PersonalFeed feedPreferences={feedPreferences} />
         ) : (
            <div> No Preferences Added</div>
         )}
      </div>
   )
}

export default PersonalFeedView
