import { format } from 'date-fns'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { useSingleArticleData } from '@/api/queries/useSingleArticleData'
import { NewsSource } from '@/util/constants'

interface ArticleDetailProps {
   api: NewsSource
   id: string
}

const ArticleDetail: FC<ArticleDetailProps> = ({ id, api }) => {
   const { isLoading, isError, data: article } = useSingleArticleData({ api, id })

   if (isLoading) {
      return <div>isLoading</div>
   }
   if (isError) {
      return <div>error</div>
   }

   console.log('data for single', article)
   return article ? (
      <div className=''>
         {/* Article Image */}
         {article.imageUrl && (
            <img
               src={article.imageUrl}
               alt={article.title}
               className='w-full h-[500px] object-cover mb-4'
            />
         )}

         <div className='max-w-4xl  mx-auto rounded-lg pb-6 px-2'>
            {/* Article Title */}
            <h1 className='text-4xl font-extrabold text-zinc-900 mb-2 text-left'>
               {article.title}
            </h1>

            {/* Author and Date */}
            <div className='text-md text-zinc-600 mb-4 text-left'>
               <span className='text-primary font-semibold'>{article.source}</span>
               <span> | {article.author}</span> |{' '}
               <span>{format(new Date(article.date), 'MMM. d, yyyy')}</span>
            </div>

            {/* Article Content */}
            <div
               className='text-zinc-700 mb-6 font-serif flex gap-4 text-left flex-col text-xl'
               dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Full Story Button */}
            {article.fullStory && (
               <div className='flex justify-end w-full'>
                  <NavLink
                     to={article.fullStory}
                     target='_blank'
                     rel='noopener noreferrer'
                     className='inline-block px-6 py-2 text-sm font-semibold text-white bg-primary rounded hover:bg-orange-600 transition'
                  >
                     Read Full Story
                  </NavLink>
               </div>
            )}
         </div>
      </div>
   ) : null
}

export default ArticleDetail
