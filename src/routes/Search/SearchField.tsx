import { useAtomValue, useSetAtom } from 'jotai'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'

import { contentParamsAtom, updateContentParamsAtom } from '@/atoms/filterAtoms'
import { Input } from '@/components//ui/input'
import { Button } from '@/components/ui/button'

const SearchField = () => {
   const { search } = useAtomValue(contentParamsAtom)
   const [localSearch, setLocalSearch] = useState(search ?? '')
   const updateParams = useSetAtom(updateContentParamsAtom)

   const handleSearchClick = () => {
      updateParams({ search: localSearch, page: 1 })
   }

   return (
      <form onSubmit={handleSearchClick}>
         <div className='items center flex w-full'>
            <Input
               value={localSearch}
               onChange={(event) => setLocalSearch(event.target.value)}
               placeholder='Search'
               className='w-full flex-grow rounded-e-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
            />
            <Button
               variant={'outline'}
               onClick={handleSearchClick}
               disabled={localSearch === search || !localSearch}
               className='rounded-s-none'
               type='submit'
            >
               <SearchIcon className='size-4' />
            </Button>
         </div>
      </form>
   )
}

export default SearchField
