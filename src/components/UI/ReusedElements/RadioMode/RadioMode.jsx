import React, { useEffect } from 'react'
import cl from './RadioMode.module.css'
import axios from 'axios'

const RadioMode = (props) => {
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }
  useEffect(() => {
    let radio = document.getElementsByName('radioMode')
    for (let i in radio) {
      if (props.mode === radio[i].value) {
        radio[i].checked = 'true'
      }
    }
  }, [])

  const changeMode = () => {
    props.setMode(props.defaultValue)
    localStorage.setItem('mode', JSON.stringify(props.defaultValue))

    const changeData = {
      id: props.userId,
      nickname: props.nickname,
      email: props.email,
      createdDate: props.createdDate,
      role: props.role,
      confirmed: props.confirmed,
      language: props.language,
      currency: props.currency,
      mode: props.defaultValue,
    }

    API.put('api/users', JSON.stringify(changeData), {
      headers,
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={cl.wrapForCustomRadioButton}>
      <input
        value={props.defaultValue}
        className={cl.customRadioButton}
        type="radio"
        id="radioMode"
        name="radioMode"
        onChange={() => changeMode()}
      ></input>
      <label htmlFor="radioButton"></label>
    </div>
  )
}

export default RadioMode
