import { useAtom } from 'jotai'
import { FC, useEffect, useMemo, useState } from 'react'

import { useCategoriesData } from '@/api/queries/useCategoriesData'
import { feedPreferencesAtom, isPersonalFeedDialogOpenAtom } from '@/atoms/homeAtoms'
import { MultiSelectCombobox } from '@/components/ui/autocomplete-multiselect'
import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogFooter,
   DialogTitle,
   DialogDescription
} from '@/components/ui/dialog'
import { PersonalFeedPreference } from '@/types'
import { NewsSource, PERSONAL_FEED_LOCAL_STORAGE_KEY, newsSourceLabels } from '@/util/constants'

const SetFeedPreferencesDialog: FC = () => {
   const [isDialogOpen, setIsDialogOpen] = useAtom(isPersonalFeedDialogOpenAtom)
   const [feedPreferences, setFeedPreferences] = useAtom(feedPreferencesAtom)
   // set locally till confirm is pressed
   const [localPreferences, setLocalPreferences] = useState<PersonalFeedPreference>(
      feedPreferences
         ? {
              sources: [...feedPreferences.sources],
              categories: [...feedPreferences.categories]
           }
         : { sources: [], categories: [] }
   )

   useEffect(() => {
      if (isDialogOpen && feedPreferences) {
         setLocalPreferences({ ...feedPreferences })
      }
   }, [isDialogOpen, feedPreferences])

   console.log('feed pref', feedPreferences)

   const { data: categoryData } = useCategoriesData()
   const categoryOptions = useMemo(
      () => categoryData?.map((category) => ({ value: category.id, label: category.name })) ?? [],
      [categoryData]
   )

   const handleConfirm = () => {
      setFeedPreferences({ ...localPreferences })
      localStorage.setItem(PERSONAL_FEED_LOCAL_STORAGE_KEY, JSON.stringify(localPreferences))
      setIsDialogOpen(false)
   }

   const handleSourcesApplied = (newSources: string[]) => {
      setLocalPreferences({ ...localPreferences, sources: [...newSources] })
   }
   const handleCategoriesApplied = (newCategories: string[]) => {
      setLocalPreferences({ ...localPreferences, categories: [...newCategories] })
   }

   return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <DialogContent className='max-w-md'>
            <DialogHeader>
               <DialogTitle>Set Preferences</DialogTitle>
               <DialogDescription>
                  Select your preferred news categories and sources.
               </DialogDescription>
            </DialogHeader>

            {/* Categories */}
            <div className='flex justify-between items-center w-full'>
               <p className='text-sm'>Category</p>
               <MultiSelectCombobox
                  selectedValues={localPreferences.categories ?? []}
                  options={categoryOptions ?? []}
                  onApply={handleCategoriesApplied}
                  placeholder='None'
                  label=''
                  multiSelect
               />
            </div>

            {/* Sources */}
            <div className='flex justify-between items-center w-full'>
               <p className='text-sm'>Sources</p>
               <MultiSelectCombobox
                  selectedValues={localPreferences.sources ?? []}
                  options={Object.values(NewsSource).map((source) => ({
                     value: source,
                     label: newsSourceLabels[source]
                  }))}
                  onApply={handleSourcesApplied}
                  placeholder='All'
                  label='Sources'
                  multiSelect
               />
            </div>

            {/* Dialog Footer with Submit and Cancel Buttons */}
            <DialogFooter className='flex justify-end space-x-4 mt-4'>
               <Button variant='secondary' onClick={() => setIsDialogOpen(false)}>
                  Cancel
               </Button>
               <Button variant='primary' onClick={handleConfirm}>
                  Confirm
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default SetFeedPreferencesDialog
