import React, { useContext, useEffect } from 'react'
import { Context } from '../main';
import Loader from '../components/Loader'
const Profile = ({setRefresh}) => {
  
  const {user, isAuthenticated, loading} = useContext(Context) ;  
  const display = ()=>{
    if(loading)
      {
        
        return <Loader> Loading...</Loader>
      }
      else if( isAuthenticated )
        {
          
          return (<div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
          </div>)
        }
        else{
          
          return(
          <Loader>Login First</Loader>);
        }
  }
  return (
    <div>
      {display()}
    </div>
    
     
  )
}

export default Profile