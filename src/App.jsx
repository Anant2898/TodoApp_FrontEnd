import { useContext, useEffect, useState } from 'react'
import './styles/app.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Context } from './main';
function App() {

  const { setUser,setIsAuthenticated ,setLoading, isAuthenticated} = useContext(Context)
 
 
useEffect(()=>{
  setLoading(true);
  axios.get("https://nodejs-todo-app-pgep.onrender.com/api/v1/users/me",{
    withCredentials:true
  }).then(res=>{
    setUser(res.data.user);
    console.log("hi");
    if(res.data.user)
      {
        
        setIsAuthenticated(true);

      }

    setUser(res.data.user);
    setLoading(false);
  }).catch((error)=>{
    console.log(error);
    setUser(res.data.user);
      const cookies = document.cookie;
  

  if(cookies.split(';').length === 0)
    {
      
      setIsAuthenticated(false);

    }
    else{
      setIsAuthenticated(true);
    }
      setLoading(false);
  })
},[isAuthenticated])
  return (
    
      <Router>
        <Header />
         <Routes>
          
            <Route path='/' element={<Home/>}/ > 
            <Route path='/profile' element={<Profile  />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
         </Routes>
         <Toaster/>
      </Router>
      
  )
}

export default App
