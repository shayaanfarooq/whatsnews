import { FC } from 'react'

import { imageUrls } from '@/util/constants'

// hero
const Header: FC = () => {
   return (
      <header className='relative flex h-[300px] items-center justify-center overflow-hidden bg-zinc-900 text-white md:h-[450px]'>
         {/* Background Image */}
         <img
            src={imageUrls.hero}
            alt='many_newspapers'
            className='absolute inset-0 h-full w-full object-cover opacity-50'
         />

         {/* Overlay for better text visibility */}
         <div className='absolute inset-0 bg-zinc-900 opacity-60'></div>

         {/* Text Content */}
         <div className='relative z-10 flex flex-col items-center justify-center text-center'>
            <h1 className='text-3xl font-extrabold uppercase tracking-tight md:text-6xl'>
               WHATSNEWS.
            </h1>
            <p className='text:md mt-4 w-fit bg-zinc-900 px-2 font-medium uppercase text-primary-500 md:text-lg'>
               All your news in one place
            </p>
         </div>
      </header>
   )
}

export default Header
