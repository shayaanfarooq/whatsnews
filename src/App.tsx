import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppBar from './components/AppBar'
import ArticlePage from './routes/Article'
import HomePage from './routes/Home'
import SearchPage from './routes/Search'

const queryClient = new QueryClient()

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <main className='flex h-screen max-h-screen w-full flex-col overflow-y-auto bg-zinc-50'>
               <AppBar />
               <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/search/*' element={<SearchPage />} />
                  <Route path='/article/:api/*' element={<ArticlePage />} />
               </Routes>
            </main>
         </BrowserRouter>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   )
}

export default App
