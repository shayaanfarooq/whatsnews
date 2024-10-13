import React from 'react'

const Header: React.FC = () => {
   return (
      <header className='relative bg-zinc-900 text-white h-[500px] flex items-center justify-center overflow-hidden'>
         {/* Background Image */}
         <img
            src='https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_1280.jpg'
            alt='Background'
            className='absolute inset-0 w-full h-full object-cover opacity-50'
         />

         {/* Overlay for better text visibility */}
         <div className='absolute inset-0 bg-zinc-900 opacity-60'></div>

         {/* Text Content */}
         <div className='relative z-10 text-center flex justify-center flex-col items-center'>
            <h1 className='text-6xl font-extrabold tracking-tight uppercase'>WHATSNEWS.</h1>
            <p className='px-2 uppercase mt-4 text-lg font-medium text-primary-500 bg-zinc-900 w-fit'>
               All your news in one place
            </p>
         </div>
      </header>
   )
}

export default Header
