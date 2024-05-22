import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const submitHandler =  async (event)=>{
            event.preventDefault();
            console.log(name,email,password);
            try{
              var {data} = await axios.get("https://nodejs-todo-app-pgep.onrender.com/api/v1/users/logout", {
                name,email,password
              },{
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials:true
              })
              toast.success(data.message);
            }
            catch(error)
            {
                toast.error(data.message);
                console.log(error);
            }
    }
  return (
    <div className='login'>
        <section>
            <form onSubmit={submitHandler}>
                <input required type="text" value={name} onChange={(e)=>{ setName(e.target.value) }} placeholder='name' />
                <input required type="email" value={email} onChange={(e)=>{ setEmail(e.target.value) }} placeholder='email' />
                <input required type="password" value={password} onChange={(e)=>{ setPassword(e.target.value) }} placeholder='password' />
                <button type='submit'>Sign up</button>
                <h4>Or</h4>
                <Link to={"/login"} >Login</Link>
            </form>
        </section>
    </div>
  )
}

export default Register
