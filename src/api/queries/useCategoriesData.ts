import { useQuery } from '@tanstack/react-query'

import { fetchGuardianSections } from '../client/guardianClient'
import { queryKeys } from '../util/queryKeys'

// using guardians api to fetch list of categories
export const useCategoriesData = () => {
   return useQuery({
      queryKey: [queryKeys.categories],
      queryFn: fetchGuardianSections,
      select: (data) => data.results.map((section) => ({ id: section.id, name: section.webTitle }))
   })
}
