import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Article } from '@/types'

interface ArticleListItemProps {
   article: Article
}

const ArticleListItem: FC<ArticleListItemProps> = ({
   article: { id, imageUrl, author, date, source, title, api, content }
}) => {
   return (
      <NavLink to={`/article/${api}?id=${id}`} className={'group'}>
         <div className='mb-4 block h-3 w-20 bg-zinc-900 transition-colors group-hover:bg-primary-500 md:hidden' />

         <div className='flex cursor-pointer flex-col items-stretch gap-x-4 transition-colors md:flex-row'>
            {/* Article Image */}
            <div className='md:w-1/2'>
               <img
                  src={imageUrl ?? ''}
                  alt={title}
                  className='h-60 min-w-full max-w-full object-cover md:aspect-[4/3] md:h-auto'
               />
            </div>

            {/* Article Content */}
            <div className='md:max-w-1/2 flex max-h-full min-h-full flex-col justify-between gap-y-2 md:w-1/2'>
               <div className='flex flex-col gap-4'>
                  <div className='hidden h-3 w-20 bg-zinc-900 transition-colors group-hover:bg-primary-500 md:block' />

                  {/* Title */}
                  <h3 className='text-left text-lg font-extrabold text-zinc-900 transition-colors group-hover:text-primary md:text-xl'>
                     {title}
                  </h3>

                  {/* Author, Date, and Source */}
                  <div className='mb-4 text-left text-sm text-zinc-600 transition-colors group-hover:text-primary'>
                     <span>By {author}</span> |{' '}
                     <span>{format(new Date(date), 'MMM. d, yyyy')}</span> |{' '}
                     <span className='font-semibold'>{source}</span>
                  </div>

                  {/* Content Preview */}
                  <div
                     className='line-clamp-3 text-left font-serif text-zinc-700 transition-colors group-hover:text-primary'
                     dangerouslySetInnerHTML={{ __html: `${content}` }}
                  />
               </div>
               {/* Read -> */}
               <div className='invisible mt-5 flex h-4 items-center self-end bg-primary px-4 py-2 transition-colors group-hover:visible md:mt-0'>
                  <p className='text-white'>Read</p>
                  <ArrowRight className='size-4 text-white transition-transform duration-500 group-hover:translate-x-2' />
               </div>
            </div>
         </div>
      </NavLink>
   )
}

export default ArticleListItem
