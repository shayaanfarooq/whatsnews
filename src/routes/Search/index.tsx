import { useAllNewsData } from '@/api/queries/useAllNewsData'
import { NewsSource } from '@/util/constants'
import { format } from 'date-fns'
import { useState } from 'react'

const Search = () => {
   const [search, setSearch] = useState('')
   const [localSearch, setLocalSearch] = useState('')

   // const { data, isLoading, isError } = useQuery({
   //    queryFn: () => fetchNewsFromAPI(search),
   //    queryKey: ['new-api', { search }]
   // })

   const { data, isLoading, isError } = useAllNewsData([NewsSource.NewsApi, NewsSource.Guardian], {
      search: search
   })

   console.log('useAllNewsData', data)
   const handleGo = () => {
      setSearch(localSearch)
   }

   if (isLoading) {
      return <div className='text-white'>Loading</div>
   }

   if (isError) {
      console.log('data', data)
      return <div className='text-white'> error</div>
   }

   return (
      <>
         <div>
            <input value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} />
         </div>
         <button className='bg-green-400' onClick={handleGo}>
            Go
         </button>

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
