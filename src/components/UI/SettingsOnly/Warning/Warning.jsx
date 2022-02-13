import React from 'react'
import { useNavigate } from 'react-router-dom'
import CloseButton from '../../ReusedElements/CloseButton/CloseButton'
import cl from './Warning.module.css'
import axios from 'axios'

import { useTranslation } from 'react-i18next'

const Warning = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }

  const sayOk = () => {
    props.setOldPassValue('')
    props.setNickValue('')
    props.setPassValue('')
    let x = document.getElementsByName('checkBox')
    x[0].checked = false
    x[1].checked = false

    if (props.warningBody[0].startsWith(`${t('new_password')}`)) {
      window.location.reload()
      localStorage.clear()
      localStorage.setItem('lastVisited', '/login')
      localStorage.setItem('mode', JSON.stringify(props.mode))
    } else if (props.warningBody[0].startsWith(`${t('you_wanna_delete')}`)) {
      API.delete(`api/users/${props.userId}`, {
        headers,
      })
        .then((res) => {
          console.log(res.data)
          window.location.reload()
          localStorage.clear()
          localStorage.setItem('lastVisited', '/login')
          localStorage.setItem('mode', JSON.stringify(props.mode))
        })
        .catch((err) => {
          console.log(err)
        })
    } else props.setIsWarning('none')
  }

  const sayClose = () => {
    props.setOldPassValue('')
    props.setNickValue('')
    props.setPassValue('')
    props.setIsWarning('none')
    let x = document.getElementsByName('checkBox')
    x[0].checked = false
    x[1].checked = false
    if (props.warningBody[0].startsWith(`${t('new_password')}`)) {
      window.location.reload()
      localStorage.clear()
      localStorage.setItem('lastVisited', '/login')
      localStorage.setItem('mode', JSON.stringify(props.mode))
    }
  }

  return (
    <div
      className={cl.full}
      style={{
        display: props.isWarning,
      }}
    >
      <div className={cl.wrap}>
        <div className={cl.header}>
          <h1 className={cl.headerTxt}>{props.warningHeader}</h1>
          <div className={cl.closeButton} onClick={sayClose}>
            <CloseButton />
          </div>
        </div>
        <div
          className={cl.content}
          style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
        >
          <h3
            className={cl.mistakeBody}
            style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}
          >
            {props.warningBody[0]}
            <br />
            {props.warningBody[1]}
          </h3>
          <button className={cl.okbutton} onClick={() => sayOk()}>
            <h1>{t('ok')}</h1>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Warning
