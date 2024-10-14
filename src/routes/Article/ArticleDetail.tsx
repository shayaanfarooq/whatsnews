import { format } from 'date-fns'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { useSingleArticleData } from '@/api/queries/useSingleArticleData'
import CenterLayout from '@/components/Layout/CenterLayout'
import Message from '@/components/Message'
import ArticleDetailSkeleton from '@/components/Skeletons/ArticleDetailSkeleton'
import { NewsSource } from '@/util/constants'

interface ArticleDetailProps {
   api: NewsSource
   id: string
}

const ArticleDetail: FC<ArticleDetailProps> = ({ id, api }) => {
   const { isLoading, isError, data: article } = useSingleArticleData({ api, id })

   if (isLoading) {
      return <ArticleDetailSkeleton />
   }

   if (isError) {
      return (
         <Message
            heading='There was an error while fetching your this article'
            body='Please try again later'
         />
      )
   }

   return article ? (
      <div className=''>
         {/* Article Image */}
         {article.imageUrl && (
            <img
               src={article.imageUrl}
               alt={article.title}
               className='mb-4 h-[500px] w-full object-cover'
            />
         )}

         <CenterLayout>
            <div className='w-full px-4 pb-6'>
               {/* Article Title */}
               <h1 className='mb-2 text-left text-2xl font-extrabold text-zinc-900 md:text-4xl'>
                  {article.title}
               </h1>

               {/* Author and Date */}
               <div className='text-md mb-4 text-left text-zinc-600'>
                  <span>{article.author}</span> |{' '}
                  <span>{format(new Date(article.date), 'MMM. d, yyyy')} | </span>
                  <span className='font-semibold text-primary'>{article.source}</span>
               </div>

               {/* Article Content */}
               <div
                  className='text-md text-md mb-6 flex flex-col gap-4 text-left font-serif text-zinc-700 md:text-xl'
                  dangerouslySetInnerHTML={{ __html: article.content }}
               />

               {/* Full Story Button */}
               {article.fullStory && (
                  <div className='flex w-full justify-end'>
                     <NavLink
                        to={article.fullStory}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block rounded bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-600'
                     >
                        Read Full Story
                     </NavLink>
                  </div>
               )}
            </div>
         </CenterLayout>
      </div>
   ) : null
}

export default ArticleDetail
