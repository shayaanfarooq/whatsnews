import { subDays } from 'date-fns'
import { useMemo } from 'react'

import { useCategoriesData } from '@/api/queries/useCategoriesData'
import { useCategoryFeedData } from '@/api/queries/useCategoryFeedData'

const CategoryRow = ({ category, sources }: { category: string; sources: string[] }) => {
   const { data: categoriesData } = useCategoriesData()
   const categoryItem = useMemo(
      () => categoriesData?.find((cat) => cat.id === category),
      [category, categoriesData]
   )

   const { data, isLoading, isError } = useCategoryFeedData(sources, {
      categories: [category], // single category
      page: 1,
      date: new Date(),
      fromDate: subDays(new Date(), 30)
   })

   if (isLoading) {
      return <div>loading...</div>
   }
   if (isError) {
      return <div>error</div>
   }

   console.log('data in category', category, data)

   return categoryItem ? <div className='text-primary '>{categoryItem.name}</div> : <div>null</div>
}

export default CategoryRow
