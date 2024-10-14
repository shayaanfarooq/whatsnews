import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import backupImage from '@/assets/images/news_placeholder.svg'
import { cn } from '@/lib/utils'
import { Article } from '@/types'

interface ArticleCardProps {
   article: Article
   className?: string
}

const ArticleCard: React.FC<ArticleCardProps> = ({
   article: { id, imageUrl, author, date, source, title, api, content },
   className
}) => {
   const [isImageLoaded, setIsImageLoaded] = useState(false)
   const imgUrl = imageUrl ? imageUrl : backupImage

   return (
      <NavLink to={`/search/${api}?id=${id}`} className={className}>
         <div className={`group cursor-pointer flex flex-col gap-4 justify-between h-full`}>
            <div className={`group cursor-pointer flex flex-col gap-4 text-left`}>
               <div className='group-hover:bg-primary-500 w-20 h-3 bg-zinc-900 transition-colors' />
               {/* Image */}
               {imgUrl && (
                  <img
                     alt={title.slice(0, 10)}
                     src={imgUrl}
                     onLoad={() => setIsImageLoaded(true)}
                     className={cn(
                        'w-full h-48 object-cover mb-4 bg-zinc-100 group-hover:opacity-90 transition-opacity',
                        !isImageLoaded && 'animate-pulse'
                     )}
                  />
               )}
               {/* Title */}
               <h2 className='text-xl font-extrabold text-zinc-900 mb-2 group-hover:text-primary-500  transition-colors'>
                  {title}
               </h2>
               {/* Author, Date, and Source */}
               <div className='text-sm text-zinc-600 mb-4 group-hover:text-primary transition-colors'>
                  <span>By {author}</span> | <span>{format(new Date(date), 'MMM. d, yyyy')}</span> |{' '}
                  <span className='font-semibold '>{source}</span>
               </div>
               {/* Content Preview */}

               <div
                  className='font-serif text-zinc-700 line-clamp-3 group-hover:text-primary transition-colors '
                  dangerouslySetInnerHTML={{ __html: `${content}` }}
               />
            </div>
            <div className='bg-primary self-end  flex items-center invisible group-hover:visible transition-colors px-4 h-4 py-2'>
               <p className='text-white'>Read</p>
               <ArrowRight className='text-white size-4 group-hover:translate-x-2 duration-500 transition-transform' />
            </div>
         </div>
      </NavLink>
   )
}

export default ArticleCard
