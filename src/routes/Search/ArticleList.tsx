import { useAtomValue, useSetAtom } from 'jotai'

import ArticleResult from './ArticleListItem'
import { useSearchedNewsData } from '@/api/queries/useSearchedNewsData'
import {
   contentParamsAtom,
   selectedSourcesAtom,
   updateContentParamsAtom
} from '@/atoms/filterAtoms'
import CenterLayout from '@/components/Layout/CenterLayout'
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
      <div className='w-full p-4'>
         <CenterLayout className='flex flex-col gap-4'>
            {/* Pagination at the top */}
            {!isPending && (
               <div className='items center flex w-full justify-between'>
                  <div className='w-full text-left text-xl font-extrabold uppercase'>Results</div>
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

            {/* Pagination at the bottom */}
            {!isPending && (
               <div className='flex w-full justify-end'>
                  <PaginationControl
                     currentPage={contentParams.page}
                     isNextDisabled={data.length === 0}
                     isPreviousDisabled={contentParams.page === 1}
                     onPageChange={handlePageChange}
                  />
               </div>
            )}
         </CenterLayout>
      </div>
   )
}

export default ArticleList
