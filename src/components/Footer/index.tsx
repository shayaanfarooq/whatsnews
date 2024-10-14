import { FC } from 'react'

const Footer: FC = () => {
   return (
      <footer className='mt-auto bg-zinc-900 py-8 align-baseline text-zinc-100'>
         <div className='container mx-auto px-4'>
            {/* Links Section */}
            <div className='flex flex-col items-center justify-between md:flex-row'>
               {/* API Documentation Links */}
               <div className='mb-4 text-left md:mb-0'>
                  <h2 className='mb-2 text-xl font-semibold'>API Documentation</h2>
                  <ul className='space-y-2'>
                     <li>
                        <a
                           href='https://newsapi.org/docs/get-started'
                           target='_blank'
                           rel='noopener noreferrer'
                           className='text-primary-500 hover:underline'
                        >
                           NewsAPI Documentation
                        </a>
                     </li>
                     <li>
                        <a
                           href='https://open-platform.theguardian.com/documentation/'
                           target='_blank'
                           rel='noopener noreferrer'
                           className='text-primary-500 hover:underline'
                        >
                           Guardian API Documentation
                        </a>
                     </li>
                  </ul>
               </div>

               {/* Personal Links Section */}
               <div className='text-center md:text-right'>
                  <h2 className='mb-2 text-xl font-semibold'>Shayaan Farooq</h2>
                  <ul className='space-y-2'>
                     <li>
                        <a
                           href='https://www.linkedin.com/in/shayaanfarooq/'
                           target='_blank'
                           rel='noopener noreferrer'
                           className='text-primary-500 hover:underline'
                        >
                           LinkedIn
                        </a>
                     </li>
                     <li>
                        <a
                           href='https://github.com/shayaanfarooq'
                           target='_blank'
                           rel='noopener noreferrer'
                           className='text-primary-500 hover:underline'
                        >
                           GitHub
                        </a>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Footer Bottom Text */}
            <div className='mt-8 text-center text-sm text-zinc-500'>
               <p>@ {new Date().getFullYear()} Whatsnews.</p>
            </div>
         </div>
      </footer>
   )
}

export default Footer
