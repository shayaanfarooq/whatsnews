import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useMemo } from 'react'

import SearchBar from './SearchBar'
import CenterLayout from '../Layout/CenterLayout'
import { MultiSelectCombobox } from '../ui/autocomplete-multiselect'
import { DatePicker } from '../ui/date-picker'
import { useCategoriesData } from '@/api/queries/useCategoriesData'
import {
   contentParamsAtom,
   selectedSourcesAtom,
   updateContentParamsAtom
} from '@/atoms/filterAtoms'
import { NewsSource, newsSourceLabels } from '@/util/constants'

const FilterControl = () => {
   const { categories, date } = useAtomValue(contentParamsAtom)
   const updateParams = useSetAtom(updateContentParamsAtom)
   const [sources, setSources] = useAtom(selectedSourcesAtom)
   // options
   const { data } = useCategoriesData()
   const categoryOptions = useMemo(
      () => data?.map((category) => ({ value: category.id, label: category.name })) ?? [],
      [data]
   )

   const handleCategoriesApplied = (newSelected: string[]) => {
      updateParams({ categories: newSelected })
   }

   const handleDateChange = (newDate: Date | undefined) => {
      updateParams({ date: newDate })
   }

   const handleSourcesApplied = (newSources: string[]) => {
      setSources(newSources)
   }

   return (
      <div className='flex w-full gap-4 bg-zinc-700 p-2 md:p-6'>
         <CenterLayout>
            <div className='flex w-full flex-wrap gap-4'>
               <SearchBar />

               <MultiSelectCombobox
                  selectedValues={categories ?? []}
                  options={categoryOptions}
                  onApply={handleCategoriesApplied}
                  placeholder='Category'
                  label='Category'
                  multiSelect
               />
               <MultiSelectCombobox
                  selectedValues={sources ?? []}
                  options={Object.values(NewsSource).map((source) => ({
                     value: source,
                     label: newsSourceLabels[source]
                  }))}
                  onApply={handleSourcesApplied}
                  placeholder='All'
                  label='Sources'
                  multiSelect
               />

               <DatePicker selectedDate={date} onDateChange={handleDateChange} disableFuture />
            </div>
         </CenterLayout>
      </div>
   )
}

export default FilterControl
