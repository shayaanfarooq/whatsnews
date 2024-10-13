import { useMemo } from 'react'
import SearchBar from './SearchBar'
import { MultiSelectCombobox } from '../ui/autocomplete-multiselect'
import { useCategoriesData } from '@/api/queries/useCategoriesData'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
   contentParamsAtom,
   selectedSourcesAtom,
   updateContentParamsAtom
} from '@/atoms/searchAtoms'
import { DatePicker } from '../ui/date-picker'
import { NewsSource } from '@/util/constants'

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
      <div className='flex gap-4 w-full p-2 md:p-6 bg-zinc-300'>
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
            options={Object.values(NewsSource).map((source) => ({ value: source, label: source }))}
            onApply={handleSourcesApplied}
            placeholder='All'
            label='Sources'
            multiSelect
         />

         <DatePicker selectedDate={date} onDateChange={handleDateChange} disableFuture />
      </div>
   )
}

export default FilterControl
