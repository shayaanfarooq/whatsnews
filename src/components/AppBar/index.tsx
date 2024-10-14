import { NavLink } from 'react-router-dom'

import CenterLayout from '../Layout/CenterLayout'
import { useCategoriesData } from '@/api/queries/useCategoriesData'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navlinks = [
   { to: '/', label: 'Home' },
   { to: '/search', label: 'Search' }
]

const NavLinks = () => {
   return (
      <div className='hidden space-x-4 font-bold uppercase md:flex'>
         {navlinks.map((navlink) => (
            <NavLink
               key={navlink.label}
               to={navlink.to}
               className={({ isActive }) =>
                  cn(
                     buttonVariants({ variant: 'link' }),
                     isActive
                        ? 'underline decoration-orange-600 decoration-2'
                        : 'decoration-2 hover:underline',
                     'font-extrabold uppercase text-zinc-50'
                  )
               }
            >
               {navlink.label}
            </NavLink>
         ))}
      </div>
   )
}

const AppBar = () => {
   useCategoriesData()

   return (
      <nav className='sticky top-0 z-50 h-[64px] bg-zinc-900 px-4'>
         <CenterLayout>
            <div className='flex h-[64px] min-w-full items-center justify-between'>
               <div className='text-3xl font-extrabold uppercase text-zinc-50'>
                  <NavLink to='/'>W.</NavLink>
               </div>

               <div className='flex gap-2'>
                  <NavLinks />
               </div>
            </div>
         </CenterLayout>
      </nav>
   )
}

export default AppBar
