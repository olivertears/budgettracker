import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomCheckbox from '../../ReusedElements/CustomCheckbox/CustomCheckbox'
import cl from './SettingsProfile.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const SettingsProfile = (props) => {
  const { t } = useTranslation()
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }

  const checkNickOnMistakes = () => {
    const nickRegExp = new RegExp(/[\w_\.]/i)
    let validNick = nickRegExp.test(props.nickValue)
    if (
      !validNick ||
      props.nickValue.length < 1 ||
      props.nickValue.length > 30
    ) {
      props.setIsWarning('')
      props.setWarningHeader(`${t('error')}`)
      props.setWarningBody([
        `${t('acceptable_length')}`,
        `${t('existing_symbols')}`,
      ])
    } else {
      const changeNickData = {
        id: props.userId,
        nickname: props.nickValue,
        email: props.email,
        createdDate: props.createdDate,
        role: props.role,
        confirmed: props.confirmed,
        language: props.language,
        currency: props.currency,
        mode: props.mode,
      }

      API.put('api/users', JSON.stringify(changeNickData), {
        headers,
      })
        .then((res) => {
          props.setIsWarning('')
          props.setNickname(props.nickValue)
          localStorage.setItem('nickname', JSON.stringify(props.nickValue))
          props.setWarningHeader(`${t('success')}`)
          props.setWarningBody([
            `${t('new_user_name')} - ${props.nickValue}`,
            '',
          ])
        })
        .catch((err) => {
          props.setIsWarning('')
          props.setWarningHeader(`${t('error')}`)
          props.setWarningBody([`${t('nick_already_exists2')}`, ''])
        })
    }
  }

  const checkPassOnMistakes = () => {
    if (props.passValue.length < 4 || props.oldPassValue.length < 4) {
      props.setIsWarning('')
      props.setWarningHeader(`${t('error')}`)
      props.setWarningBody([`${t('min_password_length')}`, ''])
    } else {
      const changePassData = {
        oldPassword: props.oldPassValue,
        newPassword: props.passValue,
      }
      API.put('api/change_password', JSON.stringify(changePassData), {
        headers,
      })
        .then((res) => {
          console.log('res')
          console.log(res.data)
          props.setIsWarning('')
          props.setWarningHeader(`${t('success')}`)
          props.setWarningBody([
            `${t('new_password')} - ${props.passValue}`,
            `${t('to_be_continued')}`,
          ])
        })
        .catch((err) => {
          console.log('err')
          props.setIsWarning('')
          props.setWarningHeader(`${t('error')}`)
          props.setWarningBody([`${t('invalid_old_pass')}`, ''])
        })
    }
  }

  return (
    <div
      className={cl.profOn}
      style={{
        display: props.checkProf,
        background: props.mode === 'dark' ? '#333' : '#c4c4c4',
      }}
    >
      <h1
        className={cl.title}
        style={{
          color: props.mode === 'dark' ? '#f0f8ff' : 'black',
        }}
      >
        {t('personal_information')}
      </h1>
      <div style={{ display: 'flex' }}>
        <h2
          className={cl.profLines}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('nickname')}:
        </h2>
        <h1
          className={cl.nickname}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {props.nickname}
        </h1>
      </div>
      <div style={{ display: 'flex' }}>
        <h2
          className={cl.profLines}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('joined')}
        </h2>
        <h1
          className={cl.nickname}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {props.createdDate}
        </h1>
      </div>
      <div style={{ display: 'flex' }}>
        <h2
          className={cl.profLines}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('email2')}
        </h2>
        <h1
          className={cl.email}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {props.email}
        </h1>
      </div>
      <div style={{ display: 'flex' }}>
        <h2
          className={cl.profLines}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('status')}
        </h2>
        <h1
          className={cl.nickname}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {props.confirmed === true
            ? `${t('confirmed')}`
            : `${t('not_confirmed')}`}
        </h1>
      </div>
      <div style={{ display: 'flex' }}>
        <h2
          className={cl.profLines}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('role')}
        </h2>
        <h1
          className={cl.nickname}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {props.role === 'USER' ? `${t('user')}` : `${t('admin')}`}
        </h1>
      </div>

      <h1
        className={cl.title}
        style={{
          color: props.mode === 'dark' ? '#f0f8ff' : 'black',
        }}
      >
        {t('change_data')}
      </h1>
      <div className={cl.profLines}>
        <h2
          className={cl.profChangeLines}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('nickname')}
        </h2>
        <div className={cl.divforinputonly}>
          <input
            value={props.nickValue}
            className={cl.prof}
            placeholder={t('renew_nick')}
            onChange={(e) => props.setNickValue(e.target.value)}
          ></input>
        </div>
        <div
          className={cl.customCheckbox}
          onClick={() => checkNickOnMistakes()}
        >
          <CustomCheckbox />
        </div>
      </div>
      <div className={cl.profLines}>
        <h2
          className={cl.profChangeLines}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('password')}
        </h2>
        <div className={cl.divforinputonly}>
          <input
            type="password"
            value={props.oldPassValue}
            className={cl.oldpass}
            placeholder={t('old_pass')}
            onChange={(e) => props.setOldPassValue(e.target.value)}
          ></input>
        </div>
      </div>
      <div className={cl.divforinputonly}>
        <input
          type="password"
          value={props.passValue}
          className={cl.prof}
          placeholder={t('renew_pass')}
          onChange={(e) => props.setPassValue(e.target.value)}
        ></input>
      </div>
      <div className={cl.customCheckbox} onClick={() => checkPassOnMistakes()}>
        <CustomCheckbox />
      </div>
      <div className={cl.profLastLine}>
        <div
          className={cl.leaveBtn}
          onClick={() => {
            window.location.reload()
            localStorage.clear()
            localStorage.setItem('lastVisited', '/login')
            localStorage.setItem('mode', JSON.stringify(props.mode))
          }}
        >
          <h1 className={cl.leaveBtn}>{t('leave')}</h1>
        </div>
        <div
          className={cl.leaveBtn}
          onClick={() => {
            props.setIsWarning('')
            props.setWarningHeader(`${t('warning')}`)
            props.setWarningBody([
              `${t('you_wanna_delete')}`,
              `${t('no_recover')}`,
            ])
          }}
        >
          <h1 className={cl.leaveBtn}>{t('delete')}</h1>
        </div>
      </div>
    </div>
  )
}

export default SettingsProfile
