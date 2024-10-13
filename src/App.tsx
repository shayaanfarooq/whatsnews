import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppBar from './components/AppBar'
import HomePage from './routes/Home'
import SearchPage from './routes/Search'

const queryClient = new QueryClient()

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <main className='overflow-y-auto w-full flex flex-col h-screen max-h-screen bg-zinc-50'>
               <AppBar />
               <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/search' element={<SearchPage />} />
               </Routes>
            </main>
         </BrowserRouter>
         <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
   )
}

export default App
