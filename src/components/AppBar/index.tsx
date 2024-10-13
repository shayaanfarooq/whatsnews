import { Link, NavLink } from 'react-router-dom'

import { useCategoriesData } from '@/api/queries/useCategoriesData'
import { Button } from '@/components/ui/button'

const NavLinks = () => {
   return (
      <div className='hidden md:flex space-x-4'>
         <Button asChild variant={'link'}>
            <Link to='/'>Home</Link>
         </Button>
         <Button asChild variant={'link'}>
            <Link to='/search'>Search</Link>
         </Button>
         <Button asChild variant={'link'}>
            <Link to='/search'>My Feed</Link>
         </Button>
      </div>
   )
}

const AppBar = () => {
   useCategoriesData()

   return (
      <nav className='bg-zinc-200 top-0 sticky z-50 h-[64px]'>
         <div className='container mx-auto px-4 py-4 flex justify-between items-center h-full'>
            <div className='text-zinc-900 font-bold text-xl'>
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
