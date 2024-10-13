import { useAtomValue, useSetAtom } from 'jotai'

import ArticleResult from './ArticleListItem'
import { useSearchedNewsData } from '@/api/queries/useAllNewsData'
import {
   contentParamsAtom,
   selectedSourcesAtom,
   updateContentParamsAtom
} from '@/atoms/filterAtoms'
import PaginationControl from '@/components/ui/pagination-control'
import { articlesSorter } from '@/util/sort'

const ArticleList = () => {
   const sources = useAtomValue(selectedSourcesAtom)
   const contentParams = useAtomValue(contentParamsAtom)
   const updateParams = useSetAtom(updateContentParamsAtom)

   const { data, isLoading, isError, isPending } = useSearchedNewsData(sources, {
      ...contentParams
   })

   const handlePageChange = (newPage: number) => {
      updateParams({ page: newPage })
   }

   if (isLoading) {
      return <div>Loading</div>
   }

   if (isError) {
      return <div>Error</div>
   }

   return (
      <div className='m-auto max-w-4xl py-4 flex flex-col gap-4'>
         {!isPending && (
            <div className='flex w-full justify-between items center'>
               <div className='text-xl w-full text-left font-extrabold uppercase'>Results</div>
               <PaginationControl
                  currentPage={contentParams.page}
                  isNextDisabled={data.length === 0}
                  isPreviousDisabled={contentParams.page === 1}
                  onPageChange={handlePageChange}
               />
            </div>
         )}
         <div className='flex flex-col gap-8'>
            {data
               ?.sort((a, b) => articlesSorter(a, b, 'date'))
               .map((article, index) => {
                  return <ArticleResult article={article} key={`${article.title}-${index}`} />
               })}
         </div>

         {!isPending && (
            <div className='flex justify-end w-full'>
               <PaginationControl
                  currentPage={contentParams.page}
                  isNextDisabled={data.length === 0}
                  isPreviousDisabled={contentParams.page === 1}
                  onPageChange={handlePageChange}
               />
            </div>
         )}
      </div>
   )
}

export default ArticleList
