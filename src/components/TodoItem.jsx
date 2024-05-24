import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const TodoItem = ({title,description, isCompleted, id, setRefresh}) => {
    
    const handleCheckboxUpdate = async()=>{
        
        try {
        const {data} = await axios.put(`https://nodejs-todo-app-pgep.onrender.com/api/v1/tasks/${id}`,{},{
            withCredentials:true }
            
        )
        toast.success(data.message);
        } catch (error) {
            console.log(error.response.data.message);
        }
        
        setRefresh((prev)=>!prev)
    }
    const handleDelete = async()=>{
         
        try {
        const {data} = await axios.delete(`https://nodejs-todo-app-pgep.onrender.com/api/v1/tasks/${id}`,{
            withCredentials:true }
            
        )
        toast.success(data.message);
        } catch (error) {
            console.log(error.response.data.message);
        }
        
        setRefresh((prev)=>!prev)
    }
  return (
    <div  className='todo' >
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
                <input onChange={handleCheckboxUpdate} type="checkbox" value={isCompleted} checked={isCompleted}/>
                <button className='btn' onClick={handleDelete} >Delete</button>
        </div>
    </div>
  )
}

export default  TodoItem