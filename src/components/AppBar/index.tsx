import { NavLink } from 'react-router-dom'

import { useCategoriesData } from '@/api/queries/useCategoriesData'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navlinks = [
   { to: '/', label: 'Home' },
   { to: '/search', label: 'Search' }
]

const NavLinks = () => {
   return (
      <div className='hidden md:flex space-x-4 font-bold uppercase '>
         {navlinks.map((navlink) => (
            <NavLink
               to={navlink.to}
               className={({ isActive }) =>
                  cn(
                     buttonVariants({ variant: 'link' }),
                     isActive
                        ? 'underline decoration-orange-600 decoration-2'
                        : 'hover:underline decoration-2 ',
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
      <nav className='bg-zinc-900 top-0 sticky z-50 h-[64px]'>
         <div className='container mx-auto px-4 py-4 flex justify-between items-center h-full'>
            <div className='uppercase text-zinc-50 text-xl font-extrabold'>
               <NavLink to='/'>WhatsNews</NavLink>
            </div>

            <div className='flex gap-2'>
               <NavLinks />
            </div>
         </div>
      </nav>
   )
}

export default AppBar
