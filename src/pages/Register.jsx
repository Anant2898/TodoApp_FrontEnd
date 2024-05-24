import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { Context } from '../main';
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated, loading, setLoading} = useContext(Context) ;

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Password:", password);

    try {
      
      var { data } = await axios.post(
        "https://nodejs-todo-app-pgep.onrender.com/api/v1/users/new",
        { name, email, password },
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
          <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          <button type='submit' disabled={loading}>Sign up</button>
          <h4>Or</h4>
          <Link to="/login">Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
