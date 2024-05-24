import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
const Login = () => {
  const {isAuthenticated,setIsAuthenticated , setLoading, loading} = useContext(Context) ;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      var { data } = await axios.post(
        "https://nodejs-todo-app-pgep.onrender.com/api/v1/users/login",
        {  email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          },  
          withCredentials: true
        }
      );
      toast.success(data?.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Error response:", error.response);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  if(isAuthenticated)
    {
      return(<Navigate to = {"/"} />);
      
    }

  return (
    <div className='login'>
        <section>
            <form onSubmit={submitHandler}>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <button disabled={loading} type='submit'>Login</button>
                <h4>Or</h4>
                <Link to={"/register"} >Sign up</Link>
            </form>
        </section>
    </div>
  );
}

export default Login