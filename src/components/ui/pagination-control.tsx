import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { Button, buttonVariants } from './button'
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem
   //    PaginationNext,
   //    PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

type PaginationProps = {
   currentPage: number
   onPageChange: (page: number) => void
   isPreviousDisabled: boolean // Disabling condition for "Previous" button
   isNextDisabled: boolean // Disabling condition for "Next" button
}

const PaginationContr: React.FC<PaginationProps> = ({
   currentPage,
   onPageChange,
   isPreviousDisabled,
   isNextDisabled
}) => {
   // Helper function to handle page change
   const handlePageChange = (page: number) => {
      onPageChange(page)
   }

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <Button
                  variant={'ghost'}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={isPreviousDisabled} // Disable if it's the first page
               >
                  <ChevronLeftIcon className='size-4' />
               </Button>
            </PaginationItem>

            {/* Render Ellipsis */}
            {currentPage > 1 && (
               <PaginationItem>
                  <PaginationEllipsis />
               </PaginationItem>
            )}

            {/* Show the current page */}
            <PaginationItem>
               <div className={cn(buttonVariants({ variant: 'outline' }))}>{currentPage}</div>
            </PaginationItem>

            {/* Render Ellipsis */}
            {!isNextDisabled && (
               <PaginationItem>
                  <PaginationEllipsis />
               </PaginationItem>
            )}

            <PaginationItem>
               <Button
                  variant={'ghost'}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={isNextDisabled} // Disable if there's no next page
               >
                  <ChevronRightIcon className='size-4' />
               </Button>
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
}
export default PaginationContr
