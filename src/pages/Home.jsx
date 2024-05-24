import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Context } from '../main';
const Home = () => {
  const { setLoading,  loading, isAuthenticated} = useContext(Context) ;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 // const [loading,setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const {data} =  await axios.post("https://nodejs-todo-app-pgep.onrender.com/api/v1/tasks/new",{
        title, description
      },{
        withCredentials:true
      })
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((x)=>!x)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  useEffect(()=>{
    axios.get("https://nodejs-todo-app-pgep.onrender.com/api/v1/tasks/fetchTasks",{
      withCredentials: true
    }).then(res=>{
      setTasks(res.data.tasks)
    })
  },[refresh])
  return (
    <div className='container' >
      <div className="login">
      <section >
              <form onSubmit={submitHandler}>
                  <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                  <input required type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Des cription' />
                  <button disabled = {loading || !isAuthenticated} type='submit'>Add Task</button>
              </form>
      </section>
      </div>
      <section className="todosContainer">
        {tasks?.map((i,index) => { 
          return <TodoItem key={index} description = {i.description} title = {i.title} isCompleted = {i.isCompleted} id={i._id} setRefresh= {setRefresh}/>
        })}
      </section>
    </div>
    
  )
}

export default Home