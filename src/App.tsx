import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './routes/Home'
import BrowsePage from './routes/Browse'
import AppBar from './components/AppBar'

function App() {
   return (
      <main className='overflow-y-auto w-full'>
         <BrowserRouter>
            <AppBar />
            <Routes>
               <Route path='/' element={<HomePage />} />
               <Route path='/browse' element={<BrowsePage />} />
            </Routes>
         </BrowserRouter>
      </main>
   )
}

export default App
