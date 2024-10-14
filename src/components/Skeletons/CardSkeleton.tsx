import { FC } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface SkelectonCardProps {
   className?: string
   variant?: 'large' | 'default'
}

const SkeletonCard: FC<SkelectonCardProps> = ({ className, variant = 'default' }) => {
   return (
      <div
         className={cn(
            'flex w-full flex-col gap-3',
            variant === 'large' && 'md:flex-row',
            className
         )}
      >
         <Skeleton
            className={cn('h-[125px] w-full rounded-xl', variant === 'large' && 'h-[300px]')}
         />
         <div className='flex w-full flex-col'>
            <div className='mb-6 space-y-2'>
               <Skeleton className='h-4 w-[250px]' />
               <Skeleton className='h-4 w-[200px]' />
            </div>
            <div className='space-y-2'>
               <Skeleton className='h-4 w-full' />
               <Skeleton className='h-4 w-full' />
               <Skeleton className='h-4 w-[180px]' />
            </div>
         </div>
      </div>
   )
}

export default SkeletonCard
