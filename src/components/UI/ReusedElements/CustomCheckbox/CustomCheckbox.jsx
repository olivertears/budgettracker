import React from 'react'
import cl from './CustomCheckbox.module.css'

const CustomCheckbox = () => {
  return (
    <div className={cl.wrapForCustomCheckbox}>
      <input
        className={cl.customCheckbox}
        type="checkbox"
        id="checkBox"
        name="checkBox"
      ></input>
      <label htmlFor="checkBox"></label>
    </div>
  )
}

export default CustomCheckbox
