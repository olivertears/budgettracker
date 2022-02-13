import React from 'react'
import cl from './RadioColor.module.css'

const RadioColor = (props) => {
  let x = false
  let y = ''
  if (props.isFirstElement) {
    x = true
    y = 'customColorChecked'
  }

  return (
    <div
      className={cl.color}
      style={{
        backgroundImage: `url(${props.backColor})`,
      }}
      onClick={() => props.setColor(props.backColor)}
    >
      <input
        className={cl.radioColorInput}
        type="radio"
        id={y}
        name="radioColor"
        defaultChecked={x}
        value={props.backColor}
      ></input>
      <label htmlFor="radioColor"></label>
    </div>
  )
}

export default RadioColor
