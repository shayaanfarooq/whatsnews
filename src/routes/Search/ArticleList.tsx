import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'

import { useSearchedNewsData } from '@/api/queries/useSearchedNewsData'
import {
   contentParamsAtom,
   selectedSourcesAtom,
   updateContentParamsAtom
} from '@/atoms/filterAtoms'
import ArticleCard from '@/components/ArticleCardGrid/ArticleCard'
import CenterLayout from '@/components/Layout/CenterLayout'
import Message from '@/components/Message'
import SkeletonCard from '@/components/Skeletons/CardSkeleton'
import PaginationControl from '@/components/ui/pagination-control'
import { articlesSorter } from '@/util/sort'

const ArticleList = () => {
   const sources = useAtomValue(selectedSourcesAtom)
   const contentParams = useAtomValue(contentParamsAtom)
   const updateParams = useSetAtom(updateContentParamsAtom)
   const [isFirstFetchDone, setIsFirstFetchDone] = useState(false)

   const { data, isLoading, isError, isFetched } = useSearchedNewsData(sources, {
      ...contentParams
   })

   useEffect(() => {
      if (isFetched && !isFirstFetchDone) {
         setIsFirstFetchDone(true)
      }
   }, [isFetched, isFirstFetchDone])

   const handlePageChange = (newPage: number) => {
      updateParams({ page: newPage })
   }

   if (!isFirstFetchDone) {
      return (
         <CenterLayout className='w-full py-4'>
            <Message
               heading='Welcome to Whatsnews Search!'
               body='Add a filter from above to begin searching for articles'
            />
         </CenterLayout>
      )
   }

   if (isError) {
      return (
         <Message
            heading="Hey, we couldn't find what you're searching for"
            body="Might be worth updating the filters. If that doesn't work, please try again after a few moments"
         />
      )
   }

   return (
      <div className='w-full p-4'>
         <CenterLayout className='flex flex-col gap-4'>
            {/* Pagination at the top */}
            {isFirstFetchDone && (
               <div className='items center flex w-full justify-between'>
                  <div className='w-full text-left text-xl font-extrabold uppercase'>Results</div>
                  <PaginationControl
                     currentPage={contentParams.page}
                     isNextDisabled={isLoading || data.length === 0}
                     isPreviousDisabled={isLoading || contentParams.page === 1}
                     onPageChange={handlePageChange}
                  />
               </div>
            )}

            {isLoading ? (
               [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SkeletonCard key={`skeleton-card-${num}`} variant='large' />
               ))
            ) : (
               <div className='flex flex-col gap-8'>
                  {data
                     ?.sort((a, b) => articlesSorter(a, b, 'date'))
                     .map((article, index) => {
                        return (
                           <ArticleCard
                              article={article}
                              key={`${article.title}-${index}`}
                              variant={'large'}
                           />
                        )
                     })}
               </div>
            )}

            {/* Pagination at the bottom */}
            {isFirstFetchDone && (
               <div className='flex w-full justify-end'>
                  <PaginationControl
                     currentPage={contentParams.page}
                     isNextDisabled={isLoading || data.length === 0}
                     isPreviousDisabled={isLoading || contentParams.page === 1}
                     onPageChange={handlePageChange}
                  />
               </div>
            )}
         </CenterLayout>
      </div>
   )
}

export default ArticleList
