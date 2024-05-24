import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
const Header = () => {
  const {isAuthenticated,setIsAuthenticated, loading, setLoading} = useContext(Context) ;

  const logoutHandler = async () => {
    setLoading(true);
        try {
      var { data } = await axios.get(
        "https://nodejs-todo-app-pgep.onrender.com/api/v1/users/logout",
        {
          withCredentials: true
        }
      );
      toast.success("logout successful");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error.response?.data);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  
  
  return (
    <nav className="header">
        
            <div>
                <h2>
                    Todo App
                </h2>
            </div>
            <article>
                <Link to = {"/"}  >Home</Link>
                <Link to = {"/profile"} >Profile</Link>
                
                { isAuthenticated?  <button disabled = {loading} className='btn' onClick={logoutHandler}>Logout</button> : <Link to = {"/login"} >Login</Link>}
            </article>
        
    </nav>
  );
}

export default Header