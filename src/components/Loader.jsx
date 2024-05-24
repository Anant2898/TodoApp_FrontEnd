import React from 'react'
import '../styles/app.scss'
const Loader = ({children}) => {
  return (
    <div className='loader'> {children} </div>
  )
}
 
export default Loader