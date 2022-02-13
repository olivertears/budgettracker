import React from 'react'
import cl from './RadioLogo.module.css'

const RadioLogo = (props) => {
  let x = false
  let y = ''
  if (props.isFirstElement) {
    x = true
    y = 'customLogoChecked'
  }

  return (
    <div
      className={cl.logo}
      style={{
        backgroundImage: `url(${props.arrOfLogo[props.logoPageNum]}), url(${
          props.color
        })`,
        outline: y,
      }}
      onClick={() => props.setLogo(props.arrOfLogo[props.logoPageNum])}
    >
      <input
        className={cl.radioLogoInput}
        type="radio"
        id={y}
        name="radioLogo"
        defaultChecked={x}
        value={props.arrOfLogo[props.logoPageNum]}
      ></input>
      <label htmlFor="radioLogo"></label>
    </div>
  )
}

export default RadioLogo
