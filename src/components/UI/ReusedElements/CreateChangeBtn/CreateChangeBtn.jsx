import React from 'react'
import cl from './CreateChangeBtn.module.css'

const CreateChangeBtn = (props) => {
  return (
    <div className={cl.createChangeBtn}>
      <button
        disabled={props.isTravel ? true : false}
        className={props.isTravel ? cl.onTravel : cl.createChangeBtn}
      >
        {props.btnTxt}
      </button>
    </div>
  )
}

export default CreateChangeBtn
