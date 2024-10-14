import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import backupImage from '@/assets/images/news_placeholder.svg'
import { cn } from '@/lib/utils'
import { Article } from '@/types'

interface ArticleCardProps {
   article: Article
   className?: string
   variant?: 'default' | 'large'
}

const ArticleCard: FC<ArticleCardProps> = ({
   article: { id, imageUrl, author, date, source, title, api, content },
   className,
   variant = 'default'
}) => {
   const [isImageLoaded, setIsImageLoaded] = useState(false)
   const imgUrl = imageUrl ? imageUrl : backupImage

   const renderArticleCardContent = () => {
      return (
         <>
            {' '}
            {/* Title */}
            <h2 className='text-left text-lg font-extrabold text-zinc-900 transition-colors group-hover:text-primary-500 md:text-xl'>
               {title}
            </h2>
            {/* Author, Date, and Source */}
            <div className='mb-4 text-left text-sm text-zinc-600 transition-colors group-hover:text-primary'>
               <span>By {author}</span> | <span>{format(new Date(date), 'MMM. d, yyyy')}</span> |{' '}
               <span className='font-semibold'>{source}</span>
            </div>
            {/* Content Preview */}
            <div
               className='line-clamp-3 text-left font-serif text-zinc-700 transition-colors group-hover:text-primary'
               dangerouslySetInnerHTML={{ __html: `${content}` }}
            />
         </>
      )
   }

   const renderReadArrow = () => {
      return (
         <div className='invisible mb-2 flex h-4 items-center self-end bg-primary px-4 py-2 transition-colors group-hover:visible'>
            <p className='text-white'>Read</p>
            <ArrowRight className='size-4 text-white transition-transform duration-500 group-hover:translate-x-2' />
         </div>
      )
   }

   return (
      <NavLink to={`/article/${api}?id=${id}`} className={cn('group', className)}>
         {variant === 'default' ? (
            <div className={`flex h-full cursor-pointer flex-col justify-between gap-4`}>
               <div className={`flex cursor-pointer flex-col gap-2 text-left md:gap-4`}>
                  <div className='h-3 w-20 bg-zinc-900 transition-colors group-hover:bg-primary-500' />
                  {/* Image */}
                  {imgUrl && (
                     <img
                        alt={title.slice(0, 10)}
                        src={imgUrl}
                        onLoad={() => setIsImageLoaded(true)}
                        className={cn(
                           'mb-4 h-48 w-full bg-zinc-100 object-cover transition-opacity group-hover:opacity-90',
                           !isImageLoaded && 'animate-pulse'
                        )}
                     />
                  )}

                  {renderArticleCardContent()}
               </div>

               {/* Read -> */}
               {renderReadArrow()}
            </div>
         ) : (
            <>
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

                        {renderArticleCardContent()}
                     </div>
                     {/* Read -> */}
                     {renderReadArrow()}
                  </div>
               </div>
            </>
         )}
      </NavLink>
   )
}

export default ArticleCard
