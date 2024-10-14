import { format } from 'date-fns'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Article } from '@/types'

interface ArticleListItemProps {
   article: Article
}

const ArticleListItem: FC<ArticleListItemProps> = ({
   article: { id, imageUrl, author, date, source, title, api }
}) => {
   return (
      <NavLink to={`/article/${api}?id=${id}`}>
         <div className='flex items-stretch space-x-4 transition-colors cursor-pointer group '>
            {/* Article Image */}
            <div className='flex-1'>
               <img src={imageUrl ?? ''} alt={title} className='aspect-[4/3] w-full object-cover' />
            </div>

            {/* Article Content */}
            <div className='flex-1 flex flex-col space-y-2 max-h-full min-h-full w-full justify-between'>
               {/* Title */}
               <h3 className='text-lg font-semibold text-zinc-800 text-left group-hover:text-primary-600'>
                  {title}
               </h3>

               <div className='flex justify-between  text-zinc-600 group-hover:text-primary-400'>
                  {/* Author and Source */}
                  <div className='text-sm font-medium  text-left'>
                     <span className='font-extralight'>{author}</span>
                     {author && source && <span className='mx-2'>•</span>}
                     <span className='font-extralight'>{source}</span>
                  </div>

                  {/* Date */}
                  <div className='text-xs font-extralight'>
                     {format(new Date(date), 'MMM. dd, yyyy')}
                  </div>
               </div>
            </div>
         </div>
      </NavLink>
   )
}

export default ArticleListItem
