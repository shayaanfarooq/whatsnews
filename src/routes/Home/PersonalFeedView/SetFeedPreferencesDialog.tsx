import { useAtom } from 'jotai'
import { FC, useEffect, useMemo, useState } from 'react'

import { useCategoriesData } from '@/api/queries/useCategoriesData'
import { feedPreferencesAtom, isPersonalFeedDialogOpenAtom } from '@/atoms/homeAtoms'
import { MultiSelectCombobox } from '@/components/ui/autocomplete-multiselect'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
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

   // syncing values
   useEffect(() => {
      if (isDialogOpen && feedPreferences) {
         setLocalPreferences({ ...feedPreferences })
      }
   }, [isDialogOpen, feedPreferences])

   // extracting category options
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
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
         <Dialog.Header title='Set Preferences' onClose={() => setIsDialogOpen(false)} />
         <Dialog.Body>
            <div>
               <div className='text-left'>
                  {!feedPreferences && (
                     <>
                        {' '}
                        <span>Looks like you do not have any personal preferences yet.</span>
                        <br />
                     </>
                  )}
                  Select your preferred news categories and sources.
               </div>
            </div>

            {/* Categories */}
            <div className='flex w-full flex-col items-stretch justify-between gap-2 md:flex-row md:items-center'>
               <p className='text-left text-sm font-bold'>Categories</p>
               <MultiSelectCombobox
                  selectedValues={localPreferences.categories ?? []}
                  options={categoryOptions ?? []}
                  onApply={handleCategoriesApplied}
                  placeholder='None'
                  label=''
                  multiSelect
                  className='w-full min-w-[180px]'
               />
            </div>

            {/* Sources */}
            <div className='flex w-full flex-col items-stretch justify-between gap-2 md:flex-row md:items-center'>
               <p className='text-left text-sm font-bold'>Sources</p>
               <MultiSelectCombobox
                  selectedValues={localPreferences.sources ?? []}
                  options={Object.values(NewsSource).map((source) => ({
                     value: source,
                     label: newsSourceLabels[source]
                  }))}
                  onApply={handleSourcesApplied}
                  placeholder='All'
                  multiSelect
                  className='w-full min-w-[180px]'
               />
            </div>
         </Dialog.Body>

         {/* Dialog Footer with Submit and Cancel Buttons */}
         <Dialog.Footer className='flex flex-row justify-end gap-4'>
            <Button variant='secondary' onClick={() => setIsDialogOpen(false)}>
               Cancel
            </Button>
            <Button variant='primary' onClick={handleConfirm}>
               Confirm
            </Button>
         </Dialog.Footer>
      </Dialog>
   )
}

export default SetFeedPreferencesDialog
