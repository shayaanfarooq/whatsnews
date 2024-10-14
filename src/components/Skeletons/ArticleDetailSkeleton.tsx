import CenterLayout from '@/components/Layout/CenterLayout'
import { Skeleton } from '@/components/ui/skeleton'

const ArticleDetailSkeleton = () => {
   return (
      <div>
         {/* Skeleton for the article image */}
         <Skeleton className='mb-4 h-[500px] w-full object-cover' />

         <CenterLayout>
            <div className='w-full px-4 pb-6'>
               {/* Skeleton for the article title */}
               <Skeleton className='mb-2 h-10 w-full max-w-lg' />

               {/* Skeleton for author, date, and source */}
               <div className='mb-4 flex items-center gap-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-36' />
                  <Skeleton className='h-4 w-20' />
               </div>

               {/* Skeleton for the article content */}
               <div className='flex flex-col gap-4'>
                  <Skeleton className='h-4 w-full max-w-2xl' />
                  <Skeleton className='h-4 w-full max-w-xl' />
                  <Skeleton className='h-4 w-full max-w-lg' />
                  <Skeleton className='h-4 w-full max-w-lg' />
                  <Skeleton className='h-4 w-full max-w-md' />
               </div>

               {/* Skeleton for the full story button */}
               <div className='flex w-full justify-end'>
                  <Skeleton className='h-10 w-32' />
               </div>
            </div>
         </CenterLayout>
      </div>
   )
}

export default ArticleDetailSkeleton
