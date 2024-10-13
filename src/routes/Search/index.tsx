import { useAllNewsData } from '@/api/queries/useAllNewsData'
import { contentParamsAtom, selectedSourcesAtom } from '@/atoms/searchAtoms'
import FilterControl from '@/components/FilterControl'
import { format } from 'date-fns'
import { useAtomValue } from 'jotai'

const Search = () => {
   const sources = useAtomValue(selectedSourcesAtom)
   const contentParams = useAtomValue(contentParamsAtom)

   const { data, isLoading, isError } = useAllNewsData(sources, {
      ...contentParams
   })

   console.log('useAllNewsData', data)

   if (isLoading) {
      return <div className='text-white'>Loading</div>
   }

   if (isError) {
      return <div className='text-white'> error</div>
   }

   return (
      <>
         <FilterControl />

         <div className='flex flex-col'>{'List of Articles'}</div>
         <div className='flex flex-col gap-4'>
            {data?.map((art, index) => (
               <div key={art.title + index} className='border border-red-500 rounded-xl p-6'>
                  <div>{art.title}</div>
                  <div>{art.author}</div>
                  <div>{art.source}</div>
                  <div>{format(new Date(art.date), 'dd/MM/yyyy hh:mm a')}</div>
               </div>
            ))}
         </div>
      </>
   )
}

export default Search
