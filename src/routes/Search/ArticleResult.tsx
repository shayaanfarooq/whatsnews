import { FC } from 'react'

import { Article } from '@/types'

interface ArticleResultProps {
   article: Article[]
}

const ArticleResult: FC<ArticleResultProps> = ({ article }) => {
   return <div>ArticleResult</div>
}

export default ArticleResult
