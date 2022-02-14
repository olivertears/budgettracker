import React, { useEffect } from 'react'
import cl from './RadioLanguage.module.css'
import i18next from 'i18next'
import axios from 'axios'

const RadioLanguage = (props) => {
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }
  useEffect(() => {
    let radio = document.getElementsByName('radioLanguage')
    for (let i in radio) {
      if (props.language === radio[i].value) {
        radio[i].checked = 'true'
      }
    }
  }, [])

  const changeLanguage = () => {
    props.setLanguage(props.defaultValue)
    i18next.changeLanguage(props.defaultValue)
    localStorage.setItem('language', JSON.stringify(props.defaultValue))

    const changeNickData = {
      id: props.userId,
      nickname: props.nickname,
      email: props.email,
      createdDate: props.createdDate,
      role: props.role,
      confirmed: props.confirmed,
      language: props.defaultValue,
      currency: props.currency,
      mode: props.mode,
    }

    API.put('api/users', JSON.stringify(changeNickData), {
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
        style={{
          outlineColor: props.mode === 'dark' ? '#f0f8ff' : 'black',
        }}
        value={props.defaultValue}
        className={cl.customRadioButton}
        type="radio"
        id="radioLanguage"
        name="radioLanguage"
        onChange={() => changeLanguage()}
      ></input>
      <label htmlFor="radioButton"></label>
    </div>
  )
}

export default RadioLanguage
