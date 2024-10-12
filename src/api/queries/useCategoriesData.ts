import { useQuery } from '@tanstack/react-query'
import { fetchGuardianSections } from '../client/guardianApi'

// using guardians api to fetch list of categories
export const useCategories = () => {
   return useQuery({
      queryKey: ['categories'],
      queryFn: fetchGuardianSections,
      select: (data) => data.results.map((section) => ({ id: section.id, name: section.webTitle }))
   })
}
