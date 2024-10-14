import { useParams, useSearchParams } from 'react-router-dom'

import ArticleDetail from './ArticleDetail'
import Message from '@/components/Message'
import { NewsSource } from '@/util/constants'

const ArticlePage = () => {
   const { api } = useParams()
   const [searchparams] = useSearchParams()
   const id = searchparams.get('id')

   const isValidNewsSource =
      api &&
      Object.values(NewsSource)
         .map((source) => source.toString())
         .includes(api)

   return id && isValidNewsSource ? (
      <ArticleDetail id={id} api={api as NewsSource} />
   ) : (
      <Message heading='Article not found' body='Please try again in a while' />
   )
}

export default ArticlePage
