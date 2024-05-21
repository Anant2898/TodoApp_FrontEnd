import { useState } from 'react'
import './styles/app.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  const [count, setCount] = useState(0)

  return (
    
      <Router>
        <Header />
         <Routes>
            <Route path='/' element={<Home/>}/ > 
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
         </Routes>
      </Router>
      
  )
}

export default App
