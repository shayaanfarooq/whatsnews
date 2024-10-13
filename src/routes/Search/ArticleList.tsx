import { useAtomValue } from 'jotai'

import { useAllNewsData } from '@/api/queries/useAllNewsData'
import { contentParamsAtom, selectedSourcesAtom } from '@/atoms/searchAtoms'

const ArticleList = () => {
   const sources = useAtomValue(selectedSourcesAtom)
   const contentParams = useAtomValue(contentParamsAtom)

   const { data, isLoading, isError } = useAllNewsData(sources, {
      ...contentParams
   })

   return <div>ArticleList</div>
}

export default ArticleList
