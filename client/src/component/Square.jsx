import React from 'react'
import '../css/home.css'
import '../css/square.css'

function Square(props) {
   
    const value=props.value;
    const handler=props.handler
 
  return (
    <div className='square' onClick={()=>handler()} >
      <h3>{value}</h3>
    </div>
  )
}

export default Square
