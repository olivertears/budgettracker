import React, { useEffect } from 'react'
import cl from './RadioCurrency.module.css'
import axios from 'axios'

const RadioCurrency = (props) => {
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }
  useEffect(() => {
    let radio = document.getElementsByName('radioCurrency')
    for (let i in radio) {
      if (props.currency === radio[i].value) {
        radio[i].checked = 'true'
      }
    }
  }, [])

  const changeCurrency = () => {
    props.setCurrency(props.defaultValue)
    localStorage.setItem('currency', JSON.stringify(props.defaultValue))

    const changeData = {
      id: props.userId,
      nickname: props.nickname,
      email: props.email,
      createdDate: props.createdDate,
      role: props.role,
      confirmed: props.confirmed,
      language: props.language,
      currency: props.defaultValue,
      mode: props.mode,
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
        id="radioCurrency"
        name="radioCurrency"
        onChange={() => changeCurrency()}
      ></input>
      <label htmlFor="radioButton"></label>
    </div>
  )
}

export default RadioCurrency
