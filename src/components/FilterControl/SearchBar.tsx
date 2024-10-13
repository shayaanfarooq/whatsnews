import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { contentParamsAtom, updateContentParamsAtom } from '@/atoms/searchAtoms'


const SearchBar = () => {
   const { search } = useAtomValue(contentParamsAtom)
   const [localSearch, setLocalSearch] = useState(search ?? '')
   const updateParams = useSetAtom(updateContentParamsAtom)

   const handleSearchClick = () => {
      updateParams({ search: localSearch })
   }

   return (
      <div className='flex items center gap-2'>
         <Input
            value={localSearch}
            onChange={(event) => setLocalSearch(event.target.value)}
            placeholder='Search'
         />
         <Button onClick={handleSearchClick} disabled={localSearch === search || !localSearch}>
            <MagnifyingGlassIcon className='size-4' />
         </Button>
      </div>
   )
}

export default SearchBar
