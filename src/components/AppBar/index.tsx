import { useCategories } from '@/api/queries/useCategoriesData'
import { Link } from 'react-router-dom'

const NavLinks = () => {
   return (
      <div className='hidden md:flex space-x-4'>
         <button>
            <Link to='/'>Home</Link>
         </button>
         <button>
            <Link to='/search'>Search</Link>
         </button>
         <button>
            <Link to='/search'>My Feed</Link>
         </button>
      </div>
   )
}

const AppBar = () => {
   useCategories()

   // const [isOpen, setIsOpen] = useState(false)

   // const toggleMenu = () => {
   //    setIsOpen(!isOpen)
   // }

   return (
      <nav className='bg-zinc-900 dark:bg-zinc-900 top-0 sticky z-50'>
         <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <div className='text-white font-bold text-xl'>
               <button>Logo</button>
            </div>

            <div className='flex gap-2'>
               <NavLinks />
            </div>
         </div>
      </nav>
   )
}

export default AppBar
