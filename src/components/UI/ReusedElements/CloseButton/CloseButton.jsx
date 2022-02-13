import React from 'react'
import cl from './CloseButton.module.css'

const CloseButton = (props) => {
  return (
    <div>
      <button className={props.isTravel ? cl.myButtonTravel : cl.myButton}>
        <div className={cl.left}></div>
        <div className={cl.right}></div>
      </button>
    </div>
  )
}

export default CloseButton
