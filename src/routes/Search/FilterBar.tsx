import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useMemo } from 'react'

import SearchField from './SearchField'
import { useCategoriesData } from '@/api/queries/useCategoriesData'
import {
   contentParamsAtom,
   selectedSourcesAtom,
   updateContentParamsAtom
} from '@/atoms/filterAtoms'
import CenterLayout from '@/components/Layout/CenterLayout'
import { MultiSelectCombobox } from '@/components/ui/autocomplete-multiselect'
import { DatePicker } from '@/components/ui/date-picker'
import { NewsSource, newsSourceLabels } from '@/util/constants'

const FilterBar = () => {
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
      updateParams({ categories: newSelected, page: 1 })
   }

   const handleDateChange = (newDate: Date | undefined) => {
      updateParams({ date: newDate, page: 1 })
   }

   const handleSourcesApplied = (newSources: string[]) => {
      setSources(newSources)
      updateParams({ page: 1 })
   }

   return (
      <div className='flex w-full gap-4 bg-zinc-800 p-4 md:p-6'>
         <CenterLayout className='w-full'>
            <div className='flex w-full flex-col flex-wrap items-stretch gap-4 md:flex-row'>
               <div className='flex-shrink'>
                  <SearchField />
               </div>

               <MultiSelectCombobox
                  selectedValues={categories ?? []}
                  options={categoryOptions}
                  onApply={handleCategoriesApplied}
                  placeholder='Category'
                  label='Category'
                  multiSelect
                  className='w-full md:w-auto'
               />
               <MultiSelectCombobox
                  selectedValues={sources ?? []}
                  options={Object.values(NewsSource).map((source) => ({
                     value: source,
                     label: newsSourceLabels[source]
                  }))}
                  onApply={handleSourcesApplied}
                  placeholder='Sources'
                  label='Sources'
                  multiSelect
                  className='w-full md:w-auto'
               />
               <DatePicker
                  selectedDate={date}
                  onDateChange={handleDateChange}
                  disableFuture
                  buttonClassName='w-full md:w-auto'
               />
            </div>
         </CenterLayout>
      </div>
   )
}

export default FilterBar
